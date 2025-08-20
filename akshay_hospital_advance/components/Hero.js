// components/Hero.js
'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const slides = [
    {
      image: '/hospital-1.jpg',
      title: 'Advanced Medical Care',
      subtitle: 'State-of-the-art facilities with experienced professionals'
    },
    {
      image: '/hospital-2.jpg', 
      title: '24/7 Emergency Services',
      subtitle: 'Round-the-clock emergency care when you need it most'
    },
    {
      image: '/hospital-3.jpg',
      title: 'Comprehensive Healthcare',
      subtitle: 'Complete range of medical services under one roof'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setIsVisible(true)
      }, 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index) => {
    setIsVisible(false)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsVisible(true)
    }, 300)
  }

  return (
    <section style={heroStyle}>
      <div style={heroSlideStyle}>
        <div 
          style={{
            ...heroImageStyle,
            backgroundImage: `url(${slides[currentSlide].image})`,
            opacity: isVisible ? 1 : 0.7
          }}
        />
        <div style={heroOverlayStyle}>
          <div className="container">
            <div 
              style={{
                ...heroContentStyle,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <h1 style={heroTitleStyle}>{slides[currentSlide].title}</h1>
              <p style={heroSubtitleStyle}>{slides[currentSlide].subtitle}</p>
              <div style={heroButtonsStyle}>
                <Link href="/appointment" className="btn btn-primary" style={heroBtnStyle}>
                  Book Appointment
                </Link>
                <Link href="/dashboard" className="btn" style={heroBtnSecondaryStyle}>
                  View Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={dotsContainerStyle}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              ...dotStyle,
              backgroundColor: currentSlide === index ? '#007bff' : 'rgba(255,255,255,0.5)'
            }}
          />
        ))}
      </div>
    </section>
  )
}

// Styles
const heroStyle = {
  position: 'relative',
  height: '100vh',
  overflow: 'hidden'
}

const heroSlideStyle = {
  position: 'relative',
  width: '100%',
  height: '100%'
}

const heroImageStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'opacity 0.3s ease-in-out'
}

const heroOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const heroContentStyle = {
  textAlign: 'center',
  color: 'white',
  maxWidth: '800px',
  transition: 'all 0.3s ease-in-out'
}

const heroTitleStyle = {
  fontSize: '3.5rem',
  fontWeight: 'bold',
  marginBottom: '1.5rem',
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
}

const heroSubtitleStyle = {
  fontSize: '1.3rem',
  marginBottom: '2.5rem',
  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
}

const heroButtonsStyle = {
  display: 'flex',
  gap: '1.5rem',
  justifyContent: 'center',
  flexWrap: 'wrap'
}

const heroBtnStyle = {
  fontSize: '1.1rem',
  padding: '15px 30px',
  textDecoration: 'none'
}

const heroBtnSecondaryStyle = {
  fontSize: '1.1rem',
  padding: '15px 30px',
  background: 'rgba(255,255,255,0.1)',
  color: 'white',
  border: '2px solid white',
  textDecoration: 'none'
}

const dotsContainerStyle = {
  position: 'absolute',
  bottom: '30px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '15px',
  zIndex: 10
}

const dotStyle = {
  width: '15px',
  height: '15px',
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
}
