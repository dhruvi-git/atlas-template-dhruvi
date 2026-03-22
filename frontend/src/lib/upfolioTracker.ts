const STORAGE_KEY = "upfolio_tracker_v1";

export type TrackerKind = "application" | "achievement";

export type ApplicationStatus =
  | "saved"
  | "applied"
  | "interview"
  | "offer"
  | "rejected";

export type AchievementStatus =
  | "planned"
  | "submitted"
  | "shortlisted"
  | "finalist"
  | "won"
  | "participated";

export interface TrackerEntry {
  id: string;
  kind: TrackerKind;
  title: string;
  platform?: string;
  url?: string;
  status: ApplicationStatus | AchievementStatus;
  notes: string;
  updatedAt: string;
}

function safeParse(raw: string | null): TrackerEntry[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (row): row is TrackerEntry =>
        typeof row === "object" &&
        row !== null &&
        "id" in row &&
        "title" in row &&
        "kind" in row
    );
  } catch {
    return [];
  }
}

export function loadTracker(): TrackerEntry[] {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(STORAGE_KEY));
}

export function saveTracker(entries: TrackerEntry[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
