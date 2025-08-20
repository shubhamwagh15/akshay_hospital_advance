// components/Navbar.js
'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      
      // Close mobile menu when switching to desktop
      if (!mobile) {
        setIsMenuOpen(false)
      }
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar-container')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [isMenuOpen])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    closeMenu()
  }

  return (
    <>
      <nav style={navStyle}>
        <div className="container navbar-container" style={navContainerStyle}>
          {/* Logo */}
          <Link href="/" style={logoStyle} onClick={closeMenu}>
            🏥 HealthCare Plus
          </Link>
          
          {/* Hamburger Menu Button */}
          <button 
            onClick={toggleMenu}
            className="hamburger-btn"
            style={hamburgerBtnStyle}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <div 
              className={`hamburger-line ${isMenuOpen ? 'active' : ''}`} 
              style={hamburgerLineStyle}
            />
            <div 
              className={`hamburger-line ${isMenuOpen ? 'active' : ''}`} 
              style={hamburgerLineStyle}
            />
            <div 
              className={`hamburger-line ${isMenuOpen ? 'active' : ''}`} 
              style={hamburgerLineStyle}
            />
          </button>

          {/* Navigation Menu */}
          <ul 
            className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`} 
            style={{
              ...navMenuStyle,
              ...(isMobile && isMenuOpen ? navMenuMobileOpenStyle : {}),
              ...(isMobile && !isMenuOpen ? navMenuMobileClosedStyle : {})
            }}
          >
            <li style={navItemStyle}>
              <Link href="/" style={navLinkStyle} onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li style={navItemStyle}>
              <button 
                onClick={() => scrollToSection('services')} 
                style={navLinkBtnStyle}
              >
                Services
              </button>
            </li>
            <li style={navItemStyle}>
              <button 
                onClick={() => scrollToSection('about')} 
                style={navLinkBtnStyle}
              >
                About
              </button>
            </li>
            <li style={navItemStyle}>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                style={navLinkBtnStyle}
              >
                Reviews
              </button>
            </li>
            <li style={navItemStyle}>
              <Link href="/appointment" style={navLinkStyle} onClick={closeMenu}>
                Appointment
              </Link>
            </li>
            <li style={navItemStyle}>
              <button 
                onClick={() => scrollToSection('contact')} 
                style={navLinkBtnStyle}
              >
                Contact
              </button>
            </li>
            <li style={navItemStyle}>
              <Link href="/dashboard" style={navLinkSpecialStyle} onClick={closeMenu}>
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobile && isMenuOpen && (
          <div 
            style={overlayStyle}
            onClick={closeMenu}
          />
        )}
      </nav>
    </>
  )
}

// Compact Responsive Styles with Standard Height
const navStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  padding: '0.75rem 0', // Fixed standard padding
  boxShadow: '0 2px 15px rgba(102, 126, 234, 0.25)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)',
  minHeight: '64px', // Standard navbar height
  maxHeight: '64px'
}

const navContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  height: '48px' // Fixed container height
}

const logoStyle = {
  fontSize: '1.25rem', // Fixed logo size
  fontWeight: 'bold',
  color: 'white',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  lineHeight: '1'
}

const hamburgerBtnStyle = {
  display: 'none',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0.5rem',
  zIndex: 1001,
  transition: 'transform 0.3s ease',
  width: '40px',
  height: '40px'
}

const hamburgerLineStyle = {
  width: '20px', // Smaller hamburger lines
  height: '2px',
  backgroundColor: 'white',
  margin: '2px 0',
  transition: 'all 0.3s ease',
  borderRadius: '1px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
}

const navMenuStyle = {
  display: 'flex',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  alignItems: 'center',
  gap: '0.5rem', // Reduced gap for compact design
  transition: 'all 0.3s ease'
}

const navMenuMobileOpenStyle = {
  position: 'fixed',
  top: '64px', // Match navbar height
  left: 0,
  width: '100%',
  height: 'calc(100vh - 64px)',
  background: 'linear-gradient(180deg, rgba(102, 126, 234, 0.98) 0%, rgba(118, 75, 162, 0.98) 50%, rgba(240, 147, 251, 0.98) 100%)',
  backdropFilter: 'blur(15px)',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem 1rem',
  gap: '1.5rem', // Reduced gap
  zIndex: 999,
  opacity: 1,
  visibility: 'visible',
  transform: 'translateX(0)',
  boxShadow: '0 4px 30px rgba(0,0,0,0.3)'
}

const navMenuMobileClosedStyle = {
  position: 'fixed',
  top: '64px',
  left: 0,
  width: '100%',
  height: 'calc(100vh - 64px)',
  background: 'linear-gradient(180deg, rgba(102, 126, 234, 0.98) 0%, rgba(118, 75, 162, 0.98) 50%, rgba(240, 147, 251, 0.98) 100%)',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem 1rem',
  gap: '1.5rem',
  zIndex: 999,
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateX(-100%)',
  transition: 'all 0.3s ease'
}

const navItemStyle = {
  margin: 0
}

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '0.9rem', // Fixed compact font size
  padding: '0.5rem 0.8rem', // Reduced padding
  borderRadius: '6px',
  transition: 'all 0.3s ease',
  display: 'block',
  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  border: '1px solid transparent',
  whiteSpace: 'nowrap'
}

const navLinkBtnStyle = {
  color: 'white',
  background: 'none',
  border: '1px solid transparent',
  fontWeight: '500',
  fontSize: '0.9rem', // Fixed compact font size
  padding: '0.5rem 0.8rem', // Reduced padding
  borderRadius: '6px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  fontFamily: 'inherit',
  whiteSpace: 'nowrap'
}

const navLinkSpecialStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '0.9rem', // Fixed compact font size
  padding: '0.5rem 0.8rem', // Reduced padding
  borderRadius: '6px',
  transition: 'all 0.3s ease',
  display: 'block',
  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.4)',
  background: 'rgba(255,255,255,0.15)',
  whiteSpace: 'nowrap'
}

const overlayStyle = {
  position: 'fixed',
  top: '64px', // Match navbar height
  left: 0,
  width: '100%',
  height: 'calc(100vh - 64px)',
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 998
}
