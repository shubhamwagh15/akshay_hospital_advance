'use client'
import Link from 'next/link'

export default function DoctorIntro() {
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const placeholder = e.target.nextElementSibling;
    if (placeholder) {
      placeholder.style.display = 'flex';
    }
  }

  return (
    <section style={doctorsIntroStyle}>
      <div className="container">
        <div style={doctorsIntroContentStyle}>
          <div style={doctorsTextStyle}>
            <h2 style={doctorsTitleStyle}>Meet Our Expert Medical Team</h2>
            <p style={doctorsDescStyle}>
              Our hospital is proud to have a team of highly qualified and experienced doctors who are dedicated to providing exceptional patient care. Our medical professionals are board-certified specialists with years of expertise in their respective fields. All our doctors are certified by recognized medical boards and maintain continuing education requirements, ensuring they stay current with the latest medical advances and best practices. Our medical team has received numerous awards for excellence in patient care and medical innovation, and we believe in treating each patient with compassion, respect, and personalized attention. From emergency care to specialized treatments, our doctors work collaboratively to ensure comprehensive healthcare delivery that meets the unique needs of every patient who walks through our doors.
            </p>
            <Link href="/appointment" className="btn btn-primary" style={doctorsButtonStyle}>
              Meet Our Doctors
            </Link>
          </div>
          <div style={doctorsImageContainerStyle}>
            <img
              src="/professional-doctor.png"
              alt="Professional Doctor Portrait"
              style={doctorsImageStyle}
              onError={handleImageError}
            />
            <div style={doctorsImagePlaceholderStyle}>
              <div style={doctorsImageContentStyle}>
                <div style={doctorIconStyle}>👨‍⚕️</div>
                <h3 style={imageLabelStyle}>Expert Medical Team</h3>
                <p style={imageSubLabelStyle}>Board-certified professionals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Styles
const doctorsIntroStyle = {
  padding: '5rem 0',
  background: '#f8f9fa'
}

const doctorsIntroContentStyle = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '4rem',
  alignItems: 'stretch',
  minHeight: '450px'
}

const doctorsTextStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '1rem 0'
}

const doctorsTitleStyle = {
  fontSize: '2.5rem',
  color: '#333',
  marginBottom: '2rem',
  fontWeight: 'bold'
}

const doctorsDescStyle = {
  fontSize: '1.1rem',
  color: '#666',
  lineHeight: '1.8',
  marginBottom: '2.5rem',
  textAlign: 'justify'
}

const doctorsButtonStyle = {
  fontSize: '1.1rem',
  padding: '15px 30px',
  alignSelf: 'flex-start',
  textDecoration: 'none'
}

const doctorsImageContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative'
}

const doctorsImageStyle = {
  width: '100%',
  height: '100%',
  minHeight: '450px',
  maxWidth: '350px',
  objectFit: 'cover',
  borderRadius: '15px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  transition: 'transform 0.3s ease'
}

const doctorsImagePlaceholderStyle = {
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  height: '100%',
  minHeight: '450px',
  maxWidth: '350px',
  background: 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)',
  borderRadius: '15px',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 8px 20px rgba(40,167,69,0.3)',
  transition: 'transform 0.3s ease'
}

const doctorsImageContentStyle = {
  textAlign: 'center',
  color: 'white'
}

const doctorIconStyle = {
  fontSize: '4rem',
  marginBottom: '1rem'
}

const imageLabelStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: '0 0 0.5rem 0',
  color: 'white'
}

const imageSubLabelStyle = {
  fontSize: '1rem',
  opacity: 0.9,
  margin: 0,
  color: 'white'
}
