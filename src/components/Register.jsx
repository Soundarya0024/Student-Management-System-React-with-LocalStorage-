import React, { useState } from 'react' // React and useState hook for state management
import { useNavigate, Link } from 'react-router-dom' // useNavigate for navigation, Link for linking to other routes
import bcrypt from 'bcryptjs' // bcryptjs for hashing passwords
import { addUser, findUserByEmail } from '../utils/storage' // Functions to interact with user storage
import { isValidEmail, isValidPhone, isNonEmpty } from '../utils/validators' // Validation functions

export default function Register(){
  const nav = useNavigate() //nav is the navigation function to redirect after registration.
  const [form, setForm] = useState({ fullName:'', email:'', password:'', phone:'', address:'' })
//form is a state object holding all the input values.
//setForm is used to update the state whenever the user types.
  const handleChange = e => setForm({...form, [e.target.name]: e.target.value })
//handleChange updates the specific field in the form.
  const handleSubmit = e => {
    e.preventDefault()
    // validation
    if (!isNonEmpty(form.fullName)) return alert('Enter full name')
    if (!isValidEmail(form.email)) return alert('Invalid email')
    if (form.password.length < 6) return alert('Password must be 6+ chars')
    if (!isValidPhone(form.phone)) return alert('Invalid phone (digits only)')
    if (!isNonEmpty(form.address)) return alert('Enter address')
    if (findUserByEmail(form.email)) return alert('User with this email already exists')

    // hash password (synchronously for simplicity)
    const hashed = bcrypt.hashSync(form.password, 10) // Hashes the password with salt 10.
    addUser({ fullName: form.fullName, email: form.email, password: hashed, phone: form.phone, address: form.address })

    alert('Registration successful. Please login.')
    nav('/login')
  }

  return (
    <div className="container">
      <div className="header">
        <h1>SKACAS</h1>
        <p>Student Management — Register</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <input className="input" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" />
          <input className="input" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          <input className="input" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password (6+ chars)" />
          <input className="input" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" />
          <textarea className="input" name="address" value={form.address} onChange={handleChange} placeholder="Address" />
          <button className="btn" type="submit">Register</button>
        </form>
        <p style={{textAlign:'center', marginTop:10}}>Already have account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}
