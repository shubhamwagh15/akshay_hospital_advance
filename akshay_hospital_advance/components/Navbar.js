'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Top Contact Bar */}
      <div style={topBarStyle}>
        <div className="container" style={topBarContainerStyle}>
          <div style={contactInfoStyle}>
            <span style={contactItemStyle}>
              📞 Emergency: +1 (555) 123-4567
            </span>
          </div>
          <div style={contactInfoStyle}>
            <span style={contactItemStyle}>
              ✉️ info@citygeneralhospital.com
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav style={navStyle}>
        <div className="container" style={containerStyle}>
          <Link href="/" style={logoStyle}>
            <h2>🏥 Akshay Hospital</h2>
          </Link>
          
          <div style={menuToggleStyle} onClick={() => setIsOpen(!isOpen)}>
            <span style={{...hamburgerStyle, transform: isOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'none'}}></span>
            <span style={{...hamburgerStyle, opacity: isOpen ? '0' : '1'}}></span>
            <span style={{...hamburgerStyle, transform: isOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'none'}}></span>
          </div>
          
          <ul style={{...menuStyle, display: isOpen ? 'flex' : 'none'}} className="nav-menu">
            <li><Link href="/" style={linkStyle} onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link href="/#services" style={linkStyle} onClick={() => setIsOpen(false)}>Services</Link></li>
            <li><Link href="/appointment" style={linkStyle} onClick={() => setIsOpen(false)}>Book Appointment</Link></li>
            <li><Link href="/dashboard" style={linkStyle} onClick={() => setIsOpen(false)}>Dashboard</Link></li>
            <li><Link href="/#contact" style={linkStyle} onClick={() => setIsOpen(false)}>Contact</Link></li>
          </ul>
        </div>
      </nav>

      <style jsx global>{`
        @media (min-width: 769px) {
          .nav-menu {
            display: flex !important;
          }
        }
        
        @media (max-width: 768px) {
          .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            flex-direction: column;
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 20px 0;
            z-index: 1000;
          }
          
          .nav-menu li {
            margin: 10px 0;
            text-align: center;
          }

          .top-bar {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .top-bar-container {
            flex-direction: column;
            gap: 5px;
            text-align: center;
          }
        }
      `}</style>
    </>
  )
}

// Styles
const topBarStyle = {
  background: '#2c3e50',
  color: 'white',
  padding: '8px 0',
  fontSize: '0.9rem'
}

const topBarContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap'
}

const contactInfoStyle = {
  display: 'flex',
  alignItems: 'center'
}

const contactItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  color: '#ecf0f1'
}

const navStyle = {
  background: 'white',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  padding: '1rem 0'
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative'
}

const logoStyle = {
  textDecoration: 'none',
  color: '#007bff',
  fontWeight: 'bold'
}

const menuStyle = {
  listStyle: 'none',
  gap: '2rem',
  alignItems: 'center',
  margin: 0,
  padding: 0
}

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: '500',
  transition: 'color 0.3s ease',
  position: 'relative'
}

const menuToggleStyle = {
  display: 'none',
  flexDirection: 'column',
  cursor: 'pointer',
  padding: '5px',
  '@media (max-width: 768px)': {
    display: 'flex'
  }
}

const hamburgerStyle = {
  width: '25px',
  height: '3px',
  background: '#333',
  margin: '3px 0',
  transition: '0.3s',
  transformOrigin: 'center'
}
