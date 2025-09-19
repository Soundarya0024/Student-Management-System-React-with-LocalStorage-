import React, { useEffect, useState } from 'react' // React and hooks for state and lifecycle management
import { useNavigate, useParams } from 'react-router-dom' // useNavigate for navigation, useParams to get URL params
import { addStudent, updateStudent, findStudentById, getStudents } from '../utils/storage' // Functions to interact with student storage
import { isValidEmail, isValidPhone, isNonEmpty } from '../utils/validators' // Validation functions

export default function StudentForm(){
  const nav = useNavigate()
  const { id } = useParams() // Get student ID from URL params
  const editing = Boolean(id) // Determine if we are in edit mode based on presence of ID

  const empty = {
    fullName:'', dob:'', gender:'', email:'', phone:'', address:'',
    className:'', rollNumber:'', guardianName:'', year:'', photo:''
  }
  const [form, setForm] = useState(empty)
  const [photoFile, setPhotoFile] = useState(null)

  useEffect(()=>{ // On component mount or when id changes
    if (editing){  // If editing, fetch existing student data
      const s = findStudentById(id)
      if (!s) { alert('Student not found'); nav('/dashboard'); return }
      setForm(s)
    }
  }, [id])

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value })
// Updates specific field in the form state
  const handleFile = e => {
    const f = e.target.files[0]
    if (!f) return
    // convert to base64
    const reader = new FileReader()
    reader.onload = () => {
      setForm(prev => ({...prev, photo: reader.result}))
    }
    reader.readAsDataURL(f)
    setPhotoFile(f)
  }

  function uniqueRollCheck(r){
    const all = getStudents()
    if (!r) return true
    if (!editing) return !all.some(s => s.rollNumber === r)
    return !all.some(s => s.rollNumber === r && s.id !== id)
  }

  const handleSubmit = e => {
    e.preventDefault()
    // validations
    if (!isNonEmpty(form.fullName)) return alert('Enter full name')
    if (!isValidEmail(form.email)) return alert('Invalid email')
    if (!isValidPhone(form.phone)) return alert('Invalid phone')
    if (!uniqueRollCheck(form.rollNumber)) return alert('Roll number already exists')
    if (!isNonEmpty(form.className)) return alert('Enter class')
    if (!form.year) return alert('Enter year')

    if (editing) { // If editing, update existing student
      updateStudent(id, form)
      alert('Updated')
    } else {
      addStudent(form)
      alert('Student created')
    }
    nav('/dashboard')
  }

  return (
    <div className="container">
      <div className="header">
        <h1>{editing ? 'Edit Student' : 'Create Student'}</h1>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <input className="input" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" />
          <input className="input" name="dob" type="date" value={form.dob} onChange={handleChange} />
          <input className="input" name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" />
          <input className="input" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          <input className="input" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" />
          <textarea className="input" name="address" value={form.address} onChange={handleChange} placeholder="Address" />
          <input className="input" name="className" value={form.className} onChange={handleChange} placeholder="Class" />
          <input className="input" name="rollNumber" value={form.rollNumber} onChange={handleChange} placeholder="Roll Number" />
          <input className="input" name="guardianName" value={form.guardianName} onChange={handleChange} placeholder="Guardian Name" />
          <input className="input" name="year" value={form.year} onChange={handleChange} placeholder="Year" />
          <input className="input" type="file" accept="image/*" onChange={handleFile} />
          <button className="btn" type="submit">{editing ? 'Update' : 'Submit'}</button>
          <button className="btn secondary" type="button" onClick={()=>nav('/dashboard')}>Home</button>
        </form>
      </div>
    </div>
  )
}
