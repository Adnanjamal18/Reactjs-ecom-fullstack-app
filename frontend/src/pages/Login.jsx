import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api'

function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {

      const response = await api.post('/auth/login', { email, password })
      const userData = response.data.data.user
      const token = response.data.data.token   // Token bhi response mein aata hai
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', token)     // Token save karo
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass form-container">
      <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Welcome Back</h2>
      
      {error && <div className="alert">{error}</div>}
      
      <form onSubmit={handleSubmit}>
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p style={{ marginTop: '1.5rem', color: '#94a3b8' }}>
        Don't have an account? <Link to="/register" style={{ color: '#3b82f6', textDecoration: 'none' }}>Register here</Link>
      </p>
    </div>
  )
}

export default Login
