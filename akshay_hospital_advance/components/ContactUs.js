// components/ContactUs.js
'use client'
import { useState } from 'react'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    setIsSubmitting(false)
  }

  return (
    <section style={sectionStyle}>
      <div className="container">
        <div style={headerStyle}>
          <h2 style={titleStyle}>📞 Contact Us</h2>
          <p style={subtitleStyle}>
            Get in touch with our healthcare team. We're here to help you 24/7.
          </p>
        </div>

        <div style={contentStyle}>
          {/* Contact Information */}
          <div style={contactInfoStyle}>
            <h3 style={infoTitleStyle}>Get In Touch</h3>
            
            <div style={contactItemStyle}>
              <div style={contactIconStyle}>📍</div>
              <div>
                <h4>Address</h4>
                <p>123 Healthcare Avenue<br />Medical District, MC 12345<br />United States</p>
              </div>
            </div>

            <div style={contactItemStyle}>
              <div style={contactIconStyle}>📞</div>
              <div>
                <h4>Phone Numbers</h4>
                <p><strong>Emergency:</strong> (555) 911-HELP</p>
                <p><strong>Appointments:</strong> (555) 123-4567</p>
                <p><strong>General Info:</strong> (555) 123-INFO</p>
              </div>
            </div>

            <div style={contactItemStyle}>
              <div style={contactIconStyle}>📧</div>
              <div>
                <h4>Email Addresses</h4>
                <p><strong>General:</strong> info@healthcareplus.com</p>
                <p><strong>Appointments:</strong> appointments@healthcareplus.com</p>
                <p><strong>Emergency:</strong> emergency@healthcareplus.com</p>
              </div>
            </div>

            <div style={contactItemStyle}>
              <div style={contactIconStyle}>🕐</div>
              <div>
                <h4>Operating Hours</h4>
                <p><strong>Emergency:</strong> 24/7</p>
                <p><strong>Appointments:</strong> Mon-Fri 8AM-8PM</p>
                <p><strong>Walk-ins:</strong> Mon-Sun 9AM-9PM</p>
              </div>
            </div>

            <div style={socialLinksStyle}>
              <h4>Follow Us</h4>
              <div style={socialIconsStyle}>
                <a href="#" style={socialLinkStyle}>📘 Facebook</a>
                <a href="#" style={socialLinkStyle}>🐦 Twitter</a>
                <a href="#" style={socialLinkStyle}>📷 Instagram</a>
                <a href="#" style={socialLinkStyle}>💼 LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={formContainerStyle}>
            <h3 style={formTitleStyle}>Send us a Message</h3>
            <form onSubmit={handleSubmit} style={formStyle}>
              <div className="grid grid-2" style={{gap: '1.5rem'}}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label>Subject *</label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select a subject</option>
                    <option value="appointment">Appointment Inquiry</option>
                    <option value="emergency">Emergency Services</option>
                    <option value="insurance">Insurance Questions</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your inquiry in detail..."
                  rows={5}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={submitBtnStyle}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : '📤 Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Emergency Banner */}
        <div style={emergencyBannerStyle}>
          <h3>🚨 Emergency Services</h3>
          <p>For medical emergencies, call <strong>(555) 911-HELP</strong> or visit our emergency department immediately.</p>
          <p>Our emergency team is available 24/7 to provide life-saving care.</p>
        </div>
      </div>
    </section>
  )
}

// Styles
const sectionStyle = {
  padding: 'clamp(3rem, 8vw, 5rem) 0',
  background: '#f8f9fa'
}

const headerStyle = {
  textAlign: 'center',
  marginBottom: 'clamp(3rem, 6vw, 4rem)'
}

const titleStyle = {
  fontSize: 'clamp(2rem, 5vw, 2.5rem)',
  color: '#333',
  marginBottom: '1rem',
  fontWeight: 'bold'
}

const subtitleStyle = {
  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
  color: '#666',
  maxWidth: '600px',
  margin: '0 auto'
}

const contentStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
  gap: 'clamp(2rem, 6vw, 4rem)',
  marginBottom: '3rem'
}

const contactInfoStyle = {
  background: 'white',
  padding: 'clamp(2rem, 5vw, 2.5rem)',
  borderRadius: '15px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
}

const infoTitleStyle = {
  fontSize: 'clamp(1.5rem, 4vw, 1.8rem)',
  color: '#333',
  marginBottom: '2rem',
  fontWeight: 'bold'
}

const contactItemStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1.5rem',
  marginBottom: '2rem',
  padding: '1rem',
  background: '#f8f9fa',
  borderRadius: '10px'
}

const contactIconStyle = {
  fontSize: '2rem',
  flexShrink: 0
}

const socialLinksStyle = {
  marginTop: '2rem',
  padding: '1.5rem',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '10px',
  color: 'white'
}

const socialIconsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  marginTop: '1rem'
}

const socialLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  background: 'rgba(255,255,255,0.2)',
  borderRadius: '5px',
  fontSize: '0.9rem',
  transition: 'background 0.3s ease'
}

const formContainerStyle = {
  background: 'white',
  padding: 'clamp(2rem, 5vw, 2.5rem)',
  borderRadius: '15px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
}

const formTitleStyle = {
  fontSize: 'clamp(1.5rem, 4vw, 1.8rem)',
  color: '#333',
  marginBottom: '2rem',
  fontWeight: 'bold'
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
}

const submitBtnStyle = {
  width: '100%',
  padding: 'clamp(12px, 3vw, 15px)',
  fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
  fontWeight: '600'
}

const emergencyBannerStyle = {
  background: 'linear-gradient(135deg, #dc3545, #c82333)',
  color: 'white',
  padding: '2rem',
  borderRadius: '15px',
  textAlign: 'center',
  boxShadow: '0 10px 30px rgba(220, 53, 69, 0.3)'
}
