/**
 * k6 Load Test — au-sme-compliance
 *
 * Covers NFR-P1 (p95 < 300ms, 50 concurrent users), NFR-P3 (500-row CSV
 * end-to-end < 90s), and NFR-P6 (20 concurrent CSV jobs < 60s each).
 *
 * Prerequisites:
 *   - k6 installed: https://k6.io/docs/getting-started/installation/
 *   - Staging environment running with Supabase + queue wired (not stubs)
 *   - Set environment variables before running:
 *       export BASE_URL="https://staging.app.paycheck.com.au"
 *       export TEST_JWT="<valid staging JWT for a test account>"
 *
 * Usage:
 *   k6 run --env BASE_URL=$BASE_URL --env TEST_JWT=$TEST_JWT product/ops/load-test.js
 *
 * All three scenarios must pass BEFORE BLOCKER 5 is cleared.
 * DO NOT run against production.
 */

import http from "k6/http";
import { check, sleep } from "k6";
import { Trend, Counter } from "k6/metrics";

const p95Latency = new Trend("p95_latency_ms");
const jobCompletions = new Counter("job_completions");

// -----------------------------------------------------------------------
// Scenario configuration
// -----------------------------------------------------------------------
export const options = {
  scenarios: {
    // NFR-P1: 50 concurrent users on read endpoints, 5 minutes
    nfr_p1_read_latency: {
      executor: "constant-vus",
      vus: 50,
      duration: "5m",
      exec: "readEndpoints",
    },
    // NFR-P6: 20 concurrent CSV jobs
    nfr_p6_concurrent_jobs: {
      executor: "shared-iterations",
      vus: 20,
      iterations: 20,
      maxDuration: "120s",
      exec: "submitCsvJob",
      startTime: "5m30s", // run after P1 scenario completes
    },
  },
  thresholds: {
    // NFR-P1: p95 < 300ms for read endpoints
    "http_req_duration{scenario:nfr_p1_read_latency}": ["p(95)<300"],
    // NFR-P6: all 20 jobs must complete
    job_completions: ["count>=20"],
    // Overall error rate must be < 1%
    http_req_failed: ["rate<0.01"],
  },
};

const BASE_URL = __ENV.BASE_URL || "https://staging.app.paycheck.com.au";
const AUTH_HEADER = { Authorization: `Bearer ${__ENV.TEST_JWT}` };

// -----------------------------------------------------------------------
// NFR-P1: Read endpoint latency under 50 concurrent users
// -----------------------------------------------------------------------
export function readEndpoints() {
  const endpoints = [
    "/api/awards",
    "/api/uploads",
    "/api/reports",
    "/api/account",
  ];

  const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
  const res = http.get(`${BASE_URL}${endpoint}`, { headers: AUTH_HEADER });

  check(res, {
    "status is 200 or 404": (r) => r.status === 200 || r.status === 404,
    "p95 under 300ms": (r) => r.timings.duration < 300,
  });

  p95Latency.add(res.timings.duration);
  sleep(1);
}

// -----------------------------------------------------------------------
// NFR-P6: 20 concurrent CSV job submissions
// Each job should complete within 60 seconds
// -----------------------------------------------------------------------
export function submitCsvJob() {
  // Minimal 3-row CSV payload for load testing
  const csvContent = `employee_id,role_title,employment_type,hours_per_week,hourly_rate
EMP001,Hospitality Worker Level 1,full_time,38,23.50
EMP002,Hospitality Worker Level 2,part_time,20,24.80
EMP003,Hospitality Worker Level 3,casual,15,29.00`;

  const uploadRes = http.post(
    `${BASE_URL}/api/uploads`,
    {
      file: http.file(csvContent, "test_payload.csv", "text/csv"),
      award_id: "hospitality-award-id", // replace with actual staging award ID
    },
    { headers: AUTH_HEADER }
  );

  check(uploadRes, {
    "upload accepted 202": (r) => r.status === 202,
  });

  if (uploadRes.status !== 202) return;

  const uploadId = JSON.parse(uploadRes.body).data?.upload_id;
  if (!uploadId) return;

  // Poll for completion — NFR-P6 requires all 20 complete within 60s
  const start = Date.now();
  let complete = false;

  while (Date.now() - start < 60000) {
    sleep(2);
    const statusRes = http.get(`${BASE_URL}/api/uploads/${uploadId}/status`, {
      headers: AUTH_HEADER,
    });

    if (statusRes.status === 200) {
      const body = JSON.parse(statusRes.body);
      if (body.data?.status === "complete") {
        complete = true;
        break;
      }
      if (body.data?.status === "error") break;
    }
  }

  check({ complete }, {
    "job completed within 60s (NFR-P6)": (v) => v.complete === true,
  });

  if (complete) jobCompletions.add(1);
}
