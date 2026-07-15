# Placement Readiness Portal

> **GitHub Description:** A fully transparent, GitHub-driven leaderboard and submission portal for the 25MX Cohort (MCA Department, PSG College of Technology). No database, no logins.
> **GitHub Topics:** `nextjs`, `tailwindcss`, `github-actions`, `education`, `leaderboard`, `markdown-driven`, `placement-readiness`

**25MX Cohort — MCA Department, PSG College of Technology**  
*Placement Rep: Tino Britty J*

A fully transparent, GitHub-driven leaderboard and submission portal. No database, no logins. Everything is driven by PRs and Markdown files.  
> Students fork → work in their own folder → open PR → owner merges → leaderboard updates automatically.

📊 **Live Site:** [class.psgmx.tech](https://class.psgmx.tech/)  
📖 **How to contribute:** [HOW_TO_CONTRIBUTE.md](./HOW_TO_CONTRIBUTE.md)  
👤 **Owner guide:** [OWNER_GUIDE.md](./docs/OWNER_GUIDE.md)

---

## Leaderboard (auto-updated after every merge)

<!-- LEADERBOARD:START -->
| Rank | Student | Roll No | Score | Attendance |
|------|---------|---------|-------|-----------|
| 🥇 1 | BARATHVIKRAMAN S K | 25mx103 | 60 | 2/2 (100%) |
| 🥈 2 | Abishek S | 25mx301 | 60 | 2/2 (100%) |
| 🥉 3 | ROHITHMAHESHWARAN K | 25mx342 | 30 | 1/2 (50%) |
| 4 | Shanmugappriya K | 25mx223 | 30 | 1/2 (50%) |
| 5 | Surya Krishna S | 25mx126 | 30 | 1/2 (50%) |
| 6 | Radhu Dharsan K M | 25mx341 | 30 | 1/2 (50%) |
| 7 | STEPHINA SMILY C | 25mx125 | 30 | 1/2 (50%) |
| 8 | Saravanavel P | 25mx220 | 30 | 1/2 (50%) |
| 9 | Sweatha A M | 25mx128 | 30 | 1/2 (50%) |
| 10 | M.R.Siddarth | 25mx346 | 30 | 1/2 (50%) |

**🏆 Top Team:** undefined (avg: 31.7 pts)
**Today's submissions:** 2/123 students submitted on 2026-07-15 · **Last updated:** 2026-07-15
<!-- LEADERBOARD:END -->

---

## Repository Structure

```
placement-readiness/
├── app/                          ← Next.js 14 App Router routes (deployed to Vercel)
├── components/                   ← React UI components
├── lib/                          ← Data loading logic (data.ts)
├── activities/                   ← One folder per day, containing student submissions
├── data/                         ← The single source of truth for the portal
│   ├── roster.json               ← Master student list
│   ├── scoreboard.json           ← All student scores
│   ├── attendance.json           ← Per-day attendance
│   └── teams.json                ← Team roster + rollups
├── docs/                         ← Documentation and guides
├── scripts/                      ← Node scripts run by GitHub Actions
└── .github/workflows/            ← validate-pr.yml, on-merge.yml
```

---

## Local Development

If you want to run the portal locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Quick Links

- 🔴 **Students who haven't submitted today** — check the [live dashboard](https://class.psgmx.tech/)
- 📋 [Full Leaderboard](https://class.psgmx.tech/leaderboard)
- 👥 [Team Standings](https://class.psgmx.tech/teams)
- 📅 [Activity Timeline](https://class.psgmx.tech/activities)
