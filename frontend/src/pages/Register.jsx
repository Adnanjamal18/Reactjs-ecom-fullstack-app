import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await api.post('/auth/register', { name, email, password })
      setSuccess('Registration successful! Please login.')
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("RESPONSE:", err.response);
      console.log("DATA:", err.response?.data);

      setError(err.response?.data?.error || err.message || 'Registration failed');
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass form-container">
      <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Create Account</h2>
      
      {error && <div className="alert">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="john@example.com"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
          {loading ? 'Creating...' : 'Register'}
        </button>
      </form>
      
      <p style={{ marginTop: '1.5rem', color: '#94a3b8' }}>
        Already have an account? <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'none' }}>Login here</Link>
      </p>
    </div>
  )
}

export default Register
