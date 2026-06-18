/**
 * Input validation schemas using Zod.
 * Used by API handlers to validate request bodies before processing.
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export const RegisterSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(12, "Password must be at least 12 characters"),
  business_name: z.string().min(1).max(255),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const VerifyEmailSchema = z.object({
  token: z.string().min(1),
});

export const PasswordResetRequestSchema = z.object({
  email: z.string().email(),
});

export const PasswordResetConfirmSchema = z.object({
  token: z.string().min(1),
  new_password: z.string().min(12, "Password must be at least 12 characters"),
});

// ---------------------------------------------------------------------------
// Uploads
// ---------------------------------------------------------------------------

export const ColumnMappingSchema = z.object({
  employee_ref: z.string().min(1),
  role_title: z.string().min(1),
  weekly_hours: z.string().min(1),
  current_pay_rate_hourly: z.string().min(1),
  employment_type: z.string().optional(),
  date_of_birth: z.string().optional(),
});

export const UploadMappingPatchSchema = z.object({
  mapping: ColumnMappingSchema,
});

// ---------------------------------------------------------------------------
// Billing
// ---------------------------------------------------------------------------

export const CheckoutSchema = z.object({
  tier: z.enum(["starter", "pro"]),
  billing_period: z.enum(["monthly", "annual"]),
  success_url: z.string().url(),
  cancel_url: z.string().url(),
});

// ---------------------------------------------------------------------------
// Account
// ---------------------------------------------------------------------------

export const AccountPatchSchema = z.object({
  business_name: z.string().min(1).max(255).optional(),
});

export const AccountDeleteSchema = z.object({
  confirmation: z.literal("DELETE MY ACCOUNT"),
});

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------

export const RateImportSchema = z.object({
  effective_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "effective_date must be ISO date format (YYYY-MM-DD)"),
  award_code: z.string().min(1),
});

// ---------------------------------------------------------------------------
// Public
// ---------------------------------------------------------------------------

export const WaitlistSchema = z.object({
  email: z.string().email().max(255),
  business_size: z.enum(["1-5", "6-20", "21-99"]).optional(),
});

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

export type ValidationError = {
  field: string;
  message: string;
};

export function formatZodError(error: z.ZodError): ValidationError[] {
  return error.errors.map((e) => ({
    field: e.path.join("."),
    message: e.message,
  }));
}
