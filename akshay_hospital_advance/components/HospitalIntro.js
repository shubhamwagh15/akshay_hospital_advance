'use client'
// components/HospitalIntro.js
export default function HospitalIntro() {
  return (
    <section style={hospitalIntroStyle}>
      <div className="container">
        <div style={hospitalIntroContentStyle}>
          <div style={hospitalTextSectionStyle}>
            <h2 style={hospitalTitleStyle}>Welcome to HealthCare Plus</h2>
            <p style={hospitalDescStyle}>
              With over 25 years of excellence in healthcare, HealthCare Plus has been serving 
              the community with compassionate care and cutting-edge medical technology. Our 
              commitment to patient-centered care and medical innovation makes us the trusted 
              choice for families across the region.
            </p>
            <div style={hospitalStatsStyle}>
              <div style={statItemStyle}>
                <h3 style={statNumberStyle}>50K+</h3>
                <p style={statLabelStyle}>Patients Served</p>
              </div>
              <div style={statItemStyle}>
                <h3 style={statNumberStyle}>25+</h3>
                <p style={statLabelStyle}>Years Experience</p>
              </div>
              <div style={statItemStyle}>
                <h3 style={statNumberStyle}>100+</h3>
                <p style={statLabelStyle}>Medical Specialists</p>
              </div>
            </div>
            <div style={hospitalFeaturesStyle}>
              <div style={featureStyle}>✓ 24/7 Emergency Care</div>
              <div style={featureStyle}>✓ Advanced Diagnostics</div>
              <div style={featureStyle}>✓ Specialized Treatments</div>
              <div style={featureStyle}>✓ Insurance Accepted</div>
            </div>
          </div>
          <div style={hospitalImageSectionStyle}>
            <div 
              style={hospitalImageStyle}
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div style={hospitalPlaceholderStyle}>
              🏥 Modern Healthcare Facility
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Styles
const hospitalIntroStyle = {
  padding: '5rem 0',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
}

const hospitalIntroContentStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '4rem',
  alignItems: 'center',
  minHeight: '500px'
}

const hospitalTextSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}

const hospitalTitleStyle = {
  fontSize: '2.8rem',
  color: '#2c3e50',
  marginBottom: '1.5rem',
  fontWeight: 'bold'
}

const hospitalDescStyle = {
  fontSize: '1.1rem',
  lineHeight: '1.8',
  color: '#495057',
  marginBottom: '2rem'
}

const hospitalStatsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2rem',
  marginBottom: '2rem'
}

const statItemStyle = {
  textAlign: 'center'
}

const statNumberStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#007bff',
  marginBottom: '0.5rem'
}

const statLabelStyle = {
  color: '#6c757d',
  fontSize: '0.9rem'
}

const hospitalFeaturesStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '0.8rem'
}

const featureStyle = {
  color: '#28a745',
  fontWeight: '500',
  fontSize: '1rem'
}

const hospitalImageSectionStyle = {
  position: 'relative',
  height: '500px',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
}

const hospitalImageStyle = {
  width: '100%',
  height: '100%',
  backgroundImage: 'url(/hospital-building.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}

const hospitalPlaceholderStyle = {
  display: 'none',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  fontSize: '1.5rem',
  fontWeight: 'bold'
}
