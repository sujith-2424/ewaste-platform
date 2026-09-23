import { useEffect, useState } from 'react'
import { getTickets, updateTicketStatus } from '../api/tickets'
import MapView from '../components/MapView'

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([])

  const fetchTickets = async () => {
    const res = await getTickets()
    setTickets(res.data)
  }

  useEffect(() => { fetchTickets() }, [])

  const changeStatus = async (id, status) => {
    await updateTicketStatus(id, status)
    fetchTickets()
  }

  const statusColor = (s) => s === 'Completed' ? '#4ecca3' : s === 'InTransit' ? '#f0a500' : '#e05c5c'

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>
      <MapView tickets={tickets} />
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th>Waste Type</th>
            <th>Weight</th>
            <th>Status</th>
            <th>Assigned Center</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t._id} style={styles.row}>
              <td>{t.waste_type}</td>
              <td>{t.weight} kg</td>
              <td><span style={{ ...styles.badge, backgroundColor: statusColor(t.status) }}>{t.status}</span></td>
              <td>{t.assigned_center_id?.name || 'N/A'}</td>
              <td>{new Date(t.createdAt).toLocaleDateString()}</td>
              <td>
                <select value={t.status} onChange={(e) => changeStatus(t._id, e.target.value)} style={styles.select}>
                  <option value="Pending">Pending</option>
                  <option value="InTransit">InTransit</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const styles = {
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '2rem' },
  thead: { backgroundColor: '#1a1a2e', color: 'white' },
  row: { borderBottom: '1px solid #eee', padding: '0.5rem' },
  badge: { padding: '4px 10px', borderRadius: '20px', color: 'white', fontSize: '0.8rem' },
  select: { padding: '4px', borderRadius: '6px' }
}