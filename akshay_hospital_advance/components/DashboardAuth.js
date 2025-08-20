// components/DashboardAuth.js
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import { hasAdminAccess } from '../lib/allowedEmails'
import AuthModal from './AuthModal'

export default function DashboardAuth({ children }) {
  const [isChecking, setIsChecking] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { currentUser, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const checkAccess = async () => {
      // Wait a moment for auth to initialize
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (!currentUser) {
        setShowAuthModal(true)
        setIsChecking(false)
        return
      }

      // Check if user email is authorized
      if (!hasAdminAccess(currentUser.email)) {
        alert(`❌ Unauthorized Access\n\nYour email (${currentUser.email}) is not authorized to access the dashboard.\n\nContact the administrator to request access.`)
        await logout()
        router.push('/')
        return
      }

      setIsChecking(false)
    }

    checkAccess()
  }, [currentUser, router, logout])

  const handleAuthClose = () => {
    setShowAuthModal(false)
    router.push('/')
  }

  if (isChecking) {
    return (
      <div style={loadingStyle}>
        <div style={spinnerStyle}>
          <div className="spinner"></div>
          <p>Checking authorization...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <>
        <div style={unauthorizedStyle}>
          <div style={unauthorizedContentStyle}>
            <h1>🔐 Dashboard Access Required</h1>
            <p>You must be logged in with an authorized account to access the dashboard.</p>
            <button 
              onClick={() => setShowAuthModal(true)}
              className="btn btn-primary"
              style={loginBtnStyle}
            >
              Login to Dashboard
            </button>
            <button 
              onClick={() => router.push('/')}
              className="btn"
              style={homeBtnStyle}
            >
              Return to Home
            </button>
          </div>
        </div>

        <AuthModal 
          isOpen={showAuthModal}
          onClose={handleAuthClose}
          initialMode="login"
        />
      </>
    )
  }

  if (!hasAdminAccess(currentUser.email)) {
    return (
      <div style={unauthorizedStyle}>
        <div style={unauthorizedContentStyle}>
          <h1>❌ Access Denied</h1>
          <p>Your account does not have permission to access the dashboard.</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <button 
            onClick={async () => {
              await logout()
              router.push('/')
            }}
            className="btn btn-primary"
          >
            Logout & Return Home
          </button>
        </div>
      </div>
    )
  }

  // User is authorized, render the dashboard
  return (
    <div>
      <div style={userInfoStyle}>
        <span>👤 Logged in as: <strong>{currentUser.displayName || currentUser.email}</strong></span>
        <button 
          onClick={async () => {
            await logout()
            router.push('/')
          }}
          className="btn"
          style={logoutBtnStyle}
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  )
}

// Styles
const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: '#f8f9fa'
}

const spinnerStyle = {
  textAlign: 'center',
  padding: '2rem'
}

const unauthorizedStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white'
}

const unauthorizedContentStyle = {
  textAlign: 'center',
  background: 'rgba(255,255,255,0.1)',
  padding: '3rem',
  borderRadius: '15px',
  backdropFilter: 'blur(10px)',
  maxWidth: '500px',
  width: '90%'
}

const loginBtnStyle = {
  margin: '1rem 0.5rem',
  padding: '12px 24px'
}

const homeBtnStyle = {
  margin: '1rem 0.5rem',
  padding: '12px 24px',
  background: 'rgba(255,255,255,0.2)',
  color: 'white',
  border: '1px solid rgba(255,255,255,0.3)'
}

const userInfoStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  background: 'linear-gradient(135deg, #28a745, #20c997)',
  color: 'white',
  fontSize: '0.9rem'
}

const logoutBtnStyle = {
  background: 'rgba(255,255,255,0.2)',
  color: 'white',
  border: '1px solid rgba(255,255,255,0.3)',
  padding: '8px 16px',
  fontSize: '0.8rem'
}
