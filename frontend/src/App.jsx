import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { api } from './api'
import { FaShoppingCart } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import Cart from "./pages/cart";

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const [balance, setBalance] = useState(0);
  // Simple check if user exists in local storage on load
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])
  
  const handleLogout = async () => {
    try {
      await api.post('/auth/logout')
      setUser(null)
      localStorage.removeItem('user')
      navigate('/login')
    } catch (error) {
      console.error('Logout error', error)
    }
  }
  const getWalletBalance = async () => {
    try {
      console.log("Calling wallet API");

      const response = await api.get("/wallet/");

      console.log(response.data);

      setBalance(response.data.data.balance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("User changed", user);

    if (user) {
      getWalletBalance();
    }
  }, [user]);

  return (
    <>
      <nav className="navbar">
        <div className="logo" style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <Link
            to="/cart"
            style={{
              color: "white",
              fontSize: "1.5rem"
            }}
          >
            <FaShoppingCart />
          </Link>
          NeoShop
        </div>
        <div className="nav-links">
          <FaWallet />
          <span>{balance}</span>
          <Link to="/">Home</Link>
          {user ? (
            <>
              <span style={{ color: '#a78bfa' }}>Hi, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.4rem 1rem' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </>
          )}
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </>
  )
}

export default App
