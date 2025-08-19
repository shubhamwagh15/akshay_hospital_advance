'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'

export default function Hero() {
  const slides = useMemo(
    () => ['/hospital-1.jpg', '/hospital-2.jpg', '/hospital-3.jpg'],
    []
  )
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  // Preload images
  useEffect(() => {
    slides.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [slides])

  // Auto-advance every 10s with cleanup
  useEffect(() => {
    startAuto()
    return stopAuto
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides])

  const startAuto = () => {
    stopAuto()
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 10000)
  }

  const stopAuto = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const goTo = (i) => {
    setIndex(i)
    startAuto() // restart timer on manual change
  }

  return (
    <section style={heroStyle} aria-label="Hero background slideshow">
      {/* Background layers */}
      <div style={bgContainerStyle} aria-hidden="true">
        {slides.map((src, i) => (
          <div
            key={src}
            style={{
              ...bgSlideStyle,
              opacity: index === i ? 1 : 0,
              backgroundImage: `url(${src})`,
            }}
          />
        ))}
        <div style={overlayStyle} />
      </div>

      {/* Content */}
      <div className="container" style={contentStyle}>
        <div style={textColStyle}>
          <h1 style={titleStyle}>Your Health, Our Priority</h1>
          <p style={descStyle}>
            Providing exceptional healthcare with compassion and expertise. Book your appointment and
            experience world-class medical care.
          </p>
          <div style={btnRowStyle}>
            <Link href="/appointment" className="btn btn-primary" style={btnStyle}>
              Book Appointment
            </Link>
            <Link href="/#services" className="btn" style={btnStyle}>
              Our Services
            </Link>
          </div>
        </div>
        <div style={rightColStyle} />
      </div>

      {/* Dots */}
      <div style={dotsStyle} role="tablist" aria-label="Slideshow controls">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            onMouseEnter={stopAuto}
            onMouseLeave={startAuto}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={index === i}
            role="tab"
            style={{
              ...dotStyle,
              backgroundColor: index === i ? '#fff' : 'rgba(255,255,255,0.5)',
              transform: index === i ? 'scale(1.15)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </section>
  )
}

/* Styles */
const heroStyle = {
  position: 'relative',
  color: 'white',
  padding: '5rem 0',
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
}

const bgContainerStyle = {
  position: 'absolute',
  inset: 0,
  zIndex: -2,
}

const bgSlideStyle = {
  position: 'absolute',
  inset: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  transition: 'opacity 800ms ease-in-out',
}

const overlayStyle = {
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(135deg, rgba(0,123,255,0.75) 0%, rgba(40,167,69,0.75) 100%)',
  zIndex: -1,
}

const contentStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '3rem',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
}

const textColStyle = {
  maxWidth: '560px',
}

const rightColStyle = {
  minHeight: '200px',
}

const titleStyle = {
  fontSize: '3rem',
  fontWeight: '800',
  marginBottom: '1rem',
  lineHeight: 1.2,
  textShadow: '2px 2px 4px rgba(0,0,0,0.35)',
}

const descStyle = {
  fontSize: '1.15rem',
  marginBottom: '2rem',
  opacity: 0.98,
  textShadow: '1px 1px 2px rgba(0,0,0,0.35)',
}

const btnRowStyle = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
}

const btnStyle = {
  fontSize: '1.05rem',
  padding: '14px 26px',
  boxShadow: '0 6px 14px rgba(0,0,0,0.2)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
}

const dotsStyle = {
  position: 'absolute',
  bottom: '1.75rem',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '0.75rem',
  zIndex: 2,
}

const dotStyle = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  border: '2px solid white',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  outline: 'none',
}

/* Optional: add responsive tweaks in globals.css if needed:
@media (max-width: 768px) {
  .container { text-align: center; }
}
*/

