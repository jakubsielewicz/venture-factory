-- =============================================================
-- Supabase / Postgres IaC — Schema Declaration
-- Venture: au-sme-compliance
-- =============================================================
-- DECLARE ONLY — do NOT apply until G6 deploy gate is passed.
-- Apply command (operator, with production Supabase credentials):
--   supabase db push --db-url $SUPABASE_DB_URL
-- =============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgmq;  -- Supabase pgmq for job queue

-- =============================================================
-- USERS TABLE
-- =============================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    failed_login_attempts INTEGER NOT NULL DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- =============================================================
-- ACCOUNTS TABLE (tenant)
-- =============================================================
CREATE TYPE subscription_tier AS ENUM ('trial', 'starter', 'pro');
CREATE TYPE subscription_status_type AS ENUM ('active', 'past_due', 'cancelled', 'trial');

CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    subscription_tier subscription_tier NOT NULL DEFAULT 'trial',
    subscription_status subscription_status_type NOT NULL DEFAULT 'trial',
    stripe_customer_id VARCHAR(100),
    stripe_subscription_id VARCHAR(100),
    trial_ends_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_accounts_owner UNIQUE (owner_user_id)
);

-- =============================================================
-- AWARDS TABLE
-- =============================================================
CREATE TABLE IF NOT EXISTS awards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- =============================================================
-- AWARD CLASSIFICATIONS TABLE
-- =============================================================
CREATE TABLE IF NOT EXISTS award_classifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    award_id UUID NOT NULL REFERENCES awards(id) ON DELETE CASCADE,
    level VARCHAR(50) NOT NULL,
    description TEXT,
    keywords TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_award_classification UNIQUE (award_id, level)
);

-- =============================================================
-- AWARD RATES TABLE
-- =============================================================
CREATE TYPE employment_type AS ENUM ('full_time', 'part_time', 'casual');

CREATE TABLE IF NOT EXISTS award_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    classification_id UUID NOT NULL REFERENCES award_classifications(id) ON DELETE CASCADE,
    employment_type employment_type NOT NULL,
    rate_hourly DECIMAL(10,4) NOT NULL,
    rate_weekly DECIMAL(10,4) GENERATED ALWAYS AS (rate_hourly * 38) STORED,
    effective_date DATE NOT NULL,
    superseded_date DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_award_rate UNIQUE (classification_id, employment_type, effective_date)
);

-- =============================================================
-- UPLOADS TABLE
-- =============================================================
CREATE TYPE upload_status AS ENUM ('pending', 'processing', 'complete', 'error');

CREATE TABLE IF NOT EXISTS uploads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    filename_original VARCHAR(255) NOT NULL,
    storage_path VARCHAR(500) NOT NULL,
    row_count INTEGER,
    status upload_status NOT NULL DEFAULT 'pending',
    column_mapping JSONB,
    award_id UUID REFERENCES awards(id),
    uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    purge_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '90 days')
);

-- =============================================================
-- EMPLOYEE RECORDS TABLE
-- =============================================================
CREATE TYPE confidence_score AS ENUM ('HIGH', 'MEDIUM', 'LOW');
CREATE TYPE gap_direction AS ENUM ('UNDERPAID', 'OVERPAID', 'AT_RATE', 'EXCLUDED');

CREATE TABLE IF NOT EXISTS employee_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    upload_id UUID NOT NULL REFERENCES uploads(id) ON DELETE CASCADE,
    employee_ref VARCHAR(100) NOT NULL,
    role_title VARCHAR(255),
    employment_type employment_type,
    weekly_hours DECIMAL(5,2),
    current_pay_rate_hourly DECIMAL(10,4),
    mapped_classification_id UUID REFERENCES award_classifications(id),
    confidence_score confidence_score NOT NULL,  -- NOT NULL: NFR-L3
    fwc_rate_hourly DECIMAL(10,4),
    gap_hourly DECIMAL(10,4),
    gap_weekly DECIMAL(10,4),
    gap_direction gap_direction NOT NULL DEFAULT 'EXCLUDED',
    exclusion_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    purge_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- =============================================================
-- REPORTS TABLE
-- =============================================================
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    upload_id UUID NOT NULL REFERENCES uploads(id) ON DELETE CASCADE,
    storage_path VARCHAR(500) NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    rate_table_effective_date DATE NOT NULL,
    employee_count_checked INTEGER NOT NULL DEFAULT 0,
    employee_count_gaps INTEGER NOT NULL DEFAULT 0,
    total_gap_weekly_aud DECIMAL(12,4),
    disclaimer_version VARCHAR(50) NOT NULL,
    purge_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '90 days'),
    CONSTRAINT uq_report_upload UNIQUE (upload_id)
);

-- =============================================================
-- AUDIT LOG TABLE
-- =============================================================
CREATE TABLE IF NOT EXISTS audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    event_type VARCHAR(100) NOT NULL,
    metadata JSONB,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    purge_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '12 months')
);

-- =============================================================
-- WAITLIST TABLE
-- =============================================================
CREATE TABLE IF NOT EXISTS waitlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    business_size VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- =============================================================
-- INDEXES
-- =============================================================
CREATE INDEX IF NOT EXISTS idx_uploads_account_id ON uploads(account_id);
CREATE INDEX IF NOT EXISTS idx_uploads_purge_at ON uploads(purge_at) WHERE purge_at < NOW();
CREATE INDEX IF NOT EXISTS idx_employee_records_upload_id ON employee_records(upload_id);
CREATE INDEX IF NOT EXISTS idx_employee_records_purge_at ON employee_records(purge_at) WHERE purge_at < NOW();
CREATE INDEX IF NOT EXISTS idx_reports_account_id ON reports(account_id);
CREATE INDEX IF NOT EXISTS idx_reports_purge_at ON reports(purge_at) WHERE purge_at < NOW();
CREATE INDEX IF NOT EXISTS idx_audit_log_account_id ON audit_log(account_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_purge_at ON audit_log(purge_at) WHERE purge_at < NOW();
CREATE INDEX IF NOT EXISTS idx_award_rates_classification ON award_rates(classification_id, employment_type, effective_date);

-- =============================================================
-- ROW LEVEL SECURITY (Tenant Isolation — NFR-S2)
-- =============================================================
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Users can only access their own account
CREATE POLICY "accounts_own_account" ON accounts
    USING (owner_user_id = auth.uid());

-- Users can only access uploads belonging to their account
CREATE POLICY "uploads_own_account" ON uploads
    USING (account_id IN (
        SELECT id FROM accounts WHERE owner_user_id = auth.uid()
    ));

-- Users can only access employee_records via their uploads
CREATE POLICY "employee_records_own_account" ON employee_records
    USING (upload_id IN (
        SELECT u.id FROM uploads u
        JOIN accounts a ON u.account_id = a.id
        WHERE a.owner_user_id = auth.uid()
    ));

-- Users can only access reports belonging to their account
CREATE POLICY "reports_own_account" ON reports
    USING (account_id IN (
        SELECT id FROM accounts WHERE owner_user_id = auth.uid()
    ));

-- =============================================================
-- PURGE JOB (pgmq-based scheduled cleanup — NFR-V2)
-- Operator runs this daily via a Supabase Edge Function or cron.
-- =============================================================
-- DELETE FROM uploads WHERE purge_at < NOW();
-- DELETE FROM employee_records WHERE purge_at < NOW();
-- DELETE FROM reports WHERE purge_at < NOW();
-- DELETE FROM audit_log WHERE purge_at < NOW();
