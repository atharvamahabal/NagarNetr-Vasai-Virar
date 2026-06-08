import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { WARD_DATA } from '../data/wards'
import { Search, MapPin } from 'lucide-react'
import { cn } from '../utils/cn'

// Fix for Leaflet default marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper function to get marker color based on complaints
const getMarkerIcon = (complaintCount) => {
  let color = '#22c55e'; // Green (Low)
  if (complaintCount > 30) color = '#ef4444'; // Red (High)
  else if (complaintCount > 10) color = '#f59e0b'; // Amber (Medium)

  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; items-center; justify-center; color: white; font-size: 10px; font-weight: bold;">${complaintCount}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

// Vasai-Virar Coordinates
const VVMC_CENTER = [19.3919, 72.8397];

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredWards = WARD_DATA.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.id.toString().includes(searchQuery)
  );

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] overflow-hidden">
      {/* Search Header */}
      <div className="p-4 bg-white border-b border-gray-200 z-10">
        <div className="relative max-w-2xl mx-auto">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search your area / locality (e.g. Vasai)" 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 relative">
        <MapContainer center={VVMC_CENTER} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredWards.map((ward) => (
            <Marker 
              key={ward.id} 
              position={[ward.lat, ward.lng]}
              icon={getMarkerIcon(ward.complaints)}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-secondary">Ward {ward.id}: {ward.name}</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-bold text-gray-500 uppercase">Nagarsevaks:</p>
                    {ward.corporators.map((corp, i) => (
                      <p key={i} className="text-xs">{corp.name} ({corp.party})</p>
                    ))}
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400">Open Complaints</span>
                      <span className={cn(
                        "font-bold",
                        ward.complaints > 30 ? "text-red-500" : ward.complaints > 10 ? "text-amber-500" : "text-green-500"
                      )}>{ward.complaints}</span>
                    </div>
                    <Link to="/report" className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">
                      Report Here
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-6 right-6 bg-white p-3 rounded-xl shadow-lg border border-gray-100 z-[1000] text-[10px]">
          <h5 className="font-bold mb-2">Complaint Density</h5>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>Low (&lt;10)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <span>Medium (10-30)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span>High (&gt;30)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapPage
