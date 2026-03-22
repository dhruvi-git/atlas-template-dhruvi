"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";
import {
  loadTracker,
  saveTracker,
  generateId,
  type TrackerEntry,
  type ApplicationStatus,
  type AchievementStatus,
} from "@/lib/upfolioTracker";

interface UpfolioMatch {
  title: string;
  score: number;
  explanation: string;
  platform: string;
  platform_label: string;
  url: string;
}

interface UpfolioResponse {
  matches: UpfolioMatch[];
  source?: "groq" | "fallback";
  message?: string | null;
}

const APPLICATION_STATUSES: { value: ApplicationStatus; label: string }[] = [
  { value: "saved", label: "Saved" },
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

const ACHIEVEMENT_STATUSES: { value: AchievementStatus; label: string }[] = [
  { value: "planned", label: "Planned" },
  { value: "submitted", label: "Submitted" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "finalist", label: "Finalist" },
  { value: "won", label: "Won" },
  { value: "participated", label: "Participated" },
];

export default function UpfolioPage() {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [matches, setMatches] = useState<UpfolioMatch[]>([]);
  const [tracker, setTracker] = useState<TrackerEntry[]>([]);
  const [achievementTitle, setAchievementTitle] = useState("");
  const [achievementNotes, setAchievementNotes] = useState("");

  useEffect(() => {
    setTracker(loadTracker());
  }, []);

  useEffect(() => {
    saveTracker(tracker);
  }, [tracker]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");
    setMatches([]);

    try {
      const response = await fetchWithAuth("/api/ai/match", {
        method: "POST",
        body: JSON.stringify({ skills, interests, year }),
      });
      if (!response.ok) throw new Error("Failed to match opportunities");
      const data = (await response.json()) as UpfolioResponse;
      setMatches(data.matches ?? []);
      if (data.message) setInfo(data.message);
    } catch (submitError) {
      setError("Unable to fetch matches right now. Please try again.");
      console.error("Upfolio matching failed:", submitError);
    } finally {
      setLoading(false);
    }
  };

  const addApplicationFromMatch = (match: UpfolioMatch) => {
    const row: TrackerEntry = {
      id: generateId(),
      kind: "application",
      title: match.title,
      platform: match.platform_label,
      url: match.url,
      status: "saved",
      notes: "",
      updatedAt: new Date().toISOString(),
    };
    setTracker((prev) => [row, ...prev]);
  };

  const addAchievement = () => {
    if (!achievementTitle.trim()) return;
    const row: TrackerEntry = {
      id: generateId(),
      kind: "achievement",
      title: achievementTitle.trim(),
      platform: "",
      url: "",
      status: "planned",
      notes: achievementNotes.trim(),
      updatedAt: new Date().toISOString(),
    };
    setTracker((prev) => [row, ...prev]);
    setAchievementTitle("");
    setAchievementNotes("");
  };

  const updateTrackerRow = (id: string, patch: Partial<TrackerEntry>) => {
    setTracker((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, ...patch, updatedAt: new Date().toISOString() }
          : row
      )
    );
  };

  const removeTrackerRow = (id: string) => {
    setTracker((prev) => prev.filter((row) => row.id !== id));
  };

  const applications = tracker.filter((t) => t.kind === "application");
  const achievements = tracker.filter((t) => t.kind === "achievement");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Upfolio</h1>
        <p className="text-slate-600 mt-1">
          AI-powered matcher with links to Unstop, Devfolio, Hack2skill, LinkedIn &amp; Internshala — plus a
          personal tracker (saved in this browser).
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm text-amber-900">
          <strong>Note:</strong> We open each platform&apos;s official search or discover pages using your keywords.
          Live listings change on those sites; we don&apos;t scrape them. Your application &amp; achievement tracker
          is stored locally in <code className="bg-amber-100 px-1 rounded">localStorage</code> (this device only).
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Skills *</label>
            <input
              type="text"
              value={skills}
              onChange={(event) => setSkills(event.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., AI, React, Python"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Interests *</label>
            <input
              type="text"
              value={interests}
              onChange={(event) => setInterests(event.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Hackathons, Internships"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Year *</label>
            <input
              type="text"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 3rd Year"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Matching..." : "Find Opportunities"}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      {info && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-700">{info}</p>
        </div>
      )}

      <div className="grid gap-4">
        {matches.map((match, index) => (
          <div
            key={`${match.platform}-${match.title}-${index}`}
            className="bg-white rounded-xl border border-slate-200 p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div>
                <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-slate-100 text-slate-700 mb-1">
                  {match.platform_label}
                </span>
                <h3 className="text-lg font-semibold text-slate-900">{match.title}</h3>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 shrink-0">
                Match: {match.score}
              </span>
            </div>
            <p className="text-slate-700 mb-4">{match.explanation}</p>
            <div className="flex flex-wrap gap-2">
              <a
                href={match.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Visit {match.platform_label} ↗
              </a>
              <button
                type="button"
                onClick={() => addApplicationFromMatch(match)}
                className="inline-flex items-center px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                Track as application
              </button>
            </div>
          </div>
        ))}
        {!loading && !error && matches.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-slate-600">
              Enter your profile details and click &quot;Find Opportunities&quot; to get platform suggestions with
              links.
            </p>
          </div>
        )}
      </div>

      {/* Tracker */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">My tracker</h2>

        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Add achievement / milestone</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
              <input
                type="text"
                value={achievementTitle}
                onChange={(e) => setAchievementTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Winner — XYZ Hackathon"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
              <input
                type="text"
                value={achievementNotes}
                onChange={(e) => setAchievementNotes(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Optional details, certificate link, etc."
              />
            </div>
          </div>
          <button
            type="button"
            onClick={addAchievement}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Add achievement
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-900">Applications ({applications.length})</h3>
          </div>
          {applications.length === 0 ? (
            <p className="p-5 text-slate-600 text-sm">No applications tracked yet. Use &quot;Track as application&quot; on a suggestion above.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {applications.map((row) => (
                <li key={row.id} className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900">{row.title}</p>
                    <p className="text-sm text-slate-500">{row.platform}</p>
                    {row.url && (
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:underline break-all"
                      >
                        Open link
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={row.status}
                      onChange={(e) =>
                        updateTrackerRow(row.id, {
                          status: e.target.value as ApplicationStatus,
                        })
                      }
                      className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm"
                    >
                      {APPLICATION_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeTrackerRow(row.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200 bg-slate-50">
            <h3 className="font-semibold text-slate-900">Achievements &amp; milestones ({achievements.length})</h3>
          </div>
          {achievements.length === 0 ? (
            <p className="p-5 text-slate-600 text-sm">Add wins, certifications, or event outcomes above.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {achievements.map((row) => (
                <li key={row.id} className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900">{row.title}</p>
                    {row.notes && <p className="text-sm text-slate-600">{row.notes}</p>}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={row.status}
                      onChange={(e) =>
                        updateTrackerRow(row.id, {
                          status: e.target.value as AchievementStatus,
                        })
                      }
                      className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm"
                    >
                      {ACHIEVEMENT_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeTrackerRow(row.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
