export const validators = {
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) ? null : 'Invalid email format'
  },
  
  required: (value) => {
    return value && value.toString().trim() ? null : 'This field is required'
  },
  
  minLength: (min) => (value) => {
    return value && value.length >= min ? null : `Minimum ${min} characters required`
  },
  
  maxLength: (max) => (value) => {
    return value && value.length <= max ? null : `Maximum ${max} characters allowed`
  }
}

export const validateForm = (data, rules) => {
  const errors = {}
  
  Object.keys(rules).forEach(field => {
    const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]]
    
    for (const rule of fieldRules) {
      const error = rule(data[field])
      if (error) {
        errors[field] = error
        break
      }
    }
  })
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}