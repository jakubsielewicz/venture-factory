/**
 * Awards API Handlers
 */

import { AWARDS, AWARD_CLASSIFICATIONS, AWARD_RATES, RATE_TABLE_EFFECTIVE_DATE } from "../../fixtures/awards.ts";
import { makeErrorResponse, generateRequestId } from "../../lib/errors.ts";
import type { ApiRequest, ApiResponse } from "./uploads.ts";

// GET /awards
export function handleListAwards(_req: ApiRequest): ApiResponse {
  const requestId = generateRequestId();
  const activeAwards = AWARDS.filter((a) => a.isActive);

  const data = activeAwards.map((award) => {
    const classificationCount = AWARD_CLASSIFICATIONS.filter(
      (c) => c.awardCode === award.code
    ).length;
    return {
      award_id: award.id,
      code: award.code,
      name: award.name,
      classification_count: classificationCount,
      current_rate_effective_date: RATE_TABLE_EFFECTIVE_DATE,
    };
  });

  return {
    status: 200,
    body: {
      data,
      meta: {
        total_awards: data.length,
        rate_table_last_updated: RATE_TABLE_EFFECTIVE_DATE,
      },
      request_id: requestId,
    },
  };
}

// GET /awards/:awardId/classifications
export function handleGetAwardClassifications(req: ApiRequest): ApiResponse {
  const requestId = generateRequestId();
  const awardId = req.params?.["awardId"];

  if (!awardId) {
    return {
      status: 400,
      body: makeErrorResponse("VALIDATION_ERROR", "awardId is required.", requestId),
    };
  }

  const award = AWARDS.find((a) => a.id === awardId && a.isActive);
  if (!award) {
    return {
      status: 404,
      body: makeErrorResponse("NOT_FOUND", "Award not found.", requestId),
    };
  }

  const classifications = AWARD_CLASSIFICATIONS.filter(
    (c) => c.awardCode === award.code
  );

  const data = classifications.map((cls) => {
    const getRate = (type: "full_time" | "part_time" | "casual") =>
      AWARD_RATES.find(
        (r) => r.classificationId === cls.id && r.employmentType === type
      )?.rateHourly ?? null;

    return {
      classification_id: cls.id,
      level: cls.level,
      description: cls.description,
      current_rate_casual_hourly: getRate("casual"),
      current_rate_full_time_hourly: getRate("full_time"),
      current_rate_part_time_hourly: getRate("part_time"),
    };
  });

  return {
    status: 200,
    body: {
      data,
      award_id: award.id,
      award_name: award.name,
      rate_effective_date: RATE_TABLE_EFFECTIVE_DATE,
      request_id: requestId,
    },
  };
}
