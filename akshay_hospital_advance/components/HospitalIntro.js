'use client'

export default function HospitalIntro() {
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const placeholder = e.target.nextElementSibling;
    if (placeholder) {
      placeholder.style.display = 'flex';
    }
  }

  return (
    <section style={hospitalIntroStyle}>
      <div className="container">
        <div style={hospitalIntroContentStyle}>
          <div style={hospitalImageContainerStyle}>
            <img
              src="/hospital-building.jpg"
              alt="Akshay Hospital Building"
              style={hospitalImageStyle}
              onError={handleImageError}
            />
            <div style={hospitalImagePlaceholderStyle}>
              <div style={hospitalImageContentStyle}>
                <div style={hospitalIconStyle}>🏥</div>
                <h3 style={imageLabelStyle}>Modern Hospital Facility</h3>
                <p style={imageSubLabelStyle}>State-of-the-art medical center</p>
              </div>
            </div>
          </div>
          <div style={hospitalTextStyle}>
            <h2 style={hospitalTitleStyle}>Welcome To Akshay Hospital</h2>
            <p style={hospitalDescStyle}>
              Established in 1985, Akshay Hospital has been a cornerstone of healthcare excellence in our community. We provide world-class medical care with advanced technology and 24/7 emergency services.
            </p>
            <div style={hospitalStatsStyle}>
              <div style={statItemStyle}>
                <h3 style={statNumberStyle}>12+</h3>
                <p style={statLabelStyle}>Years</p>
              </div>
              <div style={statItemStyle}>
                <h3 style={statNumberStyle}>500+</h3>
                <p style={statLabelStyle}>Beds</p>
              </div>
              <div style={statItemStyle}>
                <h3 style={statNumberStyle}>50K+</h3>
                <p style={statLabelStyle}>Patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Updated styles with expanded width and minimal gap
const hospitalIntroStyle = {
  padding: '3rem 0',
  background: 'linear-gradient(135deg, #f8fbff 0%, #e3f2fd 50%, #f0f8ff 100%)',
  height: '500px',
  display: 'flex',
  alignItems: 'center'
}

const hospitalIntroContentStyle = {
  display: 'grid',
  gridTemplateColumns: '55% 45%', // Expanded: 55% for image, 45% for text
  gap: '1.5rem', // Reduced gap from 3rem to 1.5rem
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',
  height: '400px'
}

const hospitalImageContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  height: '100%',
  width: '100%' // Full width utilization
}

const hospitalImageStyle = {
  width: '100%', // Full container width
  height: '400px',
  maxWidth: 'unset', // Removed maxWidth constraint
  objectFit: 'cover',
  borderRadius: '15px',
  boxShadow: '0 15px 35px rgba(0,123,255,0.15)',
  transition: 'transform 0.3s ease'
}

const hospitalImagePlaceholderStyle = {
  position: 'absolute',
  top: 0,
  left: 0, // Changed from 50% to 0 for full width
  transform: 'none', // Removed translateX
  width: '100%',
  height: '400px',
  background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
  borderRadius: '15px',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 15px 35px rgba(0,123,255,0.25)'
}

const hospitalImageContentStyle = {
  textAlign: 'center',
  color: 'white',
  padding: '2rem'
}

const hospitalIconStyle = {
  fontSize: '3rem',
  marginBottom: '1rem'
}

const imageLabelStyle = {
  fontSize: '1.4rem',
  fontWeight: 'bold',
  margin: '0 0 0.5rem 0',
  color: 'white'
}

const imageSubLabelStyle = {
  fontSize: '0.9rem',
  opacity: 0.9,
  margin: 0,
  color: 'white'
}

const hospitalTextStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  padding: '2rem',
  background: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '15px',
  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
  width: '100%' // Full width utilization
}

const hospitalTitleStyle = {
  fontSize: '2.2rem',
  color: '#1a365d',
  marginBottom: '1rem',
  fontWeight: '700',
  lineHeight: '1.2',
  background: 'linear-gradient(135deg, #007bff, #0056b3)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}

const hospitalDescStyle = {
  fontSize: '1rem',
  color: '#4a5568',
  lineHeight: '1.6',
  marginBottom: '1.5rem',
  textAlign: 'left'
}

const hospitalStatsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem'
}

const statItemStyle = {
  textAlign: 'center',
  padding: '1rem 0.5rem',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  borderRadius: '10px',
  border: '2px solid #e9ecef',
  transition: 'all 0.3s ease'
}

const statNumberStyle = {
  fontSize: '1.8rem',
  background: 'linear-gradient(135deg, #007bff, #0056b3)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  margin: '0 0 0.3rem 0'
}

const statLabelStyle = {
  color: '#6c757d',
  fontSize: '0.8rem',
  margin: 0,
  fontWeight: '500',
  textTransform: 'uppercase'
}
