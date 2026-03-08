import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Project } from '../../utils/api';
import { useNavigate } from 'react-router';
import { MapPin } from 'lucide-react';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  projects: Project[];
  centerPos?: [number, number]; // [lat, lng]
}

// Custom hook component to recenter map when centerPos changes
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export function ProjectMap({ projects, centerPos = [12.9716, 77.5946] }: MapProps) {
  const navigate = useNavigate();

  return (
    <MapContainer 
      center={centerPos} 
      zoom={12} 
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
    >
      <ChangeView center={centerPos} zoom={12} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {projects.map((project) => {
        if (!project.lat || !project.lng) return null;
        return (
          <Marker 
            key={project.id} 
            position={[project.lat, project.lng]}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{project.category}</p>
                <div className="flex justify-between items-center">
                   <span className="font-bold text-primary">₹{project.budget}</span>
                   <button 
                     onClick={(e) => {
                         e.stopPropagation();
                         navigate(`/project/${project.id}`);
                     }}
                     className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90 transition-colors"
                   >
                     View
                   </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
