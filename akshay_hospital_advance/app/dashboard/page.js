// app/dashboard/page.js
'use client'
import { useState, useEffect } from 'react'
import DashboardAuth from '../../components/DashboardAuth'

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('appointments')
  const [appointments, setAppointments] = useState([])
  const [walkIns, setWalkIns] = useState([])
  const [availability, setAvailability] = useState([])
  const [patientData, setPatientData] = useState([])
  const [loading, setLoading] = useState(false)

  // Doctor availability form state
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false)
  const [availabilityForm, setAvailabilityForm] = useState({
    doctor: '',
    date: '',
    reason: '',
    customReason: ''
  })

  // Walk-in form state
  const [showWalkInForm, setShowWalkInForm] = useState(false)
  const [walkInForm, setWalkInForm] = useState({
    name: '',
    phone: '',
    age: '',
    gender: '',
    emergency_level: 'normal',
    reason: '',
    doctor: ''
  })

  // Stats
  const [todayStats, setTodayStats] = useState({
    appointments: 0,
    walkIns: 0,
    completed: 0
  })

  const doctors = [
    'Dr. Sarah Johnson',
    'Dr. Michael Chen',
    'Dr. Emily Davis',
    'Dr. Robert Wilson',
    'Dr. Lisa Anderson'
  ]

  useEffect(() => {
    fetchTodayStats()
    if (activeSection === 'appointments') {
      fetchTodayAppointments()
    } else if (activeSection === 'walkIn') {
      fetchWalkIns()
    } else if (activeSection === 'availability') {
      fetchAvailability()
    } else if (activeSection === 'patientData') {
      fetchPatientData()
    }
  }, [activeSection])

  const fetchTodayStats = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const [appointmentsRes, walkInsRes] = await Promise.all([
        fetch(`/api/appointments?date=${today}`),
        fetch('/api/walk-ins')
      ])
      
      const appointmentsData = await appointmentsRes.json()
      const walkInsData = await walkInsRes.json()
      
      setTodayStats({
        appointments: (appointmentsData.appointments || []).length,
        walkIns: (walkInsData.walkIns || []).filter(w => w.status === 'waiting').length,
        completed: ((appointmentsData.appointments || []).filter(a => a.status === 'completed').length) +
                  ((walkInsData.walkIns || []).filter(w => w.status === 'completed').length)
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchTodayAppointments = async () => {
    setLoading(true)
    try {
      const today = new Date().toISOString().split('T')[0]
      const response = await fetch(`/api/appointments?date=${today}`)
      const data = await response.json()
      setAppointments(data.appointments || [])
    } catch (error) {
      console.error('Error fetching appointments:', error)
      setAppointments([])
    }
    setLoading(false)
  }

  const fetchWalkIns = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/walk-ins')
      const data = await response.json()
      setWalkIns(data.walkIns || [])
    } catch (error) {
      console.error('Error fetching walk-ins:', error)
      setWalkIns([])
    }
    setLoading(false)
  }

  const fetchAvailability = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/availability')
      const data = await response.json()
      setAvailability(data.availability || [])
    } catch (error) {
      console.error('Error fetching availability:', error)
      setAvailability([])
    }
    setLoading(false)
  }

  const fetchPatientData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/patient-data')
      const data = await response.json()
      setPatientData(data.monthlyData || [])
    } catch (error) {
      console.error('Error fetching patient data:', error)
      setPatientData([])
    }
    setLoading(false)
  }

  const handleWalkInSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/walk-ins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(walkInForm)
      })
      
      const result = await response.json()
      if (response.ok) {
        alert(`Patient added to queue! Queue number: ${result.queueNumber}`)
        setWalkInForm({
          name: '',
          phone: '',
          age: '',
          gender: '',
          emergency_level: 'normal',
          reason: '',
          doctor: ''
        })
        setShowWalkInForm(false)
        fetchWalkIns()
        fetchTodayStats()
      } else {
        alert(result.error || 'Failed to add patient')
      }
    } catch (error) {
      alert('Error adding patient')
    }
  }

  const handleAvailabilitySubmit = async (e) => {
    e.preventDefault()
    try {
      const reason = availabilityForm.reason === 'Other' ? 
        availabilityForm.customReason : 
        availabilityForm.reason

      const response = await fetch('/api/availability', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorName: availabilityForm.doctor,
          date: availabilityForm.date,
          isAvailable: false,
          reason: reason
        })
      })
      
      const result = await response.json()
      if (response.ok) {
        alert('Doctor marked as unavailable successfully!')
        setAvailabilityForm({
          doctor: '',
          date: '',
          reason: '',
          customReason: ''
        })
        setShowAvailabilityForm(false)
        fetchAvailability()
      } else {
        alert(result.error || 'Failed to update availability')
      }
    } catch (error) {
      alert('Error updating availability')
    }
  }

  const updatePatientStatus = async (patientId, status) => {
    try {
      const response = await fetch('/api/queue', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, status })
      })
      
      if (response.ok) {
        fetchWalkIns()
        fetchTodayStats()
      }
    } catch (error) {
      console.error('Error updating patient status:', error)
    }
  }

  const updateAvailability = async (doctorName, date, isAvailable, currentReason) => {
    try {
      let reason = ''
      if (!isAvailable) {
        reason = prompt('Please enter reason for unavailability:', currentReason || 'Not available')
        if (reason === null) return
      }

      const response = await fetch('/api/availability', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctorName, date, isAvailable, reason })
      })
      
      if (response.ok) {
        fetchAvailability()
        alert('Availability updated successfully!')
      }
    } catch (error) {
      console.error('Error updating availability:', error)
    }
  }

  const downloadPatientData = async () => {
    try {
      const response = await fetch('/api/patient-data?download=true')
      const data = await response.json()
      
      // Create CSV content
      const csvRows = []
      
      // Headers
      csvRows.push('Type,Name,Phone,Email,Date,Time,Doctor,Reason,Status,Created At')
      
      // Appointments data
      data.appointments.forEach(item => {
        csvRows.push([
          'Appointment',
          item.name,
          item.phone,
          item.email || '',
          item.date,
          item.time,
          item.doctor,
          item.reason || '',
          item.status,
          new Date(item.created_at).toLocaleString()
        ].join(','))
      })
      
      // Walk-ins data
      data.walkIns.forEach(item => {
        csvRows.push([
          'Walk-in',
          item.name,
          item.phone,
          '',
          new Date(item.created_at).toISOString().split('T')[0],
          new Date(item.arrival_time).toLocaleTimeString(),
          item.doctor,
          item.reason || '',
          item.status,
          new Date(item.created_at).toLocaleString()
        ].join(','))
      })
      
      // Download
      const csvContent = csvRows.join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `hospital-patient-data-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading data:', error)
    }
  }

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A'
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting': return '#ffc107'
      case 'in_progress': return '#007bff'
      case 'completed': return '#28a745'
      default: return '#6c757d'
    }
  }

  const getEmergencyColor = (level) => {
    switch (level) {
      case 'critical': return '#dc3545'
      case 'urgent': return '#fd7e14'
      case 'normal': return '#28a745'
      default: return '#6c757d'
    }
  }

  const getQueueItemColor = (status) => {
    switch (status) {
      case 'waiting': return '#fff3cd'
      case 'in_progress': return '#d1ecf1'
      case 'completed': return '#d4edda'
      default: return '#f8f9fa'
    }
  }

  const formatMonth = (monthString) => {
    const [year, month] = monthString.split('-')
    const date = new Date(year, month - 1)
    return date.toLocaleString('default', { month: 'long', year: 'numeric' })
  }

  return (
    <DashboardAuth>
      <div style={pageStyle}>
        <div className="container">
          <div style={headerStyle}>
            <h1 style={titleStyle}>🏥 Hospital Dashboard</h1>
            <p style={subtitleStyle}>Comprehensive hospital management system</p>
          </div>

          {/* Main Dashboard Boxes */}
          <div className="grid grid-4" style={dashboardBoxesStyle}>
            <div 
              className={`card dashboard-box ${activeSection === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveSection('appointments')}
            >
              <div style={boxIconStyle}>📅</div>
              <h3 style={boxTitleStyle}>Appointments Today</h3>
              <p style={boxNumberStyle}>{todayStats.appointments}</p>
              <p style={boxDescStyle}>Scheduled appointments for today</p>
            </div>

            <div 
              className={`card dashboard-box ${activeSection === 'walkIn' ? 'active' : ''}`}
              onClick={() => setActiveSection('walkIn')}
            >
              <div style={boxIconStyle}>🚶</div>
              <h3 style={boxTitleStyle}>Walk-in Queue</h3>
              <p style={boxNumberStyle}>{todayStats.walkIns}</p>
              <p style={boxDescStyle}>Patients waiting in queue</p>
            </div>

            <div 
              className={`card dashboard-box ${activeSection === 'availability' ? 'active' : ''}`}
              onClick={() => setActiveSection('availability')}
            >
              <div style={boxIconStyle}>👨‍⚕️</div>
              <h3 style={boxTitleStyle}>Doctor Availability</h3>
              <p style={boxNumberStyle}>{(availability || []).filter(a => a.is_available).length}</p>
              <p style={boxDescStyle}>Available doctor slots</p>
            </div>

            <div 
              className={`card dashboard-box ${activeSection === 'patientData' ? 'active' : ''}`}
              onClick={() => setActiveSection('patientData')}
            >
              <div style={boxIconStyle}>📊</div>
              <h3 style={boxTitleStyle}>Patient Data</h3>
              <p style={boxNumberStyle}>{todayStats.completed}</p>
              <p style={boxDescStyle}>Monthly patient records</p>
            </div>
          </div>

          {/* Content Sections */}
          {activeSection === 'appointments' && (
            <div className="card">
              <h2 style={sectionTitleStyle}>📅 Today's Appointments</h2>
              {loading ? (
                <div style={loadingStyle}>Loading appointments...</div>
              ) : appointments.length === 0 ? (
                <div style={emptyStateStyle}>
                  <p>📅 No appointments scheduled for today</p>
                </div>
              ) : (
                <div style={appointmentsGridStyle}>
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="appointment-card">
                      <div style={appointmentHeaderStyle}>
                        <h4>👤 {appointment.name}</h4>
                        <span style={timeTagStyle}>🕐 {formatTime(appointment.time)}</span>
                      </div>
                      <div style={appointmentDetailsStyle}>
                        <p><strong>📧 Email:</strong> {appointment.email}</p>
                        <p><strong>📞 Phone:</strong> {appointment.phone}</p>
                        <p><strong>👨‍⚕️ Doctor:</strong> {appointment.doctor}</p>
                        {appointment.reason && <p><strong>📝 Reason:</strong> {appointment.reason}</p>}
                        <span className="status-badge" style={{backgroundColor: getStatusColor(appointment.status)}}>
                          {appointment.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Additional sections can be added here based on your existing dashboard code */}
        </div>
      </div>
    </DashboardAuth>
  )
}

// Styles (same as your existing dashboard styles)
const pageStyle = {
  padding: 'clamp(1rem, 5vw, 3rem) 0',
  background: '#f8f9fa',
  minHeight: '100vh'
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

const dashboardBoxesStyle = {
  marginBottom: 'clamp(2rem, 4vw, 3rem)',
  gap: 'clamp(1rem, 3vw, 2rem)'
}

const boxIconStyle = {
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  marginBottom: '1rem'
}

const boxTitleStyle = {
  fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
  color: '#333',
  marginBottom: '0.5rem'
}

const boxNumberStyle = {
  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  fontWeight: 'bold',
  color: '#007bff',
  margin: '0.5rem 0'
}

const boxDescStyle = {
  color: '#666',
  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
}

const sectionTitleStyle = {
  fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
  color: '#333',
  marginBottom: '2rem'
}

const loadingStyle = {
  textAlign: 'center',
  padding: 'clamp(2rem, 5vw, 3rem)',
  color: '#666'
}

const emptyStateStyle = {
  textAlign: 'center',
  padding: 'clamp(2rem, 5vw, 3rem)',
  color: '#666'
}

const appointmentsGridStyle = {
  display: 'grid',
  gap: 'clamp(1rem, 2.5vw, 1.5rem)'
}

const appointmentHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  flexWrap: 'wrap',
  gap: '0.5rem'
}

const timeTagStyle = {
  background: '#007bff',
  color: 'white',
  padding: '4px 12px',
  borderRadius: '15px',
  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
}

const appointmentDetailsStyle = {
  display: 'grid',
  gap: '0.5rem'
}
