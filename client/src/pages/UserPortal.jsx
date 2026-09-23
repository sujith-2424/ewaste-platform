import { useState } from 'react'
import { createTicket } from '../api/tickets'

export default function UserPortal() {
  const [form, setForm] = useState({
    name: '', email: '', address: '',
    waste_type: 'laptop', weight: '',
    longitude: '', latitude: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createTicket({
        user_id: '665f1b2e4f1a2b3c4d5e6f70',
        waste_type: form.waste_type,
        weight: Number(form.weight),
        coordinates: [Number(form.longitude), Number(form.latitude)]
      })
      setMessage('✅ Pickup request submitted! A center has been assigned.')
      setForm({ name: '', email: '', address: '', waste_type: 'laptop', weight: '', longitude: '', latitude: '' })
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.message || 'Something went wrong'))
    }
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <h2>Submit E-Waste Pickup Request</h2>
      <form onSubmit={submit} style={styles.form}>
        <select name="waste_type" value={form.waste_type} onChange={handle} style={styles.input}>
          <option value="laptop">Laptop</option>
          <option value="mobile">Mobile</option>
          <option value="battery">Battery</option>
          <option value="television">Television</option>
          <option value="refrigerator">Refrigerator</option>
        </select>
        <input style={styles.input} name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handle} required />
        <input style={styles.input} name="longitude" placeholder="Longitude (e.g. 78.4867)" value={form.longitude} onChange={handle} required />
        <input style={styles.input} name="latitude" placeholder="Latitude (e.g. 17.3850)" value={form.latitude} onChange={handle} required />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Submitting...' : 'Request Pickup'}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  )
}

const styles = {
  container: { maxWidth: '500px', margin: '3rem auto', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '12px' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.7rem', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' },
  button: { padding: '0.8rem', backgroundColor: '#4ecca3', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' },
  message: { marginTop: '1rem', fontWeight: 'bold' }
}