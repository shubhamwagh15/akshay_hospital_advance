'use client'
export default function HospitalImage() {
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextElementSibling.style.display = 'flex';
  }

  return (
    <div style={containerStyle}>
      <img 
        src="/hospital-building.jpg"
        alt="Akshay Hospital Building" 
        style={imageStyle}
        onError={handleImageError}
      />
      <div style={{...placeholderStyle, display: 'none'}}>
        🏥
      </div>
    </div>
  )
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative'
}

const imageStyle = {
  width: '100%',
  maxWidth: '400px',
  height: '300px',
  objectFit: 'cover',
  borderRadius: '15px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  transition: 'transform 0.3s ease'
}

const placeholderStyle = {
  fontSize: '15rem',
  color: '#007bff',
  opacity: '0.8',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '400px',
  height: '300px'
}
