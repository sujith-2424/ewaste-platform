import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function MapView({ tickets }) {
  const validTickets = tickets.filter(t => t.pickup_coordinates?.coordinates)

  return (
    <MapContainer center={[17.3850, 78.4867]} zoom={11} style={{ height: '400px', borderRadius: '12px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {validTickets.map(t => (
        <Marker
          key={t._id}
          position={[t.pickup_coordinates.coordinates[1], t.pickup_coordinates.coordinates[0]]}
        >
          <Popup>
            <strong>{t.waste_type}</strong><br />
            Status: {t.status}<br />
            Center: {t.assigned_center_id?.name || 'N/A'}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}