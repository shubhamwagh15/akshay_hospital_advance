'use client'
import { useState, useEffect } from 'react'

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    doctor: '',
    reason: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableDoctors, setAvailableDoctors] = useState([])
  const [loading, setLoading] = useState(false)

  const doctors = [
    'Dr. Sarah Johnson',
    'Dr. Michael Chen',
    'Dr. Emily Davis',
    'Dr. Robert Wilson',
    'Dr. Lisa Anderson'
  ]

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ]

  useEffect(() => {
    if (formData.date) {
      checkDoctorAvailability()
    }
  }, [formData.date])

  const checkDoctorAvailability = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/availability?date=${formData.date}`)
      const data = await response.json()
      
      const availableDoctorsList = (data.availability || [])
        .filter(slot => slot.is_available)
        .map(slot => slot.doctor_name)
      
      setAvailableDoctors([...new Set(availableDoctorsList)])
    } catch (error) {
      console.error('Error checking doctor availability:', error)
      setAvailableDoctors([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        alert('Appointment booked successfully!')
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          doctor: '',
          reason: ''
        })
      } else {
        alert(result.error || 'Failed to book appointment')
      }
    } catch (error) {
      alert('Error submitting appointment')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Reset doctor and time when date changes
    if (name === 'date') {
      setFormData(prev => ({
        ...prev,
        doctor: '',
        time: ''
      }))
    }
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0]

  return (
    <div style={pageStyle}>
      <div className="container">
        <div style={headerStyle}>
          <h1 style={titleStyle}>📅 Book an Appointment</h1>
          <p style={subtitleStyle}>Schedule your visit with our expert medical team</p>
        </div>

        <div className="card" style={formContainerStyle}>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-2">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Preferred Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="doctor">Preferred Doctor</label>
                <select
                  id="doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  disabled={!formData.date || loading}
                >
                  <option value="">
                    {loading ? 'Checking availability...' : 'Select a doctor'}
                  </option>
                  {availableDoctors.map((doctor) => (
                    <option key={doctor} value={doctor}>
                      {doctor}
                    </option>
                  ))}
                </select>
                {formData.date && !loading && availableDoctors.length === 0 && (
                  <small style={warningStyle}>No doctors available on this date</small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="time">Preferred Time *</label>
                <select
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  disabled={!formData.doctor}
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {formatTime(time)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reason">Reason for Visit</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Briefly describe your symptoms or reason for visit (optional)"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={submitButtonStyle}
              disabled={isSubmitting || !formData.date || availableDoctors.length === 0}
            >
              {isSubmitting ? 'Booking...' : 'Book Appointment'}
            </button>
          </form>
        </div>

        <div className="card" style={infoStyle}>
          <h3>📋 Appointment Information</h3>
          <ul>
            <li>📞 For urgent matters, call: <strong>(555) 123-4567</strong></li>
            <li>⏰ Appointments are available Monday-Friday, 9 AM - 5 PM</li>
            <li>🕐 Please arrive 15 minutes early for your appointment</li>
            <li>📄 Bring a valid ID and insurance card</li>
            <li>❌ Cancellations must be made 24 hours in advance</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:${minutes} ${ampm}`
}

// Styles
const pageStyle = {
  padding: 'clamp(1rem, 5vw, 3rem) 0',
  background: '#f8f9fa',
  minHeight: '80vh'
}

const headerStyle = {
  textAlign: 'center',
  marginBottom: 'clamp(2rem, 5vw, 3rem)'
}

const titleStyle = {
  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  color: '#333',
  marginBottom: '1rem'
}

const subtitleStyle = {
  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
  color: '#666'
}

const formContainerStyle = {
  maxWidth: '800px',
  margin: '0 auto 2rem'
}

const submitButtonStyle = {
  width: '100%',
  padding: 'clamp(12px, 3vw, 15px)',
  fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
  marginTop: '1rem'
}

const infoStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  background: '#e7f3ff'
}

const warningStyle = {
  color: '#dc3545',
  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
  marginTop: '0.5rem',
  display: 'block'
}
