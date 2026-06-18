/**
 * Stripe Integration — Stub
 *
 * This module defines the interface for Stripe billing interactions.
 * The stub returns realistic-looking responses without making any
 * real API calls or requiring Stripe credentials.
 *
 * In production, initialise the Stripe SDK with:
 *   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-09-30.acacia" });
 *
 * No real credentials are referenced here (NFR-S3).
 */

export type SubscriptionTier = "trial" | "starter" | "pro";
export type SubscriptionStatus = "active" | "past_due" | "cancelled" | "trial";

export interface CheckoutSessionResult {
  checkoutUrl: string;
  sessionId: string;
}

export interface SubscriptionInfo {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  billingPeriod: "monthly" | "annual";
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  trialEndsAt: string | null;
}

export interface IStripeClient {
  /** Create a Stripe Checkout Session */
  createCheckoutSession(options: {
    accountId: string;
    tier: "starter" | "pro";
    billingPeriod: "monthly" | "annual";
    successUrl: string;
    cancelUrl: string;
  }): Promise<CheckoutSessionResult>;

  /** Get current subscription status for an account */
  getSubscription(stripeCustomerId: string): Promise<SubscriptionInfo | null>;

  /** Cancel subscription at period end */
  cancelSubscription(stripeSubscriptionId: string): Promise<{ cancelAtPeriodEnd: boolean; accessUntil: string }>;

  /** Validate a Stripe webhook signature */
  validateWebhookSignature(payload: string, signature: string, secret: string): boolean;
}

// ---------------------------------------------------------------------------
// Stub implementation
// ---------------------------------------------------------------------------

class StubStripeClient implements IStripeClient {
  async createCheckoutSession(options: {
    accountId: string;
    tier: "starter" | "pro";
    billingPeriod: "monthly" | "annual";
    successUrl: string;
    cancelUrl: string;
  }): Promise<CheckoutSessionResult> {
    const sessionId = `cs_stub_${options.accountId}_${Date.now()}`;
    return {
      checkoutUrl: `https://checkout.stripe.com/pay/${sessionId}`,
      sessionId,
    };
  }

  async getSubscription(_stripeCustomerId: string): Promise<SubscriptionInfo | null> {
    // Stub returns an active trial subscription
    return {
      tier: "trial",
      status: "trial",
      billingPeriod: "monthly",
      currentPeriodEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: false,
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  async cancelSubscription(_stripeSubscriptionId: string): Promise<{ cancelAtPeriodEnd: boolean; accessUntil: string }> {
    return {
      cancelAtPeriodEnd: true,
      accessUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  validateWebhookSignature(_payload: string, _signature: string, _secret: string): boolean {
    // In production: use stripe.webhooks.constructEvent()
    // Stub: always returns false unless signature is "stub_valid"
    return _signature === "stub_valid";
  }
}

// Exported singleton stub — replace with real Stripe client in production
export const stripeClient: IStripeClient = new StubStripeClient();
