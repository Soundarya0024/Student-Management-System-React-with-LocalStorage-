import React from 'react'
import { Navigate } from 'react-router-dom' // Navigate component for redirection
import { getCurrentUser } from '../utils/storage' // Function to get the current user from storage

export default function ProtectedRoute({ children }){
  const user = getCurrentUser()
  if (!user) return <Navigate to="/login" replace />
  return children
}
