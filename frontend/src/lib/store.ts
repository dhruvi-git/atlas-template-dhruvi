// Global state for Atlas Command Center (e.g. Zustand/Redux).
// Add stores for auth, agents, telemetry as needed.

export type User = {
  id: number;
  email: string;
  role: string;
  is_active: boolean;
};

let token: string | null = null;

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("atlas_token") ?? token;
  }
  return token;
}

export function setToken(t: string | null) {
  token = t ?? null;
  if (typeof window !== "undefined" && t) {
    localStorage.setItem("atlas_token", t);
  } else if (typeof window !== "undefined") {
    localStorage.removeItem("atlas_token");
  }
}
