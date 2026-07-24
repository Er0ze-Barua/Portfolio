import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { personal } from '../data/personal'
import ScrollFadeSection from './ScrollFadeSection'
import SectionHeader from './SectionHeader'

const profiles = [
  {
    id: 'leetcode',
    platform: 'LeetCode',
    username: 'BEr0ze',
    href: personal.social.leetcode,
    stats: [
      { label: 'Problems Solved', value: '—' },
      { label: 'Contest Rating', value: '—' },
      { label: 'Global Rank', value: '—' },
    ],
  },
  {
    id: 'github',
    platform: 'GitHub',
    username: 'Er0ze-Barua',
    href: personal.social.github,
    stats: [
      { label: 'Public Repos', value: '—' },
      { label: 'Total Stars', value: '—' },
      { label: 'Contributions', value: '—' },
    ],
  },
]

export default function CodingProfiles() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = profiles[activeIndex]

  const goPrev = () =>
    setActiveIndex((i) => (i === 0 ? profiles.length - 1 : i - 1))
  const goNext = () =>
    setActiveIndex((i) => (i === profiles.length - 1 ? 0 : i + 1))

  return (
    <ScrollFadeSection id="coding-profiles" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="CP / Coding Profiles"
          title="Where I practice"
          subtitle="LeetCode and GitHub stats — live data integration coming next."
        />

        <div className="relative mx-auto mt-16 max-w-md">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-burnt">
              {active.platform}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-mint">
              @{active.username}
            </h3>

            <dl className="mt-8 grid grid-cols-3 gap-4">
              {active.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <dt className="text-xs text-muted">{stat.label}</dt>
                  <dd className="mt-1 font-display text-xl font-bold text-mint">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={active.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex text-sm text-burnt-light transition-colors hover:text-burnt"
            >
              View profile →
            </a>
          </article>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-mint transition-colors hover:border-burnt/40 hover:bg-burnt/10"
              aria-label="Previous profile"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-muted">
              {activeIndex + 1} / {profiles.length}
            </span>
            <button
              type="button"
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-mint transition-colors hover:border-burnt/40 hover:bg-burnt/10"
              aria-label="Next profile"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </ScrollFadeSection>
  )
}
