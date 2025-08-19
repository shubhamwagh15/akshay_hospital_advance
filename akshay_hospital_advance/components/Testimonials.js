'use client'
import { useState, useEffect } from 'react'

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Downtown Medical District",
      rating: 5,
      text: "Outstanding care and professionalism! The medical team at City General Hospital provided exceptional treatment during my stay. The facilities are modern and the staff is incredibly compassionate.",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Riverside Community",
      rating: 5,
      text: "I had emergency surgery here last month and couldn't be more grateful. The doctors and nurses were amazing, explaining everything clearly and making sure I was comfortable throughout my recovery.",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "West Side Neighborhood",
      rating: 5,
      text: "Best hospital experience I've ever had. From the moment I walked in, the staff was welcoming and efficient. Dr. Davis and her team provided excellent cardiac care that saved my life.",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "Robert Wilson",
      location: "East Bay Area",
      rating: 5,
      text: "Clean, modern facility with top-notch medical equipment. The orthopedic department here is fantastic - my knee replacement surgery went perfectly and the physical therapy team was excellent.",
      date: "1 month ago"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      location: "Central City",
      rating: 5,
      text: "City General Hospital delivered our baby and the experience was wonderful. The maternity ward is beautiful and the nursing staff made us feel so supported during this special time.",
      date: "2 months ago"
    },
    {
      id: 6,
      name: "David Thompson",
      location: "North Hills",
      rating: 5,
      text: "Excellent diagnostic services and very thorough doctors. They caught my condition early and provided a treatment plan that worked perfectly. Highly recommend this hospital to anyone.",
      date: "1 month ago"
    }
  ]

  // Auto-advance testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{
        ...starStyle,
        color: i < rating ? '#ffc107' : '#e4e5e9'
      }}>
        ★
      </span>
    ))
  }

  return (
    <section style={testimonialsStyle}>
      <div className="container">
        <div style={headerStyle}>
          <h2 style={titleStyle}>What Our Patients Say</h2>
          <p style={subtitleStyle}>
            Real experiences from our valued patients and their families
          </p>
        </div>

        <div style={testimonialContainerStyle}>
          <div style={testimonialSliderStyle}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                style={{
                  ...testimonialCardStyle,
                  display: currentTestimonial === index ? 'block' : 'none'
                }}
              >
                <div style={cardHeaderStyle}>
                  <div style={googleMapsLogoStyle}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#4285F4"/>
                    </svg>
                    <span style={googleTextStyle}>Google</span>
                  </div>
                  <div style={ratingStyle}>
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <p style={testimonialTextStyle}>"{testimonial.text}"</p>
                
                <div style={authorInfoStyle}>
                  <div style={authorDetailsStyle}>
                    <h4 style={authorNameStyle}>{testimonial.name}</h4>
                    <p style={locationStyle}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={locationIconStyle}>
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#666"/>
                      </svg>
                      {testimonial.location}
                    </p>
                  </div>
                  <span style={dateStyle}>{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div style={dotsContainerStyle}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              style={{
                ...dotStyle,
                backgroundColor: currentTestimonial === index ? '#007bff' : '#e4e5e9'
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Styles
const testimonialsStyle = {
  padding: '5rem 0',
  background: '#f8f9fa'
}

const headerStyle = {
  textAlign: 'center',
  marginBottom: '3rem'
}

const titleStyle = {
  fontSize: '2.5rem',
  color: '#333',
  marginBottom: '1rem',
  fontWeight: 'bold'
}

const subtitleStyle = {
  fontSize: '1.2rem',
  color: '#666',
  maxWidth: '600px',
  margin: '0 auto'
}

const testimonialContainerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  position: 'relative'
}

const testimonialSliderStyle = {
  position: 'relative',
  minHeight: '300px'
}

const testimonialCardStyle = {
  background: 'white',
  borderRadius: '15px',
  padding: '2.5rem',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  border: '1px solid #e9ecef',
  transition: 'all 0.3s ease'
}

const cardHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem'
}

const googleMapsLogoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
}

const googleTextStyle = {
  fontSize: '1rem',
  fontWeight: '500',
  color: '#4285F4'
}

const ratingStyle = {
  display: 'flex',
  gap: '2px'
}

const starStyle = {
  fontSize: '1.2rem'
}

const testimonialTextStyle = {
  fontSize: '1.1rem',
  lineHeight: '1.6',
  color: '#333',
  marginBottom: '1.5rem',
  fontStyle: 'italic'
}

const authorInfoStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end'
}

const authorDetailsStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const authorNameStyle = {
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '#333',
  margin: '0 0 0.3rem 0'
}

const locationStyle = {
  fontSize: '0.9rem',
  color: '#666',
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem',
  margin: 0
}

const locationIconStyle = {
  marginTop: '1px'
}

const dateStyle = {
  fontSize: '0.85rem',
  color: '#999',
  fontWeight: '400'
}

const dotsContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '0.8rem',
  marginTop: '2rem'
}

const dotStyle = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  outline: 'none'
}
