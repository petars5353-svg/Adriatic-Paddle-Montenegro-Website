"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapPin, PinType } from "@/lib/tours";

/** Ensures Leaflet re-measures if it mounted before its container had its final size. */
function ResizeFix() {
  const map = useMap();
  useEffect(() => {
    const fix = () => map.invalidateSize();
    fix();
    const t = setTimeout(fix, 250);
    const ro = new ResizeObserver(fix);
    ro.observe(map.getContainer());
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [map]);
  return null;
}

const PIN_META: Record<PinType, { color: string; emoji: string; label: string }> = {
  parking: { color: "#0f7c8a", emoji: "🅿️", label: "Parking" },
  meeting: { color: "#f0795c", emoji: "📍", label: "Meeting point" },
  restroom: { color: "#1a97a5", emoji: "🚻", label: "Restrooms" },
  dock: { color: "#0b2e3a", emoji: "🛶", label: "Launch dock" },
};

function makeIcon(type: PinType) {
  const meta = PIN_META[type];
  return L.divIcon({
    className: "",
    html: `<div style="
      display:flex;align-items:center;justify-content:center;
      width:34px;height:34px;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      background:${meta.color};box-shadow:0 3px 8px rgba(11,46,58,.35);
      border:2px solid #fff;">
      <span style="transform:rotate(45deg);font-size:15px;line-height:1">${meta.emoji}</span>
    </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32],
  });
}

export default function LaunchMap({
  center,
  zoom,
  pins,
}: {
  center: [number, number];
  zoom: number;
  pins: MapPin[];
}) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <ResizeFix />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pins.map((pin, i) => (
        <Marker key={i} position={[pin.lat, pin.lng]} icon={makeIcon(pin.type)}>
          <Popup>
            <div style={{ minWidth: 160 }}>
              <strong>{PIN_META[pin.type].label}</strong>
              <div style={{ margin: "4px 0 8px", color: "#0f5c6b" }}>{pin.label}</div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${pin.lat},${pin.lng}`}
                target="_blank"
                rel="noopener"
                style={{ color: "#f0795c", fontWeight: 600 }}
              >
                Get directions →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
