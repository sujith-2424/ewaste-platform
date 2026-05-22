import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    itemType: "laptop",
    description: "",
    address: "",
    userEmail: "",
    userName: "",
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/tickets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/tickets", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowForm(false);
      setForm({ itemType: "laptop", description: "", address: "", userEmail: "", userName: "" });
      fetchTickets();
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5000/api/tickets/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTickets();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const statusColor = {
    pending: "#f59e0b",
    processing: "#3b82f6",
    completed: "#10b981",
    cancelled: "#ef4444",
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>♻️ E-Waste Portal</h2>
        <div style={styles.navRight}>
          <span style={styles.welcome}>Hello, {user?.name}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Main content */}
      <div style={styles.main}>
        <div style={styles.header}>
          <h3 style={styles.heading}>
            {user?.role === "admin" ? "All Tickets" : "My Tickets"}
          </h3>
          <button style={styles.addBtn} onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ New Ticket"}
          </button>
        </div>

        {/* New Ticket Form */}
        {showForm && (
          <div style={styles.form}>
            <h4 style={styles.formTitle}>Submit E-Waste Ticket</h4>
            <input style={styles.input} placeholder="Your Name" value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })} />
            <input style={styles.input} placeholder="Your Email" value={form.userEmail}
              onChange={(e) => setForm({ ...form, userEmail: e.target.value })} />
            <select style={styles.input} value={form.itemType}
              onChange={(e) => setForm({ ...form, itemType: e.target.value })}>
              <option value="laptop">Laptop</option>
              <option value="phone">Phone</option>
              <option value="television">Television</option>
              <option value="refrigerator">Refrigerator</option>
              <option value="other">Other</option>
            </select>
            <input style={styles.input} placeholder="Description" value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <input style={styles.input} placeholder="Pickup Address" value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <button style={styles.submitBtn} onClick={handleSubmit}>Submit Ticket</button>
          </div>
        )}

        {/* Tickets Table */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.th}>Item</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Address</th>
                <th style={styles.th}>Status</th>
                {user?.role === "admin" && <th style={styles.th}>Update</th>}
              </tr>
            </thead>
            <tbody>
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan="6" style={styles.noData}>No tickets found</td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr key={ticket._id} style={styles.tableRow}>
                    <td style={styles.td}>{ticket.itemType}</td>
                    <td style={styles.td}>{ticket.description}</td>
                    <td style={styles.td}>{ticket.userName}</td>
                    <td style={styles.td}>{ticket.address}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, backgroundColor: statusColor[ticket.status] }}>
                        {ticket.status}
                      </span>
                    </td>
                    {user?.role === "admin" && (
                      <td style={styles.td}>
                        <select style={styles.select}
                          value={ticket.status}
                          onChange={(e) => updateStatus(ticket._id, e.target.value)}>
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#f0f4f8", fontFamily: "sans-serif" },
  navbar: { backgroundColor: "#2d6a4f", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  logo: { color: "white", margin: 0 },
  navRight: { display: "flex", alignItems: "center", gap: "16px" },
  welcome: { color: "white", fontSize: "14px" },
  logoutBtn: { padding: "8px 16px", backgroundColor: "white", color: "#2d6a4f", border: "none", borderRadius: "6px", cursor: "pointer" },
  main: { padding: "32px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  heading: { margin: 0, color: "#2d6a4f" },
  addBtn: { padding: "10px 20px", backgroundColor: "#2d6a4f", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" },
  form: { backgroundColor: "white", padding: "24px", borderRadius: "12px", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" },
  formTitle: { margin: 0, color: "#2d6a4f" },
  input: { padding: "10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px" },
  submitBtn: { padding: "12px", backgroundColor: "#2d6a4f", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px" },
  tableWrapper: { backgroundColor: "white", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  tableHead: { backgroundColor: "#2d6a4f" },
  th: { padding: "14px 16px", color: "white", textAlign: "left", fontSize: "14px" },
  tableRow: { borderBottom: "1px solid #f0f0f0" },
  td: { padding: "14px 16px", fontSize: "14px", color: "#333" },
  badge: { padding: "4px 10px", borderRadius: "20px", color: "white", fontSize: "12px", fontWeight: "bold" },
  select: { padding: "6px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "13px" },
  noData: { textAlign: "center", padding: "40px", color: "#999" },
};

export default Dashboard;