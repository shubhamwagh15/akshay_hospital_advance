import { getDB } from '@/lib/database'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const download = searchParams.get('download')
    const month = searchParams.get('month')
    const year = searchParams.get('year')
    
    const db = await getDB()

    if (download === 'true') {
      // Download all data
      const [appointments, walkIns] = await Promise.all([
        db.all(`
          SELECT 'appointment' as type, name, email, phone, date, time, doctor, reason, status, created_at
          FROM appointments ORDER BY created_at DESC
        `),
        db.all(`
          SELECT 'walk-in' as type, name, phone, age, gender, emergency_level, reason, doctor, status, queue_number, arrival_time, completed_at, created_at
          FROM walk_ins ORDER BY created_at DESC
        `)
      ])
      
      return Response.json({ 
        appointments, 
        walkIns,
        downloadData: true 
      })
    }

    // Get monthly data
    let monthlyQuery = `
      SELECT 
        strftime('%Y-%m', created_at) as month,
        COUNT(*) as total_patients,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_patients,
        'appointment' as type
      FROM appointments
    `
    
    let monthlyWalkInsQuery = `
      SELECT 
        strftime('%Y-%m', created_at) as month,
        COUNT(*) as total_patients,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_patients,
        'walk-in' as type
      FROM walk_ins
    `
    
    const params = []
    if (month && year) {
      const monthFilter = ` WHERE strftime('%Y-%m', created_at) = ?`
      monthlyQuery += monthFilter
      monthlyWalkInsQuery += monthFilter
      params.push(`${year}-${month.padStart(2, '0')}`)
    }
    
    monthlyQuery += ` GROUP BY strftime('%Y-%m', created_at) ORDER BY month DESC`
    monthlyWalkInsQuery += ` GROUP BY strftime('%Y-%m', created_at) ORDER BY month DESC`
    
    const [appointmentData, walkInData] = await Promise.all([
      db.all(monthlyQuery, params),
      db.all(monthlyWalkInsQuery, params)
    ])

    // Combine and organize data by month
    const monthlyData = {}
    
    appointmentData.forEach(row => {
      if (!monthlyData[row.month]) {
        monthlyData[row.month] = {
          month: row.month,
          appointments: 0,
          walkIns: 0,
          totalPatients: 0,
          completedAppointments: 0,
          completedWalkIns: 0
        }
      }
      monthlyData[row.month].appointments = row.total_patients
      monthlyData[row.month].completedAppointments = row.completed_patients
      monthlyData[row.month].totalPatients += row.total_patients
    })

    walkInData.forEach(row => {
      if (!monthlyData[row.month]) {
        monthlyData[row.month] = {
          month: row.month,
          appointments: 0,
          walkIns: 0,
          totalPatients: 0,
          completedAppointments: 0,
          completedWalkIns: 0
        }
      }
      monthlyData[row.month].walkIns = row.total_patients
      monthlyData[row.month].completedWalkIns = row.completed_patients
      monthlyData[row.month].totalPatients += row.total_patients
    })

    const sortedData = Object.values(monthlyData).sort((a, b) => 
      new Date(b.month + '-01') - new Date(a.month + '-01')
    )

    return Response.json({ monthlyData: sortedData })
  } catch (error) {
    console.error('Database error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
