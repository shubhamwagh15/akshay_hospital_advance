import { getDB } from '@/lib/database'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, date, time, doctor, reason } = body

    // Validation
    if (!name || !email || !phone || !date || !time) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const db = await getDB()

    // Check doctor availability for the requested date
    if (doctor && doctor !== 'Any Available Doctor') {
      const unavailabilityCheck = await db.get(`
        SELECT COUNT(*) as is_unavailable, reason
        FROM doctor_unavailability 
        WHERE doctor_name = ? AND date = ?
      `, [doctor, date])

      if (unavailabilityCheck.is_unavailable > 0) {
        const unavailabilityInfo = await db.get(`
          SELECT reason FROM doctor_unavailability 
          WHERE doctor_name = ? AND date = ?
        `, [doctor, date])
        
        return Response.json(
          { 
            error: `${doctor} is not available on ${date}. Reason: ${unavailabilityInfo.reason || 'Not available'}. Please select a different date or doctor.` 
          },
          { status: 400 }
        )
      }

      // Check if doctor has reached maximum appointments for that day
      const bookingCount = await db.get(`
        SELECT COUNT(*) as current_bookings
        FROM appointments 
        WHERE doctor = ? AND date = ? AND status = 'scheduled'
      `, [doctor, date])

      const MAX_APPOINTMENTS_PER_DAY = 20
      if (bookingCount.current_bookings >= MAX_APPOINTMENTS_PER_DAY) {
        return Response.json(
          { error: `${doctor} is fully booked on ${date} (${MAX_APPOINTMENTS_PER_DAY} appointments limit). Please select a different date or doctor.` },
          { status: 400 }
        )
      }
    }

    // Insert the appointment
    const result = await db.run(
      'INSERT INTO appointments (name, email, phone, date, time, doctor, reason) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, date, time, doctor || 'Any Available Doctor', reason || '']
    )

    return Response.json(
      { message: 'Appointment booked successfully!', appointmentId: result.lastID },
      { status: 201 }
    )

  } catch (error) {
    console.error('Database error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const doctor = searchParams.get('doctor')
    
    const db = await getDB()
    
    let query = 'SELECT * FROM appointments WHERE 1=1'
    const params = []
    
    if (date) {
      query += ' AND date = ?'
      params.push(date)
    }
    
    if (doctor) {
      query += ' AND doctor = ?'
      params.push(doctor)
    }
    
    query += ' ORDER BY date DESC, time DESC'
    
    const appointments = await db.all(query, params)
    
    return Response.json({ appointments })
  } catch (error) {
    console.error('Database error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
