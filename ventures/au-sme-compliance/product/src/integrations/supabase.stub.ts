/**
 * Supabase Integration — Stub
 *
 * This module defines the interface for all Supabase interactions.
 * The stub implementation returns in-memory data suitable for testing
 * without any real credentials or network calls.
 *
 * In production, replace the exports with a real Supabase client
 * initialised from environment variables (see .env.example).
 *
 * No real credentials are referenced here (NFR-S3).
 */

// ---------------------------------------------------------------------------
// Interface definitions — production implementation must satisfy these
// ---------------------------------------------------------------------------

export interface StoredUpload {
  uploadId: string;
  accountId: string;
  filename: string;
  storagePathEncrypted: string;
  rowCount: number;
  status: "pending" | "processing" | "complete" | "error";
  awardCode: string;
  uploadedAt: string;
  purgeAt: string;
}

export interface StoredReport {
  reportId: string;
  accountId: string;
  uploadId: string;
  storagePathEncrypted: string;
  generatedAt: string;
  rateTableEffectiveDate: string;
  employeeCountChecked: number;
  employeeCountGaps: number;
  totalGapWeeklyAud: number;
  disclaimerVersion: string;
  purgeAt: string;
}

export interface IStorageClient {
  /** Store a file, return the encrypted storage path */
  storeFile(bucket: string, path: string, content: Buffer): Promise<string>;
  /** Retrieve a file by storage path */
  getFile(storagePath: string): Promise<Buffer>;
  /** Generate a signed download URL (expires in 15 minutes) */
  getSignedUrl(storagePath: string, expiresInSeconds: number): Promise<string>;
  /** Delete a file by storage path */
  deleteFile(storagePath: string): Promise<void>;
}

export interface IDatabaseClient {
  /** Insert an upload record, return its id */
  insertUpload(upload: Omit<StoredUpload, "uploadId">): Promise<string>;
  /** Update upload status */
  updateUploadStatus(uploadId: string, status: StoredUpload["status"]): Promise<void>;
  /** Get upload by id (scoped to account) */
  getUpload(uploadId: string, accountId: string): Promise<StoredUpload | null>;
  /** Insert a report record, return its id */
  insertReport(report: Omit<StoredReport, "reportId">): Promise<string>;
  /** Get report by id (scoped to account) */
  getReport(reportId: string, accountId: string): Promise<StoredReport | null>;
}

// ---------------------------------------------------------------------------
// Stub implementations (in-memory, no credentials)
// ---------------------------------------------------------------------------

class InMemoryStorageClient implements IStorageClient {
  private files = new Map<string, Buffer>();

  async storeFile(_bucket: string, path: string, content: Buffer): Promise<string> {
    const encryptedPath = `encrypted://${path}`;
    this.files.set(encryptedPath, content);
    return encryptedPath;
  }

  async getFile(storagePath: string): Promise<Buffer> {
    const data = this.files.get(storagePath);
    if (!data) throw new Error(`File not found: ${storagePath}`);
    return data;
  }

  async getSignedUrl(storagePath: string, _expiresInSeconds: number): Promise<string> {
    return `https://stub-storage.example/signed/${encodeURIComponent(storagePath)}?token=stub_token`;
  }

  async deleteFile(storagePath: string): Promise<void> {
    this.files.delete(storagePath);
  }
}

class InMemoryDatabaseClient implements IDatabaseClient {
  private uploads = new Map<string, StoredUpload>();
  private reports = new Map<string, StoredReport>();
  private idCounter = 0;

  private nextId(): string {
    return `stub_${++this.idCounter}_${Date.now()}`;
  }

  async insertUpload(upload: Omit<StoredUpload, "uploadId">): Promise<string> {
    const id = this.nextId();
    this.uploads.set(id, { ...upload, uploadId: id });
    return id;
  }

  async updateUploadStatus(uploadId: string, status: StoredUpload["status"]): Promise<void> {
    const upload = this.uploads.get(uploadId);
    if (upload) upload.status = status;
  }

  async getUpload(uploadId: string, accountId: string): Promise<StoredUpload | null> {
    const upload = this.uploads.get(uploadId);
    if (!upload || upload.accountId !== accountId) return null;
    return upload;
  }

  async insertReport(report: Omit<StoredReport, "reportId">): Promise<string> {
    const id = this.nextId();
    this.reports.set(id, { ...report, reportId: id });
    return id;
  }

  async getReport(reportId: string, accountId: string): Promise<StoredReport | null> {
    const report = this.reports.get(reportId);
    if (!report || report.accountId !== accountId) return null;
    return report;
  }
}

// Exported singleton stubs — replace with real Supabase clients in production
export const storageClient: IStorageClient = new InMemoryStorageClient();
export const databaseClient: IDatabaseClient = new InMemoryDatabaseClient();
