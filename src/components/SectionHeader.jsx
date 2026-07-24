export default function SectionHeader({ eyebrow, title, subtitle, className = '' }) {
  return (
    <div className={className}>
      {eyebrow && (
        <p style={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#b95221' }}>
          {eyebrow}
        </p>
      )}
      <h2 style={{ marginTop: '0.75rem', fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f2f7f2', lineHeight: 1.1 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ marginTop: '1rem', maxWidth: '42rem', fontSize: '1rem', lineHeight: 1.65, color: '#94a3b8' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}