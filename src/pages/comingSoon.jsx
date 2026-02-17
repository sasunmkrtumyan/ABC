import { useEffect, useMemo, useState } from 'react'

function getCountdown(targetTime) {
  const now = Date.now()
  const remaining = Math.max(targetTime - now, 0)

  return {
    days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
    hours: Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((remaining % (1000 * 60)) / 1000),
  }
}

export default function ComingSoon() {
  const releaseTime = useMemo(() => new Date('2026-03-22T00:00:00+04:00').getTime(), [])
  const [countdown, setCountdown] = useState(() => getCountdown(releaseTime))
  const timeBlocks = [
    { label: 'Days', value: countdown.days },
    { label: 'Hours', value: countdown.hours },
    { label: 'Minutes', value: countdown.minutes },
    { label: 'Seconds', value: countdown.seconds },
  ]

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdown(getCountdown(releaseTime))
    }, 1000)

    return () => clearInterval(timerId)
  }, [releaseTime])

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1a1a2e_0%,#16213e_55%,#0f3460_100%)]"></div>
      </div>

      <section className="relative z-10 w-full max-w-[840px] px-5 py-10 text-center">
        <h1 className="mb-2 font-['Playfair_Display',Georgia,serif] text-[clamp(3.1rem,11vw,6.4rem)] font-bold leading-none tracking-[0.08em] [text-shadow:2px_4px_20px_rgba(0,0,0,0.3)]">
          <span className="text-[#d90012]">A</span>
          <span className="text-[#0033a0]">B</span>
          <span className="text-[#f2a800]">C</span>
        </h1>
        <h2 className="mb-2.5 font-['Playfair_Display',Georgia,serif] text-[clamp(1.15rem,3.1vw,3rem)] font-semibold tracking-[1px] text-white/95 [text-shadow:2px_4px_20px_rgba(0,0,0,0.3)]">
          Panarmenian Business Union
        </h2>
        <p className="mb-[42px] text-[clamp(0.95rem,2.8vw,1rem)] font-light uppercase tracking-[2px] text-white/85">
          Building Bridges, Creating Opportunities
        </p>
        <p className="mb-[34px] text-[clamp(0.82rem,2vw,1.05rem)] font-bold uppercase tracking-[4px] text-[#ff778a]">
          Coming Soon
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-[clamp(12px,3vw,24px)]" aria-live="polite" role="timer">
          {timeBlocks.map((item) => (
            <article
              className="!min-w-[110px] rounded-2xl border border-white/20 bg-white/[0.11] px-6 py-[18px]  max-[480px]:rounded-xl max-[480px]:px-4 max-[480px]:py-[14px]"
              key={item.label}
            >
              <p className="font-['Playfair_Display',Georgia,serif] text-[clamp(1.95rem,5.5vw,2.8rem)] font-bold leading-none text-white">
                {String(item.value).padStart(2, '0')}
              </p>
              <p className="mt-2 text-[0.72rem] uppercase tracking-[2px] text-white/70">{item.label}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
