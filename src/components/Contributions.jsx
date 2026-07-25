import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion'
import SectionHeader from './SectionHeader'

const TIMER_DURATION = 3500
const S = 'rgba(148,163,184,'
const O = 'rgba(185,82,33,'

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.92 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.92, transition: { duration: 0.28 } }),
}

const badge = (label) => (
  <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b95221', border: `1px solid ${O}0.3)`, borderRadius: 99, padding: '0.2rem 0.6rem' }}>{label}</span>
)

const Stat = ({ label, value, color = '#b95221' }) => (
  <div style={{ borderRadius: 10, border: `1px solid ${S}0.1)`, backgroundColor: `${S}0.04)`, padding: '1.1rem 0.5rem', textAlign: 'center' }}>
    <div style={{ fontSize: '1.5rem', fontWeight: 700, color }}>{value ?? '—'}</div>
    <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: 4, letterSpacing: '0.05em' }}>{label}</div>
  </div>
)

const Loading = () => <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>Loading...</div>
const Err = ({ label }) => <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>Could not load {label}</div>

const GITHUB_FALLBACK = {
  name: 'Eroze Barua',
  login: 'Er0ze-Barua',
  avatar_url: 'https://avatars.githubusercontent.com/u/180876142?v=4',
  public_repos: 12,
  followers: 3,
  following: 2,
  public_gists: 0,
  bio: 'AI & ML Engineering Intern | B.Tech CSE (AI & ML)'
}

function GitHubCard({ data, loading, error, isMobile }) {
  if (loading) return <Loading />
  const activeData = (error || !data) ? GITHUB_FALLBACK : data

  return (
    <div style={{ padding: isMobile ? '1.5rem 1.25rem' : '2.5rem', minHeight: isMobile ? '340px' : '380px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={activeData.avatar_url} alt="avatar" style={{ width: isMobile ? 56 : 72, height: isMobile ? 56 : 72, borderRadius: '50%', border: `2px solid ${S}0.3)` }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: isMobile ? '1.05rem' : '1.2rem' }}>
              <a href="https://github.com/Er0ze-Barua" target="_blank" rel="noopener noreferrer" 
                style={{ textDecoration: 'none', color: '#f2f7f2', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#b95221'}
                onMouseLeave={e => e.currentTarget.style.color = '#f2f7f2'}
              >
                {activeData.name || activeData.login}
              </a>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 2 }}>@{activeData.login}</div>
          </div>
        </div>
        {badge('GitHub')}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <Stat label="Public Repos" value={activeData.public_repos} />
        <Stat label="Followers" value={activeData.followers} />
        <Stat label="Following" value={activeData.following} />
        <Stat label="Public Gists" value={activeData.public_gists} />
      </div>
      {activeData.bio && <div style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.5 }}>{activeData.bio}</div>}
    </div>
  )
}

function LeetCodeCard({ data, loading, error, isMobile }) {
  if (loading) return <Loading />
  if (error || !data) return <Err label="LeetCode" />
  const solved = data.submitStats?.acSubmissionNum || []
  const all = solved.find(s => s.difficulty === 'All')
  const easy = solved.find(s => s.difficulty === 'Easy')
  const med = solved.find(s => s.difficulty === 'Medium')
  const hard = solved.find(s => s.difficulty === 'Hard')
  return (
    <div style={{ padding: isMobile ? '1.5rem 1.25rem' : '2.5rem', minHeight: isMobile ? '340px' : '380px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: isMobile ? '1.05rem' : '1.2rem' }}>
            <a href="https://leetcode.com/u/BEr0ze/" target="_blank" rel="noopener noreferrer" 
              style={{ textDecoration: 'none', color: '#f2f7f2', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#b95221'}
              onMouseLeave={e => e.currentTarget.style.color = '#f2f7f2'}
            >
              {data.username}
            </a>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 2 }}>LeetCode</div>
        </div>
        {badge('LeetCode')}
      </div>
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 800, color: '#b95221', lineHeight: 1 }}>{all?.count ?? '—'}</div>
        <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: 4 }}>Problems Solved</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.65rem' }}>
        <Stat label="Easy" value={easy?.count} color="#22c55e" />
        <Stat label="Medium" value={med?.count} color="#f59e0b" />
        <Stat label="Hard" value={hard?.count} color="#ef4444" />
      </div>
      {data.rating && <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.72rem', color: '#94a3b8' }}>Contest Rating <span style={{ color: '#b95221', fontWeight: 700 }}>{data.rating}</span></div>}
    </div>
  )
}

