import { getDB } from '@/lib/database'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const doctor = searchParams.get('doctor')
    const date = searchParams.get('date')
    
    const db = await getDB()
    
    // Generate dates for today and next 7 days
    const today = new Date()
    const dates = []
    for (let i = 0; i < 8; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    
    let query, params
    
    if (date) {
      // Single date query
      query = `
        SELECT 
          d.name as doctor_name,
          ? as date,
          CASE WHEN du.doctor_name IS NULL THEN 1 ELSE 0 END as is_available,
          du.reason as unavailable_reason,
          COALESCE(booking_counts.total_bookings, 0) as total_bookings
        FROM doctors d
        LEFT JOIN doctor_unavailability du ON d.name = du.doctor_name AND du.date = ?
        LEFT JOIN (
          SELECT 
            doctor,
            COUNT(*) as total_bookings
          FROM appointments 
          WHERE status = 'scheduled' AND date = ?
          GROUP BY doctor
        ) booking_counts ON d.name = booking_counts.doctor
        WHERE d.is_active = 1
      `
      params = [date, date, date]
      
      if (doctor) {
        query += ' AND d.name = ?'
        params.push(doctor)
      }
    } else {
      // Multiple dates query
      const placeholders = dates.map(() => '?').join(',')
      query = `
        SELECT 
          d.name as doctor_name,
          all_dates.date,
          CASE WHEN du.doctor_name IS NULL THEN 1 ELSE 0 END as is_available,
          du.reason as unavailable_reason,
          COALESCE(booking_counts.total_bookings, 0) as total_bookings
        FROM doctors d
        CROSS JOIN (
          SELECT ? as date UNION ALL
          SELECT ? UNION ALL
          SELECT ? UNION ALL
          SELECT ? UNION ALL
          SELECT ? UNION ALL
          SELECT ? UNION ALL
          SELECT ? UNION ALL
          SELECT ?
        ) all_dates
        LEFT JOIN doctor_unavailability du ON d.name = du.doctor_name AND all_dates.date = du.date
        LEFT JOIN (
          SELECT 
            doctor,
            date,
            COUNT(*) as total_bookings
          FROM appointments 
          WHERE status = 'scheduled'
          GROUP BY doctor, date
        ) booking_counts ON d.name = booking_counts.doctor AND all_dates.date = booking_counts.date
        WHERE d.is_active = 1
      `
      params = [...dates]
      
      if (doctor) {
        query += ' AND d.name = ?'
        params.push(doctor)
      }
    }
    
    query += ' ORDER BY date ASC, doctor_name ASC'
    
    const availability = await db.all(query, params)
    
    return Response.json({ availability })
  } catch (error) {
    console.error('Database error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { doctorName, date, isAvailable, reason } = body

    if (!doctorName || !date) {
      return Response.json(
        { error: 'Doctor name and date are required' },
        { status: 400 }
      )
    }

    const db = await getDB()
    
    if (isAvailable) {
      // Doctor is available - remove from unavailability table
      await db.run(`
        DELETE FROM doctor_unavailability 
        WHERE doctor_name = ? AND date = ?
      `, [doctorName, date])
    } else {
      // Doctor is unavailable - add/update in unavailability table
      await db.run(`
        INSERT OR REPLACE INTO doctor_unavailability 
        (doctor_name, date, reason, all_day, updated_at)
        VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)
      `, [doctorName, date, reason || 'Not available'])
    }

    return Response.json({ message: 'Availability updated successfully' })
  } catch (error) {
    console.error('Database error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { doctorName, unavailabilityData } = body

    if (!doctorName || !unavailabilityData) {
      return Response.json(
        { error: 'Doctor name and unavailability data are required' },
        { status: 400 }
      )
    }

    const db = await getDB()

    // Begin transaction
    await db.run('BEGIN TRANSACTION')

    try {
      // Set unavailability for multiple dates
      for (const dateData of unavailabilityData) {
        const { date, reason, allDay } = dateData
        
        if (allDay) {
          await db.run(`
            INSERT OR REPLACE INTO doctor_unavailability 
            (doctor_name, date, reason, all_day, updated_at)
            VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)
          `, [doctorName, date, reason || 'Not available'])
        }
      }

      await db.run('COMMIT')
      return Response.json({ message: 'Unavailability set successfully' })
    } catch (error) {
      await db.run('ROLLBACK')
      throw error
    }
  } catch (error) {
    console.error('Database error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
