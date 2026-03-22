from typing import Dict, Any, List
import json
import os
import re
from urllib.parse import quote_plus

import httpx

# Curated discover/search entry points (we do not scrape these sites; links open their official UIs).
PLATFORM_REGISTRY: Dict[str, Dict[str, str]] = {
    "unstop": {"label": "Unstop", "home": "https://unstop.com"},
    "devfolio": {"label": "Devfolio", "home": "https://devfolio.co"},
    "hack2skill": {"label": "Hack2skill", "home": "https://hack2skill.com"},
    "linkedin": {"label": "LinkedIn", "home": "https://www.linkedin.com"},
    "internshala": {"label": "Internshala", "home": "https://internshala.com"},
}

ALLOWED_PLATFORMS = frozenset(PLATFORM_REGISTRY.keys())


def _keyword_slug(text: str) -> str:
    """Single token slug for Internshala-style paths."""
    raw = (text.split()[0] if text.split() else "internship").lower()
    raw = re.sub(r"[^a-z0-9]+", "-", raw).strip("-")
    return raw or "internship"


def build_platform_search_url(platform_id: str, search_query: str) -> str:
    """Build a stable search/discover URL for each platform from the user's query."""
    q = quote_plus(search_query.strip() or "internship hackathon")
    kw = _keyword_slug(search_query.strip() or "python")
    templates = {
        "unstop": f"https://unstop.com/search?q={q}",
        "devfolio": f"https://devfolio.co/discover/hackathons?search={q}",
        "hack2skill": f"https://hack2skill.com/hackathons?search={q}",
        "linkedin": f"https://www.linkedin.com/jobs/search/?keywords={q}",
        # Internshala commonly uses /internships/keywords-{skill}-internship-in-india
        "internshala": f"https://internshala.com/internships/keywords-{kw}-internship-in-india",
    }
    return templates.get(platform_id, templates["unstop"])


# Seed ideas the model / fallback can map to real platforms (not live listings).
OPPORTUNITY_SEEDS: List[Dict[str, Any]] = [
    {
        "title": "Hackathons & hiring challenges",
        "skills": ["AI", "Web", "DSA", "Mobile"],
        "platform": "unstop",
    },
    {
        "title": "Developer hackathons & build sprints",
        "skills": ["React", "Node", "Full stack", "Open source"],
        "platform": "devfolio",
    },
    {
        "title": "Skill contests & innovation challenges",
        "skills": ["Python", "ML", "IoT", "Design"],
        "platform": "hack2skill",
    },
    {
        "title": "Internships & early-career roles",
        "skills": ["Java", "Python", "Marketing", "Data"],
        "platform": "linkedin",
    },
    {
        "title": "Student internships (India)",
        "skills": ["Web", "Android", "Content", "Business"],
        "platform": "internshala",
    },
    {
        "title": "More internships & trainings",
        "skills": ["MERN", "Cloud", "DevOps"],
        "platform": "internshala",
    },
]


