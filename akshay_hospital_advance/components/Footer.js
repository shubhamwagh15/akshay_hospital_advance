import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div className="container">
        <div style={footerContentStyle}>
          <div style={footerSectionStyle}>
            <h3 style={footerTitleStyle}>🏥 Akshay Hospital</h3>
            <p style={footerDescStyle}>
              Providing exceptional healthcare services with compassion and expertise since 1985.
            </p>
            <div style={socialLinksStyle}>
              <a href="#" style={socialLinkStyle}>📘</a>
              <a href="#" style={socialLinkStyle}>🐦</a>
              <a href="#" style={socialLinkStyle}>📷</a>
              <a href="#" style={socialLinkStyle}>💼</a>
            </div>
          </div>
          
          <div style={footerSectionStyle}>
            <h4 style={footerSubTitleStyle}>Quick Links</h4>
            <ul style={footerListStyle}>
              <li><Link href="/" style={footerLinkStyle}>Home</Link></li>
              <li><Link href="/#services" style={footerLinkStyle}>Services</Link></li>
              <li><Link href="/appointment" style={footerLinkStyle}>Book Appointment</Link></li>
              <li><Link href="/dashboard" style={footerLinkStyle}>Dashboard</Link></li>
            </ul>
          </div>
          
          <div style={footerSectionStyle}>
            <h4 style={footerSubTitleStyle}>Services</h4>
            <ul style={footerListStyle}>
              <li style={footerListItemStyle}>General Medicine</li>
              <li style={footerListItemStyle}>Emergency Care</li>
              <li style={footerListItemStyle}>Specialized Care</li>
              <li style={footerListItemStyle}>Diagnostics</li>
            </ul>
          </div>
          
          <div style={footerSectionStyle}>
            <h4 style={footerSubTitleStyle}>Contact Info</h4>
            <div style={contactInfoStyle}>
              <p style={contactItemStyle}>📍 123 Healthcare Avenue, Medical City, MC 12345</p>
              <p style={contactItemStyle}>📞 +1 (555) 123-4567</p>
              <p style={contactItemStyle}>✉️ info@citygeneralhospital.com</p>
              <p style={contactItemStyle}>🕐 24/7 Emergency Services</p>
            </div>
          </div>
        </div>
        
        <div style={footerBottomStyle}>
          <div style={footerBottomContentStyle}>
            <p>&copy; 2024 Akshay Hospital. All rights reserved.</p>
            <div style={footerBottomLinksStyle}>
              <Link href="#" style={footerBottomLinkStyle}>Privacy Policy</Link>
              <Link href="#" style={footerBottomLinkStyle}>Terms of Service</Link>
              <Link href="#" style={footerBottomLinkStyle}>HIPAA Notice</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Styles
const footerStyle = {
  background: '#2c3e50',
  color: 'white',
  padding: '3rem 0 0'
}

const footerContentStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
  marginBottom: '2rem'
}

const footerSectionStyle = {
  marginBottom: '1rem'
}

const footerTitleStyle = {
  fontSize: '1.5rem',
  marginBottom: '1rem',
  color: '#3498db'
}

const footerSubTitleStyle = {
  fontSize: '1.2rem',
  marginBottom: '1rem',
  color: '#ecf0f1'
}

const footerDescStyle = {
  color: '#bdc3c7',
  lineHeight: '1.6',
  marginBottom: '1rem'
}

const footerListStyle = {
  listStyle: 'none',
  padding: 0
}

const footerListItemStyle = {
  padding: '5px 0',
  color: '#bdc3c7'
}

const footerLinkStyle = {
  color: '#bdc3c7',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  display: 'block',
  padding: '5px 0'
}

const socialLinksStyle = {
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem'
}

const socialLinkStyle = {
  fontSize: '1.5rem',
  textDecoration: 'none',
  transition: 'transform 0.3s ease'
}

const contactInfoStyle = {
  color: '#bdc3c7'
}

const contactItemStyle = {
  marginBottom: '0.5rem',
  display: 'flex',
  alignItems: 'center'
}

const footerBottomStyle = {
  borderTop: '1px solid #34495e',
  padding: '1.5rem 0',
  marginTop: '2rem'
}

const footerBottomContentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem'
}

const footerBottomLinksStyle = {
  display: 'flex',
  gap: '1.5rem'
}

const footerBottomLinkStyle = {
  color: '#bdc3c7',
  textDecoration: 'none',
  fontSize: '0.9rem'
}
