// components/DoctorIntro.js
'use client'
import { useState } from 'react'

export default function DoctorIntro() {
  return (
    <section style={sectionStyle}>
      <div className="container">
        <div style={contentStyle}>
          <div style={imageContainerStyle}>
            <ImageWithFallback 
              src="/professional-doctor.png"
              alt="Expert Medical Team"
            />
          </div>
          
          <div style={textContentStyle}>
            <h2 style={titleStyle}>Meet Our Expert Medical Team</h2>
            <p style={descStyle}>
              Our team of highly qualified doctors and medical professionals bring decades of combined 
              experience in their respective specialties. Each member of our team is committed to providing 
              personalized, compassionate care while staying current with the latest medical advances and 
              treatment protocols.
            </p>
            
            <div style={credentialsStyle}>
              <div style={credentialItemStyle}>
                <div style={credentialIconStyle}>🏆</div>
                <div>
                  <strong>Board Certified:</strong> All our doctors are board-certified in their specialties
                </div>
              </div>
              <div style={credentialItemStyle}>
                <div style={credentialIconStyle}>📚</div>
                <div>
                  <strong>Continuing Education:</strong> Regular training on latest medical procedures
                </div>
              </div>
              <div style={credentialItemStyle}>
                <div style={credentialIconStyle}>❤️</div>
                <div>
                  <strong>Patient-Centered:</strong> Focused on individualized treatment plans
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ImageWithFallback({ src, alt }) {
  const [hasError, setHasError] = useState(false)
  
  if (hasError) {
    return (
      <div style={imagePlaceholderStyle}>
        👨‍⚕️ Expert Medical Team
      </div>
    )
  }
  
  return (
    <img
      src={src}
      alt={alt}
      style={imageStyle}
      onError={() => setHasError(true)}
    />
  )
}

// Responsive Styles
const sectionStyle = {
  padding: 'clamp(3rem, 8vw, 5rem) 0',
  background: '#f8f9fa'
}

const contentStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
  gap: 'clamp(2rem, 6vw, 4rem)',
  alignItems: 'center'
}

const imageContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  order: 1
}

const imageStyle = {
  width: '100%',
  maxWidth: '400px',
  height: 'auto',
  borderRadius: '15px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
}

const imagePlaceholderStyle = {
  background: 'white',
  border: '2px dashed #adb5bd',
  borderRadius: '15px',
  padding: 'clamp(2rem, 5vw, 3rem)',
  textAlign: 'center',
  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
  color: '#6c757d',
  width: '100%',
  maxWidth: '400px',
  minHeight: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
}

const textContentStyle = {
  order: 2
}

const titleStyle = {
  fontSize: 'clamp(2rem, 5vw, 2.5rem)',
  color: '#333',
  marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
  fontWeight: 'bold',
  lineHeight: 1.2
}

const descStyle = {
  fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
  lineHeight: 1.8,
  color: '#666',
  marginBottom: 'clamp(1.5rem, 4vw, 2rem)'
}

const credentialsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(1rem, 3vw, 1.5rem)'
}

const credentialItemStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 'clamp(0.8rem, 2vw, 1rem)',
  padding: 'clamp(1rem, 2.5vw, 1.2rem)',
  background: 'white',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  color: '#555',
  fontSize: 'clamp(0.9rem, 2vw, 0.95rem)',
  lineHeight: 1.6,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
}

const credentialIconStyle = {
  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
  flexShrink: 0,
  marginTop: '2px'
}

// Responsive Media Queries (Additional CSS-in-JS breakpoints)
const mobileStyles = {
  '@media (max-width: 768px)': {
    contentStyle: {
      gridTemplateColumns: '1fr',
      textAlign: 'center'
    },
    imageContainerStyle: {
      order: 1,
      marginBottom: '1rem'
    },
    textContentStyle: {
      order: 2
    }
  }
}

// Export with media query support for CSS-in-JS libraries if needed
export const responsiveStyles = `
  @media (max-width: 768px) {
    .doctor-intro-content {
      grid-template-columns: 1fr !important;
      text-align: center;
      gap: 2rem;
    }
    
    .doctor-intro-image {
      order: 1;
      margin-bottom: 1rem;
    }
    
    .doctor-intro-text {
      order: 2;
    }
    
    .credential-item {
      flex-direction: column;
      text-align: center;
      align-items: center;
    }
  }
  
  @media (max-width: 480px) {
    .doctor-intro-content {
      gap: 1.5rem;
    }
    
    .credential-item {
      padding: 0.8rem;
    }
  }
`
