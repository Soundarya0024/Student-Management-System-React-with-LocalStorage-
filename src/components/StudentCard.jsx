import React from 'react' // React library for building user interfaces
import { Link } from 'react-router-dom' // Link component for navigation

export default function StudentCard({ student, onDelete }){
  return (
    <div className="student-card">
      {student.photo ? <img src={student.photo} alt="photo" /> : <div style={{height:50, background:'#eee', borderRadius:6}} />}
      <h3 style={{color:'#c0392b'}}>{student.fullName}</h3>
      <p><b>Class:</b> {student.className} &nbsp; <b>Roll:</b> {student.rollNumber}</p>
      <p><b>Phone:</b> {student.phone}</p>
      <p><b>Year:</b> {student.year}</p>
      <div className="student-actions">
        <Link to={`/edit/${student.id}`}><button className="btn small">Update</button></Link>
        <button className="btn small secondary" onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
