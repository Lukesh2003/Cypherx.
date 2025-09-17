
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from 'leaflet';
import 'leaflet.heat';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';

import { Tourist, MOCK_HIGH_RISK_ZONES } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from './ui/badge';
import { useEffect } from 'react';

const createTouristIcon = (tourist: Tourist) => {
    const borderColor = tourist.status === 'Alert' ? 'border-red-500' : 'border-green-500';
    const iconHtml = `
      <div class="relative">
        <img src="${tourist.avatar}" class="h-10 w-10 rounded-full border-4 ${borderColor}" />
      </div>
    `;
    return L.divIcon({
        html: iconHtml,
        className: 'bg-transparent border-none',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });
};

const HeatmapLayer = ({ show }: { show: boolean }) => {
    const map = useMap();

    useEffect(() => {
        if (!show) {
            // If a heatmap layer exists, remove it
            map.eachLayer(layer => {
                if (layer instanceof (L as any).HeatLayer) {
                    map.removeLayer(layer);
                }
            });
            return;
        }

        const heatLayer = (L as any).heatLayer(MOCK_HIGH_RISK_ZONES, {
            radius: 35,
            blur: 20,
            maxZoom: 17,
            gradient: { 0.4: 'blue', 0.6: 'lime', 0.8: 'yellow', 1: 'red' }
        });

        map.addLayer(heatLayer);

        return () => {
            if (map.hasLayer(heatLayer)) {
                map.removeLayer(heatLayer);
            }
        };
    }, [map, show]);

    return null;
};


export default function LiveMap({ tourists, showHeatmap }: { tourists: Tourist[], showHeatmap: boolean }) {
    return (
        <MapContainer center={[26.8, 93.2]} zoom={8} scrollWheelZoom={true} className="h-full w-full rounded-lg">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <HeatmapLayer show={showHeatmap} />
            <MarkerClusterGroup>
                {tourists.map((tourist) => (
                    <Marker
                        key={tourist.id}
                        position={[tourist.location.lat, tourist.location.lng]}
                        icon={createTouristIcon(tourist)}
                    >
                        <Popup>
                            <div className="flex flex-col gap-2 w-[200px]">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={tourist.avatar} alt={tourist.name} />
                                        <AvatarFallback>{tourist.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold text-base">{tourist.name}</p>
                                        <p className="text-xs text-muted-foreground">Passport: {tourist.passport}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm">Status: <Badge variant={tourist.status === 'Alert' ? 'destructive' : 'secondary'}>{tourist.status}</Badge></p>
                                    <p className="text-sm mt-1">Safety Score: <span className="font-bold">{tourist.safeScore}</span></p>
                                    <p className="text-xs text-muted-foreground mt-1">Last seen: {tourist.lastSeen}</p>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    )
}