class UpfolioService:
    """Service for matching users to opportunities with AI explanations and platform links."""

    def _build_search_query(self, user: Dict[str, Any]) -> str:
        skills = user.get("skills") or []
        interests = user.get("interests") or []
        year = user.get("year") or ""
        parts = []
        if skills:
            parts.append(" ".join(skills[:6]))
        if interests:
            parts.append(" ".join(interests[:4]))
        if year:
            parts.append(str(year))
        return " ".join(parts).strip() or "student opportunities"

    def _normalize_match(
        self,
        raw: Dict[str, Any],
        search_query: str,
    ) -> Dict[str, Any]:
        platform = (raw.get("platform") or "unstop").lower().strip()
        if platform not in ALLOWED_PLATFORMS:
            platform = "unstop"
        url = build_platform_search_url(platform, search_query)
        label = PLATFORM_REGISTRY[platform]["label"]
        title = str(raw.get("title") or f"Explore on {label}")
        score = raw.get("score")
        try:
            score = int(score)
        except (TypeError, ValueError):
            score = 70
        score = max(0, min(100, score))
        explanation = str(raw.get("explanation") or f"Browse fresh listings on {label} using your profile keywords.")
        return {
            "title": title,
            "score": score,
            "explanation": explanation,
            "platform": platform,
            "platform_label": label,
            "url": url,
        }

    async def match_user_to_opportunities(
        self,
        user: Dict[str, Any],
        opportunities: List[Dict[str, Any]],
    ) -> Dict[str, Any]:
        """Match user profile to opportunities; every row includes a vetted platform search URL."""
        groq_api_key = os.getenv("GROQ_API_KEY", "")
        groq_model = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
        search_query = self._build_search_query(user)

        if not groq_api_key:
            return self._get_demo_matches(
                user,
                opportunities,
                search_query,
                "Groq API key is missing; showing curated platform links (fallback).",
            )

        platform_lines = "\n".join(
            f"- {pid}: {PLATFORM_REGISTRY[pid]['label']}"
            for pid in sorted(ALLOWED_PLATFORMS)
        )
        prompt = f"""You help students find real opportunities. The user profile and seed ideas are below.

User profile:
{json.dumps(user, indent=2)}

Seed ideas (map or extend; prefer covering DIFFERENT platforms):
{json.dumps(opportunities, indent=2)}

Platforms you MUST use (pick platform id exactly):
{platform_lines}

Return ONLY valid JSON with this shape:
{{
  "matches": [
    {{
      "title": "Short actionable headline",
      "score": 0-100,
      "explanation": "1-2 sentences why this platform fits this user",
      "platform": "one of: unstop, devfolio, hack2skill, linkedin, internshala"
    }}
  ]
}}

Rules:
- Produce 5 to 8 matches.
- Use each major platform at least once when possible (unstop, devfolio, hack2skill, linkedin, internshala).
- Scores should reflect fit, not random.
- Do NOT invent specific job/hackathon URLs; the app will attach official search links.
- Do not include "url" in JSON."""

        headers = {
            "Authorization": f"Bearer {groq_api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": groq_model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.35,
        }

        try:
            async with httpx.AsyncClient(timeout=45.0) as client:
                response = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers=headers,
                    json=payload,
                )
                response.raise_for_status()
                data = response.json()
                content = data["choices"][0]["message"]["content"].strip()
                if content.startswith("```json"):
                    content = content[7:]
                if content.startswith("```"):
                    content = content[3:]
                if content.endswith("```"):
                    content = content[:-3]
                parsed = json.loads(content.strip())
                raw_matches = parsed.get("matches", [])
                matches = [
                    self._normalize_match(m, search_query) for m in raw_matches
                ]
                if not matches:
                    return self._get_demo_matches(
                        user,
                        opportunities,
                        search_query,
                        "AI returned no rows; showing curated platform links (fallback).",
                    )
                matches.sort(key=lambda x: x["score"], reverse=True)
                return {
                    "matches": matches,
                    "source": "groq",
                    "message": "Suggestions use official Unstop, Devfolio, Hack2skill, LinkedIn, and Internshala search pages — open links to browse live listings.",
                }
        except Exception as e:
            print(f"Upfolio AI matching failed: {e}")
            return self._get_demo_matches(
                user,
                opportunities,
                search_query,
                "Groq request failed; showing curated platform links (fallback).",
            )

    def _get_demo_matches(
        self,
        user: Dict[str, Any],
        opportunities: List[Dict[str, Any]],
        search_query: str,
        message: str,
    ) -> Dict[str, Any]:
        """Fallback: score seeds by skill overlap and attach platform search URLs."""
        user_skills = {s.lower().strip() for s in user.get("skills", []) if s}
        matches: List[Dict[str, Any]] = []
        for opportunity in opportunities:
            opportunity_skills = {
                s.lower().strip() for s in opportunity.get("skills", []) if s
            }
            overlap = user_skills.intersection(opportunity_skills)
            score = 55 + (15 * len(overlap))
            score = min(score, 98)
            platform = opportunity.get("platform") or "unstop"
            if platform not in ALLOWED_PLATFORMS:
                platform = "unstop"
            label = PLATFORM_REGISTRY[platform]["label"]
            explanation = (
                f"Good starting point on {label}: "
                f"{'skills overlap with ' + ', '.join(sorted(overlap)) if overlap else 'broad student opportunities'}."
            )
            matches.append(
                {
                    "title": opportunity["title"],
                    "score": score,
                    "explanation": explanation,
                    "platform": platform,
                    "platform_label": label,
                    "url": build_platform_search_url(platform, search_query),
                }
            )

        matches.sort(key=lambda item: item["score"], reverse=True)
        return {
            "matches": matches,
            "source": "fallback",
            "message": message,
        }


upfolio_service = UpfolioService()
