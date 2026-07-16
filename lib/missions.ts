/**
 * missions.ts — The single source of truth for all 30 engineering sprint missions.
 *
 * Each mission maps an ISO date to its mission metadata.
 * Used by: activities/page.tsx, activities/[date]/page.tsx,
 *           students/[rollnumber]/page.tsx, app/page.tsx
 *
 * To add/edit a mission: update MISSIONS_DATA below.
 * The rest of the UI updates automatically.
 */

export interface Mission {
  date: string          // ISO date "2026-07-16"
  missionName: string   // "Mission Cisco"
  company: string       // "Cisco"
  companyIcon: string   // emoji or short symbol
  skill: string         // "Networking & Protocols"
  week: 1 | 2 | 3 | 4
  weekTheme: string     // "Computer Networks & Infrastructure"
  title: string         // specific task title for this day
  desc: string          // 1-2 sentence description
  tasks: string[]       // step-by-step objectives
  deliverables: string[]// required files
  optionalDeliverables?: string[] // optional extras
  isSpecial?: boolean   // Friday presentation days
  specialNote?: string  // e.g. "No coding today. Present your best work."
}

// ── Week Themes ────────────────────────────────────────────────────────────────

export const WEEK_THEMES: Record<1 | 2 | 3 | 4, { label: string; companies: string; color: string }> = {
  1: { label: 'Computer Networks & Infrastructure', companies: 'Cisco · Palo Alto · Zscaler', color: 'blue' },
  2: { label: 'Backend Engineering',                companies: 'Amazon · Walmart · Zoho',    color: 'yellow' },
  3: { label: 'Distributed Systems & Scalability', companies: 'Google · Meta · Microsoft',  color: 'purple' },
  4: { label: 'Real Engineering',                  companies: 'Atlassian · GitHub · Stripe', color: 'green' },
}

// ── Standard Deliverables ─────────────────────────────────────────────────────

const STANDARD_DELIVERABLES = ['README.md', 'reflection.md', 'prompts.md']
const STANDARD_OPTIONAL     = ['screenshots/', 'diagram.png', 'code/', 'research/', 'video.mp4']

// ── Mission Data ───────────────────────────────────────────────────────────────

