import React, { useState } from 'react';
import axios from 'axios';

function SignupForm({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/signup', {
        email,
        password,
      });
      setUser(response.data);
      setSuccess('Signup successful!');
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    const strength = getPasswordStrength(passwordValue);
    setPasswordStrength(strength);
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    return strength;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <label>Confirm Password:</label>
      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button type="submit" disabled={loading}>Signup</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <p>Password strength: {passwordStrength}/4</p>
    </form>
  );
}

export default SignupForm;