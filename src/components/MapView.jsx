import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Configuración del icono del marcador (opcional)
const customIcon = new L.Icon({
    iconUrl: 'https://iili.io/dpHOraS.png', // Cambia esta URL por la de tu icono
    iconSize: [40, 40],
    iconAnchor: [12, 41],
});

const MapView = () => {
    const position = [40.7128, -74.0060]; // Coordenadas para NY 10163

    return (
        <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    Ubicación en NY 10163.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapView;