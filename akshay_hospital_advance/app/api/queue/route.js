import { getDB } from '../../../lib/database'

export async function PUT(request) {
  try {
    const body = await request.json()
    const { patientId, status } = body

    if (!patientId || !status) {
      return Response.json(
        { error: 'Patient ID and status are required' },
        { status: 400 }
      )
    }

    const db = await getDB()
    
    const updateQuery = status === 'completed' 
      ? 'UPDATE walk_ins SET status = ?, completed_at = CURRENT_TIMESTAMP WHERE id = ?'
      : 'UPDATE walk_ins SET status = ? WHERE id = ?'
    
    await db.run(updateQuery, [status, patientId])

    return Response.json({ message: 'Patient status updated successfully' })
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
    const db = await getDB()
    const today = new Date().toISOString().split('T')[0]
    
    // Get queue statistics
    const stats = await db.get(`
      SELECT 
        COUNT(*) as total_patients,
        COUNT(CASE WHEN status = 'waiting' THEN 1 END) as waiting_patients,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_patients,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_patients
      FROM walk_ins 
      WHERE DATE(created_at) = ?
    `, [today])
    
    // Get current queue number
    const queueSettings = await db.get(
      'SELECT current_queue_number FROM queue_settings WHERE date = ?',
      [today]
    )
    
    return Response.json({ 
      stats,
      currentQueueNumber: queueSettings?.current_queue_number || 0
    })
  } catch (error) {
    console.error('Database error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
