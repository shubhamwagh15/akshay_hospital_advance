export default function Services() {
  return (
    <section id="services" style={servicesStyle}>
      <div className="container">
        <h2 style={sectionTitleStyle}>Our Medical Services</h2>
        <p style={sectionDescStyle}>
          Comprehensive healthcare services delivered by our team of experienced professionals
        </p>
        
        <div className="grid grid-3" style={{marginTop: '3rem'}}>
          {services.map((service, index) => (
            <div key={index} className="card" style={serviceCardStyle}>
              <div style={serviceIconStyle}>
                {service.icon}
              </div>
              <h3 style={serviceTitleStyle}>{service.title}</h3>
              <p style={serviceDescStyle}>{service.description}</p>
              <ul style={serviceListStyle}>
                {service.features.map((feature, idx) => (
                  <li key={idx} style={serviceItemStyle}>✓ {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const services = [
  {
    icon: '🩺',
    title: 'General Medicine',
    description: 'Comprehensive primary healthcare for all ages',
    features: ['Health checkups', 'Preventive care', 'Chronic disease management', 'Vaccinations']
  },
  {
    icon: '🏥',
    title: 'Emergency Care',
    description: '24/7 emergency medical services',
    features: ['Trauma care', 'Critical care']
  },
  {
    icon: '🔬',
    title: 'Diagnostics',
    description: 'Advanced diagnostic and imaging services',
    features: ['Laboratory tests']
  },
  {
    icon: '💊',
    title: 'Pharmacy',
    description: 'In-house pharmacy with quality medications',
    features: ['Prescription drugs', 'Over-the-counter medications', 'Medical supplies']
  }
]

// Styles

const servicesStyle = {
  padding: '5rem 0',
  background: 'white'
}

const sectionTitleStyle = {
  fontSize: '2.5rem',
  textAlign: 'center',
  marginBottom: '1rem',
  color: '#333'
}

const sectionDescStyle = {
  fontSize: '1.2rem',
  textAlign: 'center',
  color: '#666',
  maxWidth: '600px',
  margin: '0 auto'
}

const serviceCardStyle = {
  textAlign: 'center',
  height: '100%'
}

const serviceIconStyle = {
  fontSize: '3rem',
  marginBottom: '1rem'
}

const serviceDescStyle = {
  color: '#666',
  marginBottom: '1.5rem'
}

const serviceListStyle = {
  listStyle: 'none',
  padding: 0,
  textAlign: 'left'
}

const serviceItemStyle = {
  padding: '5px 0',
  color: '#28a745'
}

const serviceTitleStyle = {
  fontSize: '1.5rem',
  marginBottom: '1rem',
  color: '#333'
}
