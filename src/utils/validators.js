export function isValidEmail(email){ // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function isValidPhone(phone){ 
  // simple check: 10-15 digits allowed
  return /^[0-9]{7,15}$/.test(phone); 
}
export function isNonEmpty(str){ // Check if string is non-empty after trimming
  return typeof str === 'string' && str.trim().length > 0;
}
