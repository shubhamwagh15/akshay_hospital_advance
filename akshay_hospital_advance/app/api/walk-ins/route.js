import { getDB } from '@/lib/database'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, phone, age, gender, emergency_level, reason, doctor } = body

    // Validation
    if (!name || !phone) {
      return Response.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    const db = await getDB()
    const today = new Date().toISOString().split('T')[0]
    
    // Get or create queue number for today
    let queueSettings = await db.get(
      'SELECT * FROM queue_settings WHERE date = ?',
      [today]
    )
    
    if (!queueSettings) {
      await db.run(
        'INSERT INTO queue_settings (current_queue_number, date) VALUES (1, ?)',
        [today]
      )
      queueSettings = { current_queue_number: 1 }
    } else {
      await db.run(
        'UPDATE queue_settings SET current_queue_number = current_queue_number + 1 WHERE date = ?',
        [today]
      )
      queueSettings.current_queue_number += 1
    }

    // Insert new walk-in patient
    const result = await db.run(
      `INSERT INTO walk_ins (name, phone, age, gender, emergency_level, reason, doctor, queue_number)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, phone, age || null, gender || null, emergency_level || 'normal', reason || '', doctor || 'Any Available Doctor', queueSettings.current_queue_number]
    )

    return Response.json(
      { 
        message: 'Walk-in patient added to queue successfully',
        patientId: result.lastID,
        queueNumber: queueSettings.current_queue_number
      },
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
    const status = searchParams.get('status') || 'all'
    const today = new Date().toISOString().split('T')[0]
    
    const db = await getDB()
    
    let query = 'SELECT * FROM walk_ins WHERE DATE(created_at) = ?'
    let params = [today]
    
    if (status && status !== 'all') {
      query += ' AND status = ?'
      params.push(status)
    }
    
    query += ' ORDER BY emergency_level DESC, queue_number ASC'
    
    const walkIns = await db.all(query, params)
    
    return Response.json({ walkIns })
  } catch (error) {
    console.error('Database error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
