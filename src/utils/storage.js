import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
// KEYS
const USERS_KEY = 'sms_users'; // Key for storing users in localStorage
const CURR_KEY  = 'sms_current_user'; // Key for storing current user session
const STUDENTS_KEY = 'sms_students'; // Key for storing students in localStorage
// USERS
export function getUsers(){
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}
export function saveUsers(users){
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
export function addUser(user){
  const users = getUsers();
  users.push({ ...user, id: uuidv4() });
  saveUsers(users);
}
export function findUserByEmail(email){
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}
export function setCurrentUser(user){
  localStorage.setItem(CURR_KEY, JSON.stringify(user));
}
export function getCurrentUser(){
  return JSON.parse(localStorage.getItem(CURR_KEY) || 'null');
}
export function logout(){
  localStorage.removeItem(CURR_KEY);
}

// STUDENTS
export function getStudents(){
  return JSON.parse(localStorage.getItem(STUDENTS_KEY) || '[]');
}
export function saveStudents(list){
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(list));
}
export function addStudent(student){
  const list = getStudents();
  list.push({ ...student, id: uuidv4(), createdAt: new Date().toISOString() });
  saveStudents(list);
}
export function updateStudent(id, updated){
  const list = getStudents().map(s => s.id === id ? { ...s, ...updated } : s);
  saveStudents(list);
}
export function deleteStudent(id){
  const list = getStudents().filter(s => s.id !== id);
  saveStudents(list);
}
export function findStudentById(id){
  return getStudents().find(s => s.id === id);
}
