// components/Footer.js
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div className="container">
        <div style={footerContentStyle}>
          <div style={footerSectionStyle}>
            <h3 style={footerTitleStyle}>🏥 HealthCare Plus</h3>
            <p style={footerDescStyle}>
              Providing excellent healthcare services with compassion, 
              innovation, and dedication to patient well-being.
            </p>
            <div style={socialLinksStyle}>
              <a href="#" style={socialLinkStyle}>📘</a>
              <a href="#" style={socialLinkStyle}>🐦</a>
              <a href="#" style={socialLinkStyle}>📸</a>
              <a href="#" style={socialLinkStyle}>💼</a>
            </div>
          </div>

          <div style={footerSectionStyle}>
            <h4 style={footerSectionTitleStyle}>Quick Links</h4>
            <ul style={footerListStyle}>
              <li><Link href="/" style={footerLinkStyle}>Home</Link></li>
              <li><Link href="/appointment" style={footerLinkStyle}>Book Appointment</Link></li>
              <li><Link href="/dashboard" style={footerLinkStyle}>Dashboard</Link></li>
              <li><a href="#" style={footerLinkStyle}>About Us</a></li>
            </ul>
          </div>

          <div style={footerSectionStyle}>
            <h4 style={footerSectionTitleStyle}>Services</h4>
            <ul style={footerListStyle}>
              <li><a href="#" style={footerLinkStyle}>Emergency Care</a></li>
              <li><a href="#" style={footerLinkStyle}>Laboratory Services</a></li>
              <li><a href="#" style={footerLinkStyle}>Pharmacy</a></li>
              <li><a href="#" style={footerLinkStyle}>Specialist Consultations</a></li>
            </ul>
          </div>

          <div style={footerSectionStyle}>
            <h4 style={footerSectionTitleStyle}>Contact Info</h4>
            <div style={contactInfoStyle}>
              <p style={contactItemStyle}>📍 123 Healthcare Ave, Medical District</p>
              <p style={contactItemStyle}>📞 (555) 123-4567</p>
              <p style={contactItemStyle}>✉️ info@healthcareplus.com</p>
              <p style={contactItemStyle}>🕒 24/7 Emergency Services</p>
            </div>
          </div>
        </div>

        <div style={footerBottomStyle}>
          <p style={copyrightStyle}>
            © 2025 HealthCare Plus. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}

// Styles
const footerStyle = {
  background: '#2c3e50',
  color: 'white',
  padding: '3rem 0 1rem 0'
}

const footerContentStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
  marginBottom: '2rem'
}

const footerSectionStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const footerTitleStyle = {
  fontSize: '1.5rem',
  marginBottom: '1rem',
  color: '#3498db'
}

const footerSectionTitleStyle = {
  fontSize: '1.2rem',
  marginBottom: '1rem',
  color: '#3498db'
}

const footerDescStyle = {
  color: '#bdc3c7',
  lineHeight: '1.6',
  marginBottom: '1rem'
}

const socialLinksStyle = {
  display: 'flex',
  gap: '1rem'
}

const socialLinkStyle = {
  fontSize: '1.5rem',
  textDecoration: 'none',
  transition: 'transform 0.3s ease'
}

const footerListStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

const footerLinkStyle = {
  color: '#bdc3c7',
  textDecoration: 'none',
  display: 'block',
  padding: '0.3rem 0',
  transition: 'color 0.3s ease'
}

const contactInfoStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
}

const contactItemStyle = {
  color: '#bdc3c7',
  margin: 0
}

const footerBottomStyle = {
  borderTop: '1px solid #34495e',
  paddingTop: '1rem',
  textAlign: 'center'
}

const copyrightStyle = {
  color: '#95a5a6',
  fontSize: '0.9rem',
  margin: 0
}
