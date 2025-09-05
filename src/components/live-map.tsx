
"use client";

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import { Tourist } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const createTouristIcon = (tourist: Tourist) => {
    const iconHtml = `
      <div class="relative">
        <img src="${tourist.avatar}" class="h-8 w-8 rounded-full border-2 ${tourist.status === 'Alert' ? 'border-red-500' : 'border-green-500'}" />
      </div>
    `;
    return L.divIcon({
        html: iconHtml,
        className: 'bg-transparent border-none',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    });
};

export function LiveMap({ tourists }: { tourists: Tourist[] }) {
    return (
        <MapContainer center={[26.2, 92.9]} zoom={7} scrollWheelZoom={false} className="h-full w-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {tourists.map((tourist) => (
                <Marker
                    key={tourist.id}
                    position={[tourist.location.lat, tourist.location.lng]}
                    icon={createTouristIcon(tourist)}
                >
                    <Popup>
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={tourist.avatar} alt={tourist.name} />
                                <AvatarFallback>{tourist.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{tourist.name}</p>
                                <p className="text-xs text-muted-foreground">{tourist.lastSeen}</p>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}