function CodeforcesCard({ data, loading, isMobile }) {
  if (loading) return <Loading />
  const cf = data?.result?.[0]
  return (
    <div style={{ padding: isMobile ? '1.5rem 1.25rem' : '2.5rem', minHeight: isMobile ? '340px' : '380px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: isMobile ? '1.05rem' : '1.2rem' }}>
            <a href="https://codeforces.com/profile/Er0ze" target="_blank" rel="noopener noreferrer" 
              style={{ textDecoration: 'none', color: '#f2f7f2', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#b95221'}
              onMouseLeave={e => e.currentTarget.style.color = '#f2f7f2'}
            >
              {cf?.handle ?? 'Er0ze'}
            </a>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 2 }}>Codeforces</div>
        </div>
        {badge('Codeforces')}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <Stat label="Rating" value={cf?.rating ?? 423} />
        <Stat label="Max Rating" value={cf?.maxRating ?? 423} />
        <Stat label="Rank" value={cf?.rank ?? 'Newbie'} />
        <Stat label="Contribution" value={cf?.contribution ?? 0} />
      </div>
    </div>
  )
}

export default function Contributions() {
  const [ghData, setGhData] = useState(null)
  const [ghLoading, setGhLoading] = useState(true)
  const [ghError, setGhError] = useState(false)
  const [lcData, setLcData] = useState(null)
  const [lcLoading, setLcLoading] = useState(true)
  const [lcError, setLcError] = useState(false)
  const [cfData, setCfData] = useState(null)
  const [cfLoading, setCfLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [hovered, setHovered] = useState(false)
  
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      setIsTablet(window.innerWidth < 1024)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 50) {
      go(1)
    } else if (diff < -50) {
      go(-1)
    }
    touchStartX.current = 0
    touchEndX.current = 0
  }

  const timerRef = useRef(null)
  const progressControls = useAnimationControls()

  useEffect(() => {
    fetch('https://api.github.com/users/Er0ze-Barua')
      .then(r => {
        if (!r.ok) throw new Error('Rate limit or API error')
        return r.json()
      })
      .then(setGhData)
      .catch(() => setGhError(true))
      .finally(() => setGhLoading(false))
  }, [])
  useEffect(() => {
    fetch('https://leetcode-proxy.beroze182.workers.dev', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({query:`{ matchedUser(username:"BEr0ze"){username submitStats{acSubmissionNum{difficulty count}}} userContestRanking(username:"BEr0ze"){rating} }`}) })
      .then(r=>r.json()).then(d=>{ const u=d?.data?.matchedUser; if(u){ const r=d?.data?.userContestRanking?.rating; setLcData({...u,rating:r?Math.round(r):null}) }else{setLcError(true)} }).catch(()=>setLcError(true)).finally(()=>setLcLoading(false))
  }, [])
  useEffect(() => { fetch('https://codeforces.com/api/user.info?handles=Er0ze').then(r=>r.json()).then(setCfData).catch(()=>{}).finally(()=>setCfLoading(false)) }, [])

  const cards = [
    { id: 'github', content: <GitHubCard data={ghData} loading={ghLoading} error={ghError} isMobile={isMobile} /> },
    { id: 'leetcode', content: <LeetCodeCard data={lcData} loading={lcLoading} error={lcError} isMobile={isMobile} /> },
    { id: 'codeforces', content: <CodeforcesCard data={cfData} loading={cfLoading} isMobile={isMobile} /> },
  ]

  useEffect(() => {
    if (hovered || isMobile) { progressControls.stop(); progressControls.set({ width: '0%' }) }
    else { progressControls.set({ width: '100%' }); progressControls.start({ width: '0%', transition: { duration: TIMER_DURATION/1000, ease: 'linear' } }) }
  }, [hovered, index, isMobile])

  useEffect(() => {
    clearInterval(timerRef.current)
    if (hovered || isMobile) return
    timerRef.current = setInterval(() => { setDir(1); setIndex(i=>(i+1)%3) }, TIMER_DURATION)
    return () => clearInterval(timerRef.current)
  }, [hovered, index, isMobile])

  const go = useCallback((d) => { setDir(d); setIndex(i=>(i+d+3)%3) }, [])
  const prevIndex = (index-1+3)%3
  const nextIndex = (index+1)%3

  const ghostStyle = { borderRadius:'16px', border:`1px solid ${S}0.08)`, backgroundColor:'rgba(17,16,16,0.6)', overflow:'hidden', minHeight: isMobile ? '340px' : '460px' }
  const navBtn = (side) => ({ position:'absolute', top:'50%', transform:'translateY(-50%)', [side]:'-1.4rem', width:'2.75rem', height:'2.75rem', borderRadius:'50%', border:`1px solid ${S}0.15)`, backgroundColor:'rgba(17,16,16,0.8)', color:'#94a3b8', cursor:'pointer', fontSize:'1.2rem', display:'flex', alignItems:'center', justifyContent:'center', zIndex:10 })

  return (
    <section id="contributions" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Profiles" title="Where I code" subtitle="Live stats from across platforms." />
        <div className="mt-14 flex justify-center items-center" style={{ gap: isTablet ? '0' : '1.5rem', width: '100%' }}>

          {!isTablet && (
            <motion.div key={`gl-${prevIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 0.22 }} transition={{ duration: 0.4 }}
              style={{ width: '300px', flexShrink: 0, transform: 'scale(0.91)', pointerEvents: 'none', filter: 'blur(1.5px)' }}>
              <div style={ghostStyle}>{cards[prevIndex].content}</div>
            </motion.div>
          )}

          <div style={{ position: 'relative', width: isMobile ? '100%' : '580px', maxWidth: '100%', flexShrink: 0 }}>
            <motion.div onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
              onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
              animate={hovered ? { boxShadow:`0 0 60px 12px ${O}0.2)`, borderColor:`${O}0.5)` } : { boxShadow:'none', borderColor:`${S}0.12)` }}
              transition={{ duration: 0.3 }}
              style={{ borderRadius:'20px', border:`1px solid ${S}0.12)`, backgroundColor:'rgba(17,16,16,0.8)', overflow:'hidden', minHeight: isMobile ? '340px' : '460px' }}
            >
              <div style={{ padding: '1.25rem 1.5rem 0' }}>
                <div style={{ height:'2px', backgroundColor:`${S}0.12)`, borderRadius:99, marginBottom:'0.85rem', overflow:'hidden' }}>
                  <motion.div animate={progressControls} style={{ height:'100%', backgroundColor:'#b95221', borderRadius:99, width:'100%' }} />
                </div>
                <div style={{ display:'flex', justifyContent:'center', gap:'8px' }}>
                  {cards.map((_,i) => (
                    <button key={i} onClick={() => { setDir(i>index?1:-1); setIndex(i) }}
                      style={{ height:'6px', borderRadius:'99px', border:'none', cursor:'pointer', transition:'all 0.3s', width:i===index?'20px':'6px', backgroundColor:i===index?'#b95221':`${S}0.25)` }} />
                  ))}
                </div>
              </div>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div key={cards[index].id} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">
                  {cards[index].content}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {!isMobile && (
              <>
                <motion.button onClick={() => go(-1)} whileHover={{ backgroundColor:`${O}0.15)`, borderColor:`${O}0.5)`, color:'#b95221' }} transition={{ duration:0.2 }} style={navBtn('left')}>‹</motion.button>
                <motion.button onClick={() => go(1)} whileHover={{ backgroundColor:`${O}0.15)`, borderColor:`${O}0.5)`, color:'#b95221' }} transition={{ duration:0.2 }} style={navBtn('right')}>›</motion.button>
              </>
            )}
          </div>

          {!isTablet && (
            <motion.div key={`gr-${nextIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 0.22 }} transition={{ duration: 0.4 }}
              style={{ width: '300px', flexShrink: 0, transform: 'scale(0.91)', pointerEvents: 'none', filter: 'blur(1.5px)' }}>
              <div style={ghostStyle}>{cards[nextIndex].content}</div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  )
}