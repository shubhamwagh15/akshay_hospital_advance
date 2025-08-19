'use client'
import { useState, useEffect } from 'react'

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

        {activeSection === 'walkIn' && (
          <div>
            <div style={walkInHeaderStyle}>
              <h2 style={sectionTitleStyle}>🚶 Walk-in Patient Queue</h2>
              <button
                onClick={() => setShowWalkInForm(true)}
                className="btn btn-primary"
                style={addPatientButtonStyle}
              >
                ➕ Add Walk-in Patient
              </button>
            </div>

            {/* Walk-in Form Modal */}
            {showWalkInForm && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>Add Walk-in Patient</h3>
                    <button onClick={() => setShowWalkInForm(false)} className="close-button">×</button>
                  </div>
                  <form onSubmit={handleWalkInSubmit}>
                    <div className="grid grid-2" style={{gap: '1rem'}}>
                      <div className="form-group">
                        <label>Patient Name *</label>
                        <input
                          type="text"
                          required
                          value={walkInForm.name}
                          onChange={(e) => setWalkInForm({...walkInForm, name: e.target.value})}
                          placeholder="Enter patient name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={walkInForm.phone}
                          onChange={(e) => setWalkInForm({...walkInForm, phone: e.target.value})}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="form-group">
                        <label>Age</label>
                        <input
                          type="number"
                          value={walkInForm.age}
                          onChange={(e) => setWalkInForm({...walkInForm, age: e.target.value})}
                          placeholder="Enter age"
                        />
                      </div>
                      <div className="form-group">
                        <label>Gender</label>
                        <select
                          value={walkInForm.gender}
                          onChange={(e) => setWalkInForm({...walkInForm, gender: e.target.value})}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Emergency Level</label>
                        <select
                          value={walkInForm.emergency_level}
                          onChange={(e) => setWalkInForm({...walkInForm, emergency_level: e.target.value})}
                        >
                          <option value="normal">Normal</option>
                          <option value="urgent">Urgent</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Preferred Doctor</label>
                        <select
                          value={walkInForm.doctor}
                          onChange={(e) => setWalkInForm({...walkInForm, doctor: e.target.value})}
                        >
                          <option value="">Any Available Doctor</option>
                          {doctors.map(doctor => (
                            <option key={doctor} value={doctor}>{doctor}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Reason for Visit</label>
                      <textarea
                        value={walkInForm.reason}
                        onChange={(e) => setWalkInForm({...walkInForm, reason: e.target.value})}
                        placeholder="Describe symptoms or reason for visit"
                      />
                    </div>
                    <div style={modalButtonsStyle}>
                      <button type="submit" className="btn btn-primary">Add to Queue</button>
                      <button type="button" className="btn" onClick={() => setShowWalkInForm(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="card">
              <div className="queue-stats">
                <div className="stat-box">
                  <h4>👥 Total in Queue</h4>
                  <span className="stat-number">{(walkIns || []).length}</span>
                </div>
                <div className="stat-box">
                  <h4>⏳ Waiting</h4>
                  <span className="stat-number">{(walkIns || []).filter(p => p.status === 'waiting').length}</span>
                </div>
                <div className="stat-box">
                  <h4>⚕️ In Progress</h4>
                  <span className="stat-number">{(walkIns || []).filter(p => p.status === 'in_progress').length}</span>
                </div>
                <div className="stat-box">
                  <h4>✅ Completed</h4>
                  <span className="stat-number">{(walkIns || []).filter(p => p.status === 'completed').length}</span>
                </div>
              </div>

              <h3 style={queueListTitleStyle}>📋 Today's Queue List</h3>
              
              {loading ? (
                <div style={loadingStyle}>Loading queue...</div>
              ) : walkIns.length === 0 ? (
                <div style={emptyStateStyle}>
                  <p>🚶 No walk-in patients in queue today</p>
                </div>
              ) : (
                <div style={queueListStyle}>
                  {(walkIns || [])
                    .sort((a, b) => a.queue_number - b.queue_number)
                    .map((patient, index) => (
                    <div key={patient.id} className="queue-list-item" style={{backgroundColor: getQueueItemColor(patient.status)}}>
                      <div style={queueItemNumberStyle}>
                        #{patient.queue_number}
                      </div>
                      
                      <div style={queueItemContentStyle}>
                        <div style={queueItemHeaderStyle}>
                          <h4 style={patientNameListStyle}>👤 {patient.name}</h4>
                          <div>
                            <span className="emergency-badge" style={{backgroundColor: getEmergencyColor(patient.emergency_level)}}>
                              {patient.emergency_level.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        <div style={queueItemDetailsStyle}>
                          <span>📞 {patient.phone}</span>
                          {patient.age && <span>👶 Age: {patient.age}</span>}
                          <span>👨‍⚕️ {patient.doctor}</span>
                          <span>🕐 {new Date(patient.arrival_time).toLocaleTimeString()}</span>
                        </div>
                        
                        {patient.reason && (
                          <div style={reasonStyle}>
                            📝 {patient.reason}
                          </div>
                        )}
                      </div>
                      
                      <div style={queueItemActionsStyle}>
                        <div className="status-badge" style={{backgroundColor: getStatusColor(patient.status)}}>
                          {patient.status.replace('_', ' ').toUpperCase()}
                        </div>
                        
                        <div style={actionButtonsListStyle}>
                          {patient.status === 'waiting' && (
                            <button
                              onClick={() => updatePatientStatus(patient.id, 'in_progress')}
                              className="btn"
                              style={startButtonListStyle}
                            >
                              ▶️ Start
                            </button>
                          )}
                          
                          {patient.status === 'in_progress' && (
                            <button
                              onClick={() => updatePatientStatus(patient.id, 'completed')}
                              className="btn btn-primary"
                              style={completeButtonListStyle}
                            >
                              ✅ Complete
                            </button>
                          )}
                          
                          {patient.status === 'completed' && patient.completed_at && (
                            <span style={completedTimeListStyle}>
                              ✅ {new Date(patient.completed_at).toLocaleTimeString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === 'availability' && (
          <div>
            <div style={walkInHeaderStyle}>
              <h2 style={sectionTitleStyle}>👨‍⚕️ Doctor Availability Management</h2>
              <button
                onClick={() => setShowAvailabilityForm(true)}
                className="btn btn-primary"
                style={addPatientButtonStyle}
              >
                📅 Mark Doctor Unavailable
              </button>
            </div>

            {/* Doctor Unavailability Form Modal */}
            {showAvailabilityForm && (
              <div className="modal-overlay">
                <div className="modal-content" style={{maxWidth: '600px'}}>
                  <div className="modal-header">
                    <h3>Mark Doctor Unavailable</h3>
                    <button onClick={() => setShowAvailabilityForm(false)} className="close-button">×</button>
                  </div>
                  <form onSubmit={handleAvailabilitySubmit}>
                    <div className="grid grid-2" style={{gap: '1rem'}}>
                      <div className="form-group">
                        <label>Select Doctor *</label>
                        <select
                          required
                          value={availabilityForm.doctor}
                          onChange={(e) => setAvailabilityForm({...availabilityForm, doctor: e.target.value})}
                        >
                          <option value="">Select Doctor</option>
                          {doctors.map(doctor => (
                            <option key={doctor} value={doctor}>{doctor}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Date *</label>
                        <input
                          type="date"
                          required
                          value={availabilityForm.date}
                          onChange={(e) => setAvailabilityForm({...availabilityForm, date: e.target.value})}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Reason for Unavailability</label>
                      <select
                        value={availabilityForm.reason}
                        onChange={(e) => setAvailabilityForm({...availabilityForm, reason: e.target.value})}
                      >
                        <option value="">Select Reason</option>
                        <option value="Annual Leave">Annual Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Conference">Medical Conference</option>
                        <option value="Emergency Leave">Emergency Leave</option>
                        <option value="Training">Training/Education</option>
                        <option value="Personal Leave">Personal Leave</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {availabilityForm.reason === 'Other' && (
                      <div className="form-group">
                        <label>Custom Reason</label>
                        <input
                          type="text"
                          value={availabilityForm.customReason}
                          onChange={(e) => setAvailabilityForm({...availabilityForm, customReason: e.target.value})}
                          placeholder="Enter custom reason"
                        />
                      </div>
                    )}

                    <div style={modalButtonsStyle}>
                      <button type="submit" className="btn btn-primary">Mark Unavailable</button>
                      <button type="button" className="btn" onClick={() => setShowAvailabilityForm(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="card">
              <h3 style={sectionTitleStyle}>Doctor Availability Status (Next 7 Days)</h3>
              <p style={{color: '#666', marginBottom: '2rem'}}>
                ℹ️ Doctors are available by default. Only unavailable dates are shown below.
              </p>
              
              {loading ? (
                <div style={loadingStyle}>Loading availability...</div>
              ) : (
                <div className="availability-table">
                  <table style={tableStyle}>
                    <thead>
                      <tr style={tableHeaderStyle}>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Day</th>
                        <th>Status</th>
                        <th>Reason (if unavailable)</th>
                        <th>Total Bookings</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(availability || []).map((slot, index) => {
                        const date = new Date(slot.date)
                        const isToday = slot.date === new Date().toISOString().split('T')[0]
                        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
                        
                        return (
                          <tr key={index} style={tableRowStyle}>
                            <td style={doctorCellStyle}>{slot.doctor_name}</td>
                            <td style={isToday ? todayCellStyle : {}}>{date.toLocaleDateString()}</td>
                            <td style={isToday ? todayCellStyle : {}}>{isToday ? 'Today' : dayName}</td>
                            <td>
                              <span 
                                className="availability-status" 
                                style={{backgroundColor: slot.is_available ? '#28a745' : '#dc3545'}}
                              >
                                {slot.is_available ? 'Available' : 'Unavailable'}
                              </span>
                            </td>
                            <td style={reasonCellStyle}>
                              {slot.is_available ? '-' : (slot.unavailable_reason || 'Not specified')}
                            </td>
                            <td>{slot.total_bookings || 0}</td>
                            <td>
                              <button
                                onClick={() => updateAvailability(slot.doctor_name, slot.date, !slot.is_available, slot.unavailable_reason)}
                                className="btn"
                                style={{
                                  ...toggleAvailabilityStyle,
                                  backgroundColor: slot.is_available ? '#dc3545' : '#28a745',
                                  color: 'white'
                                }}
                              >
                                {slot.is_available ? '❌ Mark Unavailable' : '✅ Mark Available'}
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === 'patientData' && (
          <div className="card">
            <div style={patientDataHeaderStyle}>
              <h2 style={sectionTitleStyle}>📊 Patient Data Analytics</h2>
              <button
                onClick={downloadPatientData}
                className="btn btn-primary"
                style={downloadButtonStyle}
              >
                📥 Download All Data
              </button>
            </div>
            
            {loading ? (
              <div style={loadingStyle}>Loading patient data...</div>
            ) : patientData.length === 0 ? (
              <div style={emptyStateStyle}>
                <p>📊 No patient data available</p>
              </div>
            ) : (
              <div className="patient-data-table">
                <table style={tableStyle}>
                  <thead>
                    <tr style={tableHeaderStyle}>
                      <th>Month</th>
                      <th>Total Appointments</th>
                      <th>Total Walk-ins</th>
                      <th>Total Patients</th>
                      <th>Completed Appointments</th>
                      <th>Completed Walk-ins</th>
                      <th>Completion Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientData.map((row, index) => {
                      const completionRate = row.totalPatients > 0 
                        ? (((row.completedAppointments + row.completedWalkIns) / row.totalPatients) * 100).toFixed(1)
                        : 0
                      
                      return (
                        <tr key={index} style={tableRowStyle}>
                          <td style={monthCellStyle}>{formatMonth(row.month)}</td>
                          <td>{row.appointments}</td>
                          <td>{row.walkIns}</td>
                          <td style={totalCellStyle}>{row.totalPatients}</td>
                          <td>{row.completedAppointments}</td>
                          <td>{row.completedWalkIns}</td>
                          <td style={completionRateStyle}>{completionRate}%</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Styles
// Updated responsive styles
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

const walkInHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  flexWrap: 'wrap',
  gap: '1rem'
}

const addPatientButtonStyle = {
  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
  padding: 'clamp(8px 16px, 2vw, 10px 20px)'
}

const modalButtonsStyle = {
  display: 'flex',
  gap: '1rem',
  marginTop: '2rem',
  flexWrap: 'wrap'
}

const queueListTitleStyle = {
  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
  color: '#333',
  marginBottom: '1.5rem',
  borderBottom: '2px solid #e9ecef',
  paddingBottom: '0.5rem'
}

const queueListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
}

const queueItemNumberStyle = {
  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
  fontWeight: 'bold',
  color: '#007bff',
  background: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '50%',
  minWidth: '60px',
  textAlign: 'center',
  marginRight: '1rem'
}

const queueItemContentStyle = {
  flex: 1,
  marginRight: '1rem'
}

const queueItemHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.5rem',
  flexWrap: 'wrap',
  gap: '0.5rem'
}

const patientNameListStyle = {
  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
  color: '#333',
  margin: 0
}

const queueItemDetailsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'clamp(0.5rem, 2vw, 1rem)',
  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
  color: '#666',
  marginBottom: '0.5rem'
}

const reasonStyle = {
  fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
  color: '#555',
  fontStyle: 'italic',
  backgroundColor: '#f8f9fa',
  padding: '0.5rem',
  borderRadius: '4px'
}

const queueItemActionsStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem'
}

const actionButtonsListStyle = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap'
}

const startButtonListStyle = {
  background: '#17a2b8',
  color: 'white',
  fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
  padding: '4px 8px'
}

const completeButtonListStyle = {
  fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
  padding: '4px 8px'
}

const completedTimeListStyle = {
  fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)',
  color: '#28a745',
  fontWeight: '500'
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '1rem',
  fontSize: 'clamp(0.8rem, 2vw, 1rem)'
}

const tableHeaderStyle = {
  background: '#f8f9fa',
  borderBottom: '2px solid #dee2e6'
}

const tableRowStyle = {
  borderBottom: '1px solid #dee2e6'
}

const doctorCellStyle = {
  fontWeight: 'bold',
  color: '#007bff'
}

const todayCellStyle = {
  fontWeight: 'bold',
  color: '#007bff',
  background: '#e7f3ff'
}

const reasonCellStyle = {
  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
  color: '#666',
  fontStyle: 'italic'
}

const toggleAvailabilityStyle = {
  fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
  padding: '6px 12px'
}

const patientDataHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  flexWrap: 'wrap',
  gap: '1rem'
}

const downloadButtonStyle = {
  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
  padding: 'clamp(8px 16px, 2vw, 10px 20px)'
}

const monthCellStyle = {
  fontWeight: 'bold',
  color: '#007bff'
}

const totalCellStyle = {
  fontWeight: 'bold',
  background: '#e7f3ff'
}

const completionRateStyle = {
  fontWeight: 'bold',
  color: '#28a745'
}

