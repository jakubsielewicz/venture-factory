/**
 * Billing API Handlers — Thin wrappers over the Stripe stub.
 */

import { stripeClient } from "../../integrations/stripe.stub.ts";
import { CheckoutSchema, formatZodError } from "../../lib/validation.ts";
import { makeErrorResponse, generateRequestId } from "../../lib/errors.ts";
import type { ApiRequest, ApiResponse } from "./uploads.ts";

// POST /billing/checkout
export async function handleCreateCheckout(req: ApiRequest): Promise<ApiResponse> {
  const requestId = generateRequestId();

  const parsed = CheckoutSchema.safeParse(req.body);
  if (!parsed.success) {
    return {
      status: 400,
      body: makeErrorResponse(
        "VALIDATION_ERROR",
        "Invalid checkout request.",
        requestId,
        formatZodError(parsed.error).map((e) => ({ field: e.field, issue: e.message }))
      ),
    };
  }

  const session = await stripeClient.createCheckoutSession({
    accountId: req.accountId,
    tier: parsed.data.tier,
    billingPeriod: parsed.data.billing_period,
    successUrl: parsed.data.success_url,
    cancelUrl: parsed.data.cancel_url,
  });

  return {
    status: 200,
    body: {
      data: {
        checkout_url: session.checkoutUrl,
        session_id: session.sessionId,
      },
      request_id: requestId,
    },
  };
}

// GET /billing/subscription
export async function handleGetSubscription(req: ApiRequest): Promise<ApiResponse> {
  const requestId = generateRequestId();

  const subscription = await stripeClient.getSubscription(req.accountId);

  return {
    status: 200,
    body: {
      data: subscription ?? {
        tier: "trial",
        status: "trial",
        billing_period: "monthly",
        current_period_end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        cancel_at_period_end: false,
        trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
      request_id: requestId,
    },
  };
}

// POST /billing/webhook
export async function handleStripeWebhook(req: {
  rawBody: string;
  signature: string;
  webhookSecret: string;
}): Promise<ApiResponse> {
  const requestId = generateRequestId();

  const isValid = stripeClient.validateWebhookSignature(
    req.rawBody,
    req.signature,
    req.webhookSecret
  );

  if (!isValid) {
    return {
      status: 400,
      body: makeErrorResponse(
        "VALIDATION_ERROR",
        "Invalid webhook signature.",
        requestId
      ),
    };
  }

  // In production: parse event and update subscription status
  return {
    status: 200,
    body: { received: true },
  };
}
