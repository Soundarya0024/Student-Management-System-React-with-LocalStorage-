import React, { useState } from 'react' // React and useState hook for state management
import { Link, useNavigate } from 'react-router-dom' // Link for linking to other routes, useNavigate for navigation
import bcrypt from 'bcryptjs' // bcryptjs for comparing hashed passwords
import { findUserByEmail, setCurrentUser } from '../utils/storage' // Functions to interact with user storage

export default function Login(){
  const nav = useNavigate()
  const [form, setForm] = useState({ email:'', password:'' })

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault() //prevents page reload.
    const user = findUserByEmail(form.email)
    if (!user) return alert('No user with this email')
    const ok = bcrypt.compareSync(form.password, user.password)
    if (!ok) return alert('Incorrect password')
    // store safe minimal current user
    setCurrentUser({ id: user.id, fullName: user.fullName, email: user.email })
    nav('/dashboard')
  }

  return (
    <div className="container">
      <div className="header">
        <h1>SKACAS</h1>
        <h1>Student Management System</h1>
        <p>Login</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <input className="input" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          <input className="input" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
          <button className="btn" type="submit">Login</button>
        </form>
        <p style={{textAlign:'center', marginTop:10}}>New? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  )
}
