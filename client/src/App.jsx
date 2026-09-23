import { Routes, Route, Link } from 'react-router-dom'
import UserPortal from './pages/UserPortal'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function App() {
  return (
    <div>
      <nav style={styles.nav}>
        <span style={styles.brand}>♻️ E-Waste Platform</span>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Submit Pickup</Link>
          <Link to="/admin" style={styles.link}>Admin Dashboard</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<UserPortal />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1a1a2e',
    color: 'white'
  },
  brand: { fontSize: '1.3rem', fontWeight: 'bold' },
  links: { display: 'flex', gap: '1.5rem' },
  link: { color: '#4ecca3', textDecoration: 'none', fontWeight: '500' }
}

export default App