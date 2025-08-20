import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let db = null

export async function initDB() {
  if (!db) {
    db = await open({
      filename: './appointments.db',
      driver: sqlite3.Database,
    })

    // Existing appointments table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        doctor TEXT,
        reason TEXT,
        status TEXT DEFAULT 'scheduled',
        user_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Existing walk-ins table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS walk_ins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        age INTEGER,
        gender TEXT,
        emergency_level TEXT DEFAULT 'normal',
        reason TEXT,
        doctor TEXT,
        status TEXT DEFAULT 'waiting',
        queue_number INTEGER,
        arrival_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        completed_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Queue management table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS queue_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        current_queue_number INTEGER DEFAULT 0,
        date TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Doctor unavailability table - tracks when doctors are NOT available
    await db.exec(`
      CREATE TABLE IF NOT EXISTS doctor_unavailability (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doctor_name TEXT NOT NULL,
        date TEXT NOT NULL,
        reason TEXT,
        all_day BOOLEAN DEFAULT 1,
        start_time TEXT,
        end_time TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(doctor_name, date)
      )
    `)

    // Create doctors table for reference
    await db.exec(`
      CREATE TABLE IF NOT EXISTS doctors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        specialization TEXT,
        phone TEXT,
        email TEXT,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Insert default doctors if they don't exist
    const doctors = [
      { name: 'Dr. Sarah Johnson', specialization: 'General Medicine' },
      { name: 'Dr. Michael Chen', specialization: 'Cardiology' },
      { name: 'Dr. Emily Davis', specialization: 'Pediatrics' },
      { name: 'Dr. Robert Wilson', specialization: 'Orthopedics' },
      { name: 'Dr. Lisa Anderson', specialization: 'Dermatology' }
    ]

    for (const doctor of doctors) {
      await db.run(`
        INSERT OR IGNORE INTO doctors (name, specialization)
        VALUES (?, ?)
      `, [doctor.name, doctor.specialization])
    }
  }
  return db
}

export async function getDB() {
  if (!db) {
    await initDB()
  }
  return db
}
