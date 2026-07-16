import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getAllData,
  buildActivityDays,
} from '@/lib/data'
import { getMission } from '@/lib/missions'

interface Props {
  params: Promise<{ date: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params
  const mission = getMission(date)
  const label = new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  const title = mission ? `${mission.missionName} — ${label}` : label
  return {
    title,
    description: mission
      ? `${mission.missionName}: ${mission.desc}`
      : `Submission details for ${label} of the 25MX Engineering Sprint.`,
  }
}

export const revalidate = 60

export default async function ActivityDetailPage({ params }: Props) {
  const { date } = await params
  const { roster, attendance } = await getAllData()
  const activityDays = buildActivityDays(roster, attendance)

  const activityDay = activityDays.find(d => d.id === date)
  if (!activityDay) notFound()

  const mission = getMission(date)
  const label = new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  // Week colour palette
  const wc = mission ? (
    mission.week === 1 ? { badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',   glow: 'shadow-[0_0_20px_rgba(59,130,246,0.1)]' } :
    mission.week === 2 ? { badge: 'bg-brand-500/10 text-brand-400 border-brand-500/20', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.1)]'  } :
    mission.week === 3 ? { badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.1)]' } :
                         { badge: 'bg-green-500/10 text-green-400 border-green-500/20',  glow: 'shadow-[0_0_20px_rgba(34,197,94,0.1)]'  }
  ) : { badge: 'bg-slate-800 text-slate-400 border-slate-700', glow: '' }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Breadcrumb */}
      <div className="text-sm text-slate-500 flex items-center gap-2">
        <Link href="/activities" className="hover:text-slate-300 transition-colors">Mission Control</Link>
        <span>›</span>
        <span className="text-slate-300">{mission?.missionName ?? label}</span>
      </div>

      {/* Mission Header */}
      <div className={`card ${wc.glow} border-slate-800`}>
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Company icon + date */}
          <div className="flex-shrink-0 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#050505] border border-slate-800 flex items-center justify-center text-3xl mb-2">
              {mission?.companyIcon ?? '📅'}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">{label}</div>
          </div>

          {/* Mission info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${wc.badge}`}>
                Week {mission?.week ?? '?'} · {mission?.weekTheme ?? 'Engineering Sprint'}
              </span>
              {mission && (
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  {mission.company}
                </span>
              )}
              <span className={`badge ${
                activityDay.submissionRate >= 80
                  ? 'badge-green'
                  : activityDay.submissionRate >= 50
                  ? 'badge-yellow'
                  : 'badge-red'
              }`}>
                {activityDay.submissionCount}/{activityDay.totalStudents} submitted
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">
              {mission?.missionName ?? label}
            </h1>
            <p className="text-sm text-brand-400 font-semibold mb-2">{mission?.skill}</p>
            {mission?.desc && (
              <p className="text-slate-400 text-sm max-w-2xl">{mission.desc}</p>
            )}
            {mission?.specialNote && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold">
                {mission.specialNote}
              </div>
            )}
          </div>

          {/* Submission rate circle */}
          <div className="flex-shrink-0">
            <SubmissionRing rate={activityDay.submissionRate} />
          </div>
        </div>
      </div>

      {/* Mission Objectives */}
      {mission?.tasks && (
        <div className="card">
          <h2 className="font-bold text-white mb-4 text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400 text-xs">🎯</span>
            Mission Objectives
          </h2>
          <ol className="space-y-3">
            {mission.tasks.map((task, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-xs text-brand-400 font-bold mt-0.5">
                  {i + 1}
                </span>
                {task}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Required Deliverables */}
      {mission && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card">
            <h2 className="font-bold text-white mb-4 text-sm flex items-center gap-2">
              <span className="text-red-400">📦</span> Required Deliverables
            </h2>
            <ul className="space-y-2">
              {mission.deliverables.map(d => (
                <li key={d} className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span className="font-mono text-brand-400">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {(mission.optionalDeliverables?.length ?? 0) > 0 && (
            <div className="card">
              <h2 className="font-bold text-white mb-4 text-sm flex items-center gap-2">
                <span className="text-slate-400">✨</span> Optional (Extra Credit)
              </h2>
              <ul className="space-y-2">
                {mission.optionalDeliverables!.map(d => (
                  <li key={d} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 flex-shrink-0" />
                    <span className="font-mono text-slate-400">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Submission status */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Not submitted */}
        <div>
          <h2 className="font-bold text-white mb-3 flex items-center gap-2">
            <span className="text-red-400">✗</span>
            Not Submitted
            <span className="badge-red ml-1">{activityDay.nonSubmitters.length}</span>
          </h2>
          {activityDay.nonSubmitters.length === 0 ? (
            <div className="card text-center py-8">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-brand-400 font-bold">Everyone completed this mission!</p>
            </div>
          ) : (
            <div className="card border-red-500/20 bg-red-500/5">
              <div className="flex flex-wrap gap-1.5">
                {activityDay.nonSubmitters.map(roll => (
                  <Link
                    key={roll}
                    href={`/students/${roll}`}
                    className="inline-flex flex-col items-start px-2 py-1.5 rounded bg-red-500/10 border border-red-500/20
                               text-red-400 text-xs hover:bg-red-500/20 transition-colors group"
                  >
                    <span className="font-mono">{roll}</span>
                    <span className="text-red-600 group-hover:text-red-400 transition-colors">
                      {roster[roll]?.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submitted */}
        <div>
          <h2 className="font-bold text-white mb-3 flex items-center gap-2">
            <span className="text-brand-400">✓</span>
            Mission Complete
            <span className="badge-green ml-1">{activityDay.submitters.length}</span>
          </h2>
          {activityDay.submitters.length === 0 ? (
            <div className="card text-center py-8">
              <p className="text-slate-500 text-sm">No submissions yet for this mission.</p>
            </div>
          ) : (
            <div className="card border-brand-500/20 bg-brand-500/5">
              <div className="flex flex-wrap gap-1.5">
                {activityDay.submitters.map(roll => (
                  <Link
                    key={roll}
                    href={`/activities/${date}/${roll}`}
                    className="inline-flex flex-col items-start px-2 py-1.5 rounded bg-brand-500/10 border border-brand-500/20
                               text-brand-400 text-xs hover:bg-brand-500/20 transition-colors group"
                  >
                    <span className="font-mono">{roll}</span>
                    <span className="text-brand-600 group-hover:text-brand-400 transition-colors">
                      {roster[roll]?.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Submission Ring ────────────────────────────────────────────────────────────

function SubmissionRing({ rate }: { rate: number }) {
  const radius = 28
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (rate / 100) * circumference
  const color = rate >= 80 ? '#f59e0b' : rate >= 50 ? '#eab308' : '#ef4444'

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-20 h-20 -rotate-90">
          <circle cx="40" cy="40" r={radius} className="stroke-slate-800 fill-none" strokeWidth="4" />
          <circle
            cx="40" cy="40" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease', filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
        <span className="absolute text-lg font-black text-white">{rate}%</span>
      </div>
      <span className="text-[10px] text-slate-500 uppercase tracking-widest">submission rate</span>
    </div>
  )
}
