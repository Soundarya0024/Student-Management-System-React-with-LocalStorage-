import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import StudentForm from './components/StudentForm'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <StudentForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <StudentForm />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div style={{ padding: 40 }}>404 Not Found</div>} />
      </Routes>
    
  )
}
