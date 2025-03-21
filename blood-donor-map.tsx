import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { BloodBank } from "@shared/schema";

// Fix for default marker icons in Leaflet with React
// Webpack/Vite doesn't handle Leaflet's assets properly
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface BloodInventoryWithBank {
  id: number;
  bloodBankId: number;
  bloodGroup: string;
  component: string;
  quantity: number;
  lastUpdated: string;
  bloodBank: {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    email: string | null;
    latitude: string | null;
    longitude: string | null;
  };
}

interface BloodDonorMapProps {
  data: BloodInventoryWithBank[];
  isLoading: boolean;
}

// Helper component to set view once map is loaded
const SetViewOnLoad = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const BloodDonorMap = ({ data, isLoading }: BloodDonorMapProps) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // Default center: India
  const [mapZoom, setMapZoom] = useState(5);

  useEffect(() => {
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
          setMapZoom(10);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Filter out blood banks that don't have coordinates
  const validBloodBanks = data?.filter(
    (item) => 
      item.bloodBank && 
      item.bloodBank.latitude && 
      item.bloodBank.longitude
  ) || [];

  // Get unique blood banks to avoid duplicates
  const uniqueBloodBanks = Array.from(
    new Map(
      validBloodBanks.map(item => [item.bloodBank.id, item])
    ).values()
  );

  if (isLoading) {
    return (
      <div className="h-[400px] bg-gray-100 animate-pulse flex items-center justify-center rounded-lg">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="h-[500px] border rounded-lg overflow-hidden shadow-md">
      <MapContainer 
        style={{ height: "100%", width: "100%" }}
        zoom={5}
        center={[20.5937, 78.9629]} // Initial center (will be updated by SetViewOnLoad)
      >
        <SetViewOnLoad center={mapCenter} zoom={mapZoom} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User's location marker */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>
              <div className="text-center">
                <strong>Your Location</strong>
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Blood bank markers */}
        {uniqueBloodBanks.map((item) => {
          if (!item.bloodBank.latitude || !item.bloodBank.longitude) return null;
          
          const position: [number, number] = [
            parseFloat(item.bloodBank.latitude),
            parseFloat(item.bloodBank.longitude)
          ];
          
          // Find all inventory items for this blood bank
          const bankInventory = data.filter(inv => inv.bloodBankId === item.bloodBank.id);
          
          return (
            <Marker 
              key={item.bloodBank.id} 
              position={position}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-md">{item.bloodBank.name}</h3>
                  <p className="text-sm">{item.bloodBank.address}</p>
                  <p className="text-sm">{item.bloodBank.city}, {item.bloodBank.state}</p>
                  <p className="text-sm">Phone: {item.bloodBank.phone}</p>
                  
                  {bankInventory.length > 0 && (
                    <>
                      <h4 className="font-semibold mt-2 mb-1">Available Blood:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {bankInventory.map((inv) => (
                          <div key={inv.id} className="text-xs">
                            <span className="font-semibold">{inv.bloodGroup}</span>: {inv.quantity} units
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default BloodDonorMap;