export const MISSIONS_DATA: Mission[] = [
  // ── Week 1: Computer Networks & Infrastructure ──────────────────────────────
  {
    date: '2026-07-15',
    missionName: 'Foundation Day',
    company: 'GitHub',
    companyIcon: '🐙',
    skill: 'Git & Collaboration',
    week: 1,
    weekTheme: 'Computer Networks & Infrastructure',
    title: 'Claim Your Folder — Git, Forks & First PR',
    desc: 'The goal of this day is purely operational — every student experiences the full Git loop once. Fork → Clone → Commit → Push → PR.',
    tasks: [
      'Fork the main repo via GitHub UI',
      'Clone your fork locally',
      'Create students/YOUR_ROLL/profile.md with your name, GitHub username, and a one-line goal',
      'Commit → push → open PR to main',
    ],
    deliverables: ['students/YOUR_ROLL/profile.md'],
    optionalDeliverables: [],
  },
  {
    date: '2026-07-16',
    missionName: 'Mission Cisco',
    company: 'Cisco',
    companyIcon: '🌐',
    skill: 'Networking & Protocols',
    week: 1,
    weekTheme: 'Computer Networks & Infrastructure',
    title: 'Reverse Engineer the HTTP Request Lifecycle',
    desc: 'Trace exactly what happens from the moment you type a URL to the server response. Build a sequence diagram and document every layer.',
    tasks: [
      'Map the full HTTP request lifecycle: DNS → TCP → TLS → HTTP → Response',
      'Draw a sequence diagram (use draw.io, excalidraw, or ASCII art)',
      'Identify which layer each company (CDN, Load Balancer, App Server) sits at',
      'Write your README.md with architecture notes and resources',
      'Complete reflection.md: what surprised you? What would you ask Claude next?',
      'Log your best prompts in prompts.md',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['diagram.png', 'screenshots/'],
  },
  {
    date: '2026-07-17',
    missionName: 'Mission Cisco II',
    company: 'Cisco',
    companyIcon: '🔍',
    skill: 'Packet Analysis',
    week: 1,
    weekTheme: 'Computer Networks & Infrastructure',
    title: 'Wireshark Investigation — Read the Wire',
    desc: 'Given a PCAP file, investigate real network traffic. Find what protocols are used, detect anomalies, and document your findings.',
    tasks: [
      'Download the provided PCAP file from the repo',
      'Open it in Wireshark (or use tshark CLI)',
      'Identify: top protocols, DNS queries, TCP handshakes, any errors',
      'Write a findings report in README.md',
      'Note: what questions did you ask Claude? Did the answers help?',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['screenshots/'],
  },
  {
    date: '2026-07-18',
    missionName: 'Mission Palo Alto',
    company: 'Palo Alto Networks',
    companyIcon: '🛡️',
    skill: 'Network Security Design',
    week: 1,
    weekTheme: 'Computer Networks & Infrastructure',
    title: 'Design a Secure Office Network for 200 Employees',
    desc: 'You are the network architect. Design a secure, scalable office network from scratch. No coding — pure thinking, diagramming, and documentation.',
    tasks: [
      'Design network topology: VLANs, DMZ, firewall placement',
      'Define security policies: who gets access to what',
      'Include: WiFi segmentation, guest network, printer isolation',
      'Draw the full network diagram',
      'Reflect: what trade-offs did you make? What would Palo Alto add?',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['diagram.png', 'research/'],
  },
  {
    date: '2026-07-21',
    missionName: 'Mission Zscaler',
    company: 'Zscaler',
    companyIcon: '⚡',
    skill: 'DNS & TLS Debugging',
    week: 1,
    weekTheme: 'Computer Networks & Infrastructure',
    title: 'Analyze DNS, TCP Handshake & TLS Failure Scenarios',
    desc: 'Given 3 incident reports with broken network logs, diagnose what went wrong. Write an incident report like a real SRE.',
    tasks: [
      'Scenario 1: DNS resolution failure — find and explain the root cause',
      'Scenario 2: TCP SYN not acknowledged — what layer is broken?',
      'Scenario 3: TLS handshake fails at certificate validation — why?',
      'Write a formal incident report for each',
      'Propose a fix for each scenario',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['research/'],
  },
  {
    date: '2026-07-22',
    missionName: 'Mission Cisco III',
    company: 'Cisco',
    companyIcon: '📋',
    skill: 'API Traffic Debugging',
    week: 1,
    weekTheme: 'Computer Networks & Infrastructure',
    title: 'API Traffic Debugging — Root Cause from Logs',
    desc: 'You are on-call. Production logs show elevated latency and 5xx errors. Diagnose the issue from the provided log dump.',
    tasks: [
      'Download the provided log file from the repo',
      'Identify error patterns: status codes, timestamps, request paths',
      'Determine the root cause (e.g. DB timeout, upstream failure, memory leak)',
      'Write a root cause document with timeline',
      'Propose 3 measures to prevent recurrence',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['research/'],
    isSpecial: false,
  },

  // ── Week 2: Backend Engineering ─────────────────────────────────────────────
  {
    date: '2026-07-23',
    missionName: 'Mission Amazon',
    company: 'Amazon',
    companyIcon: '🔗',
    skill: 'Backend Design',
    week: 2,
    weekTheme: 'Backend Engineering',
    title: 'Design a URL Shortener (bit.ly clone)',
    desc: 'No coding — pure system design. How does bit.ly work at scale? Design the data model, API, and architecture from scratch.',
    tasks: [
      'Define the API contract: POST /shorten, GET /:code',
      'Design the data model and choose your database (explain why)',
      'Handle: 100M URLs, 10B redirects/day, <100ms latency',
      'Draw the architecture diagram',
      'Document trade-offs: SQL vs NoSQL, hash collisions, analytics',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['diagram.png'],
  },
  {
    date: '2026-07-24',
    missionName: 'Mission Walmart',
    company: 'Walmart',
    companyIcon: '🏪',
    skill: 'Database Design',
    week: 2,
    weekTheme: 'Backend Engineering',
    title: 'Design an Inventory Management System',
    desc: 'Design the backend for a Walmart-scale inventory system: millions of products, hundreds of warehouses, real-time stock updates.',
    tasks: [
      'Design the full ER diagram (Products, Warehouses, Stock, Transactions)',
      'Define all API endpoints (REST)',
      'Handle: concurrent stock updates, low-stock alerts, reorder triggers',
      'Write a README.md with architecture decisions',
      'Reflection: what was the hardest part to design?',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['diagram.png', 'research/'],
  },
  {
    date: '2026-07-25',
    missionName: 'Mission Zoho',
    company: 'Zoho',
    companyIcon: '📡',
    skill: 'API Development',
    week: 2,
    weekTheme: 'Backend Engineering',
    title: 'Build a REST API Contract (Design Only — No Code)',
    desc: 'Write the full OpenAPI-style contract for a CRM system. No implementation — just specification. Treat it like a real RFC.',
    tasks: [
      'Define resources: Contact, Company, Deal, Activity',
      'Write all endpoints with request/response schemas',
      'Handle: pagination, filtering, sorting, error formats',
      'Document authentication strategy (API key vs OAuth)',
      'Write a README.md explaining every design decision',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['research/'],
  },
  {
    date: '2026-07-28',
    missionName: 'Mission Amazon II',
    company: 'Amazon',
    companyIcon: '🐛',
    skill: 'Debugging',
    week: 2,
    weekTheme: 'Backend Engineering',
    title: 'Debug the Broken Backend Project',
    desc: 'A real (deliberately broken) backend project is provided. Find all bugs. Fix them. Document everything like a senior engineer.',
    tasks: [
      'Clone the buggy project from the repo',
      'Run it — read the error messages carefully',
      'Find and fix all planted bugs (min 4)',
      'Write a bug report: bug description, root cause, fix applied',
      'Reflection: what tools/techniques helped you most?',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['code/', 'screenshots/'],
  },
  {
    date: '2026-07-29',
    missionName: 'Mission Zoho II',
    company: 'Zoho',
    companyIcon: '⚙️',
    skill: 'Database Optimization',
    week: 2,
    weekTheme: 'Backend Engineering',
    title: 'Database Optimization Challenge',
    desc: 'A slow SQL query is taking 12 seconds. Optimize it to under 200ms. Given: the schema, the query, and sample data.',
    tasks: [
      'Analyze the given slow query with EXPLAIN',
      'Identify: missing indexes, N+1 queries, full table scans',
      'Rewrite the query and add appropriate indexes',
      'Compare before/after execution times',
      'Write README.md with your optimization strategy',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['research/'],
    isSpecial: false,
  },

  // ── Week 3: Distributed Systems & Scalability ───────────────────────────────
  {
    date: '2026-07-30',
    missionName: 'Mission Google',
    company: 'Google',
    companyIcon: '▶️',
    skill: 'Scalability',
    week: 3,
    weekTheme: 'Distributed Systems & Scalability',
    title: 'Design the YouTube Video Upload Pipeline',
    desc: 'How does YouTube process 500 hours of video per minute? Design the entire upload and processing pipeline.',
    tasks: [
      'Map the full upload flow: client → CDN → processing queue → transcoding → storage → playback',
      'Design the transcoding pipeline (multiple resolutions, async workers)',
      'Handle: upload resumption, failures, duplicate detection',
      'Draw a Mermaid or ASCII architecture diagram',
      'Document all trade-offs',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['diagram.png'],
  },
  {
    date: '2026-07-31',
    missionName: 'Mission Meta',
    company: 'Meta',
    companyIcon: '💬',
    skill: 'Real-Time Systems',
    week: 3,
    weekTheme: 'Distributed Systems & Scalability',
    title: 'Design the WhatsApp Messaging Flow',
    desc: 'How does a message travel from your phone to your friend\'s phone in milliseconds, even when they\'re offline?',
    tasks: [
      'Design the message delivery flow: sender → server → receiver',
      'Handle: offline delivery, read receipts, end-to-end encryption (high level)',
      'Choose and justify: WebSockets vs HTTP long-polling vs MQTT',
      'Design the message queue and persistence layer',
      'Draw the complete flow diagram',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['diagram.png', 'research/'],
  },
  {
    date: '2026-08-01',
    missionName: 'Mission Microsoft',
    company: 'Microsoft',
    companyIcon: '⚡',
    skill: 'Caching',
    week: 3,
    weekTheme: 'Distributed Systems & Scalability',
    title: 'Cache Challenge — Design Redis Strategy for a Social Feed',
    desc: 'A social feed is slow. Design the complete caching strategy using Redis. What to cache, how long, and how to invalidate.',
    tasks: [
      'Identify what data to cache: user timeline, post data, counts',
      'Design cache key structure and TTL strategy',
      'Handle: cache invalidation on new post, cache stampede, cold start',
      'Write a Redis data structure design (hashes, sorted sets, lists)',
      'Document: cache hit rate target and failure scenarios',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['diagram.png'],
  },
  {
    date: '2026-08-04',
    missionName: 'Mission Meta II',
    company: 'Meta',
    companyIcon: '🔔',
    skill: 'Event-Driven Architecture',
    week: 3,
    weekTheme: 'Distributed Systems & Scalability',
    title: 'Design a Notification Service for 1 Billion Users',
    desc: 'Design the notification system that powers Facebook. Push, email, SMS, in-app — all at scale.',
    tasks: [
      'Design the notification pipeline: event → queue → router → channel',
      'Handle: multi-channel delivery (push/email/SMS), priority queues',
      'Design user preference system (do not disturb, channel preferences)',
      'Handle: delivery failures, retries, deduplication',
      'Draw the full architecture diagram',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['diagram.png', 'research/'],
  },
  {
    date: '2026-08-05',
    missionName: 'Mission Google II',
    company: 'Google',
    companyIcon: '🚀',
    skill: 'Scalability',
    week: 3,
    weekTheme: 'Distributed Systems & Scalability',
    title: 'Handle 10 Million Users — Scale Your Architecture',
    desc: 'Start with a monolith serving 1000 users. Scale it to 10 million. Document every architectural decision.',
    tasks: [
      'Phase 1 (1K users): monolith + single DB — what breaks first?',
      'Phase 2 (100K users): add CDN, read replicas, horizontal scaling',
      'Phase 3 (1M users): microservices split, message queues, distributed cache',
      'Phase 4 (10M users): multi-region, database sharding, observability',
      'Draw the architecture at each phase. Document what you added and why.',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['diagram.png'],
  },

  // ── Week 4: Real Engineering ────────────────────────────────────────────────
  {
    date: '2026-08-06',
    missionName: 'Mission GitHub',
    company: 'GitHub',
    companyIcon: '🔍',
    skill: 'Code Review',
    week: 4,
    weekTheme: 'Real Engineering',
    title: 'Code Review Challenge — Review Like a Senior Engineer',
    desc: 'A pull request is provided with 8–10 real engineering problems. Find them all. Write review comments like a GitHub senior engineer.',
    tasks: [
      'Review the provided code in the repo',
      'Find: bugs, security issues, performance problems, style issues',
      'Write proper GitHub-style review comments for each issue',
      'Suggest fixes, not just complaints',
      'Reflection: what makes a good code review? What\'s your review style?',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['screenshots/'],
  },
  {
    date: '2026-08-07',
    missionName: 'Mission Atlassian',
    company: 'Atlassian',
    companyIcon: '🌿',
    skill: 'Git Workflows',
    week: 4,
    weekTheme: 'Real Engineering',
    title: 'Git Conflict Resolution — Fix the Broken Branch',
    desc: 'A merge conflict nightmare is provided. Resolve it correctly, understand why each conflict happened, and document your approach.',
    tasks: [
      'Clone the provided conflicted repository',
      'Understand both branches: what each person was trying to do',
      'Resolve all merge conflicts correctly (do not just accept one side)',
      'Write a post-mortem: why did the conflicts happen? How to prevent?',
      'Reflection: what git commands helped most?',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['screenshots/'],
  },
  {
    date: '2026-08-08',
    missionName: 'Mission Stripe',
    company: 'Stripe',
    companyIcon: '📝',
    skill: 'API Documentation',
    week: 4,
    weekTheme: 'Real Engineering',
    title: 'API Documentation Sprint — Rewrite the Worst Docs',
    desc: 'You are given terrible API documentation. Rewrite it to Stripe quality. Every endpoint, every parameter, every example.',
    tasks: [
      'Review the provided bad documentation',
      'Rewrite every endpoint with: description, parameters, request/response examples',
      'Add: error codes, rate limits, authentication notes',
      'Write a getting started guide',
      'Reflection: what makes great API documentation?',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['research/'],
  },
  {
    date: '2026-08-11',
    missionName: 'Mission OpenAI',
    company: 'OpenAI',
    companyIcon: '🤖',
    skill: 'AI Engineering',
    week: 4,
    weekTheme: 'Real Engineering',
    title: 'AI Prompt Engineering Battle — 15 Prompts Only',
    desc: 'You have exactly 15 prompts with Claude. Complete the given engineering challenge using those prompts as efficiently as possible.',
    tasks: [
      'Read the challenge brief in the repo',
      'Plan your prompt strategy before you start',
      'Use your 15 prompts wisely — quality over quantity',
      'Document every prompt, the response, and what you learned from it',
      'Reflection: what made your best prompts effective?',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: [],
    specialNote: '⚡ Only 15 prompts allowed. Make them count.',
  },
  {
    date: '2026-08-12',
    missionName: 'Mission Datadog',
    company: 'Datadog',
    companyIcon: '🚨',
    skill: 'Observability',
    week: 4,
    weekTheme: 'Real Engineering',
    title: 'Production Incident Simulation — CPU 98%, Latency 7s',
    desc: 'You are on-call. A production incident just fired. CPU 98%, latency 7 seconds, users complaining. Fix it.',
    tasks: [
      'Review the provided: logs, metrics, alerts',
      'Write your incident timeline: what you checked and when',
      'Identify the root cause',
      'Write the incident report: timeline, root cause, fix, preventions',
      'Reflection: what would you add to monitoring to catch this earlier?',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['research/'],
  },
  {
    date: '2026-08-13',
    missionName: 'Mission GitHub II',
    company: 'GitHub',
    companyIcon: '💼',
    skill: 'Technical Portfolio',
    week: 4,
    weekTheme: 'Real Engineering',
    title: 'Build Your Technical Portfolio Page',
    desc: 'Create a professional technical portfolio page in Markdown. This is the landing page for your GitHub profile.',
    tasks: [
      'Write a compelling technical bio (3–5 sentences)',
      'List your top skills with proficiency context',
      'Document your best 3 projects from this sprint with links',
      'Add: what you\'re learning, how to contact you, your GitHub stats badge',
      'Create students/YOUR_ROLL/portfolio.md',
    ],
    deliverables: ['students/YOUR_ROLL/portfolio.md', 'reflection.md', 'prompts.md'],
    optionalDeliverables: [],
  },
  {
    date: '2026-08-14',
    missionName: 'Mission Stripe II',
    company: 'Stripe',
    companyIcon: '🎯',
    skill: 'System Design Interview',
    week: 4,
    weekTheme: 'Real Engineering',
    title: 'Mock Design Interview — 45 Minutes',
    desc: 'Simulate a real system design interview. Given a problem, you have 45 minutes. Document your thinking process, not just the answer.',
    tasks: [
      'Read the design problem in the repo',
      'Set a 45-minute timer — simulate real interview conditions',
      'Document: clarifying questions, assumptions, your design, trade-offs',
      'Draw the architecture diagram',
      'Reflection: what would you do differently with more time?',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['diagram.png'],
  },
  {
    date: '2026-08-15',
    missionName: 'Mission Cloudflare',
    company: 'Cloudflare',
    companyIcon: '🏆',
    skill: 'Edge Networking',
    week: 4,
    weekTheme: 'Real Engineering',
    title: 'Demo Day + Engineering Showcase',
    desc: 'The final mission. Present your best work from the sprint. Your portfolio, your best mission, your growth.',
    tasks: [
      'Choose your best mission from the 30-day sprint',
      'Prepare a 5-minute presentation',
      'Present to the cohort: problem, your approach, what you learned',
      'Submit final reflection: what changed in how you think about engineering?',
      'Add a final README.md summarising your entire sprint journey',
    ],
    deliverables: STANDARD_DELIVERABLES,
    optionalDeliverables: ['video.mp4', 'screenshots/'],
    isSpecial: true,
    specialNote: '🏆 Final Mission. Demo Day. Make it count.',
  },
]

// ── Lookup Helpers ─────────────────────────────────────────────────────────────

/** Get mission by ISO date string */
export function getMission(date: string): Mission | undefined {
  return MISSIONS_DATA.find(m => m.date === date)
}

/** Get all missions for a given week */
export function getMissionsByWeek(week: 1 | 2 | 3 | 4): Mission[] {
  return MISSIONS_DATA.filter(m => m.week === week)
}

/** Get today's mission in IST */
export function getTodayMission(): Mission | undefined {
  const istTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
  const yyyy = istTime.getFullYear()
  const mm   = String(istTime.getMonth() + 1).padStart(2, '0')
  const dd   = String(istTime.getDate()).padStart(2, '0')
  const todayISO = `${yyyy}-${mm}-${dd}`
  return getMission(todayISO)
}

/** Get next upcoming mission (first mission after today that has no data yet) */
export function getNextMission(activeDates: string[]): Mission | undefined {
  const activeSet = new Set(activeDates)
  return MISSIONS_DATA.find(m => !activeSet.has(m.date) && m.date > (activeDates[activeDates.length - 1] ?? ''))
}

/** All unique dates in the missions schedule */
export const ALL_MISSION_DATES = MISSIONS_DATA.map(m => m.date)
