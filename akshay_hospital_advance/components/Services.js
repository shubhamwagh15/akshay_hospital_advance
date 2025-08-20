// components/Services.js
export default function Services() {
  const services = [
    {
      icon: '🚑',
      title: 'Emergency Care',
      description: '24/7 emergency medical services with rapid response team',
      features: ['Trauma Center', 'Critical Care', 'Emergency Surgery']
    },
    {
      icon: '🔬',
      title: 'Laboratory Services',
      description: 'Comprehensive diagnostic testing with quick results',
      features: ['Blood Tests', 'Imaging', 'Pathology']
    },
    {
      icon: '💊',
      title: 'Pharmacy',
      description: 'Full-service pharmacy with prescription management',
      features: ['Medication Counseling', 'Insurance Billing', 'Home Delivery']
    },
    {
      icon: '👨‍⚕️',
      title: 'Specialist Consultations',
      description: 'Expert consultations across multiple medical specialties',
      features: ['Cardiology', 'Neurology', 'Orthopedics']
    },
    {
      icon: '🏥',
      title: 'Inpatient Care',
      description: 'Comfortable patient rooms with comprehensive care',
      features: ['Private Rooms', 'Nursing Care', 'Recovery Programs']
    },
    {
      icon: '🩺',
      title: 'Preventive Care',
      description: 'Regular health screenings and preventive medicine',
      features: ['Health Checkups', 'Vaccinations', 'Health Education']
    }
  ]

  return (
    <section style={servicesStyle}>
      <div className="container">
        <div style={servicesHeaderStyle}>
          <h2 style={servicesTitleStyle}>Our Medical Services</h2>
          <p style={servicesSubtitleStyle}>
            Comprehensive healthcare services designed to meet all your medical needs
          </p>
        </div>
        
        <div className="grid grid-3" style={servicesGridStyle}>
          {services.map((service, index) => (
            <div key={index} className="card" style={serviceCardStyle}>
              <div style={serviceIconStyle}>{service.icon}</div>
              <h3 style={serviceTitleStyle}>{service.title}</h3>
              <p style={serviceDescStyle}>{service.description}</p>
              <ul style={serviceFeaturesList}>
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} style={serviceFeatureItem}>
                    ✓ {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Styles
const servicesStyle = {
  padding: '5rem 0',
  background: '#f8f9fa'
}

const servicesHeaderStyle = {
  textAlign: 'center',
  marginBottom: '4rem'
}

const servicesTitleStyle = {
  fontSize: '2.5rem',
  color: '#2c3e50',
  marginBottom: '1rem',
  fontWeight: 'bold'
}

const servicesSubtitleStyle = {
  fontSize: '1.2rem',
  color: '#6c757d',
  maxWidth: '600px',
  margin: '0 auto'
}

const servicesGridStyle = {
  gap: '2rem'
}

const serviceCardStyle = {
  textAlign: 'center',
  padding: '2.5rem',
  height: '100%',
  border: '2px solid transparent',
  transition: 'all 0.3s ease'
}

const serviceIconStyle = {
  fontSize: '3rem',
  marginBottom: '1.5rem'
}

const serviceTitleStyle = {
  fontSize: '1.5rem',
  color: '#2c3e50',
  marginBottom: '1rem',
  fontWeight: 'bold'
}

const serviceDescStyle = {
  color: '#6c757d',
  marginBottom: '1.5rem',
  lineHeight: '1.6'
}

const serviceFeaturesList = {
  listStyle: 'none',
  padding: 0,
  margin: 0
}

const serviceFeatureItem = {
  color: '#28a745',
  marginBottom: '0.5rem',
  fontWeight: '500'
}
