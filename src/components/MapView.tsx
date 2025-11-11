"use client";

import { Driver } from "@/types/drivers";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 14.5995,
  lng: 120.9842,
};

const PHILIPPINES_BOUNDS = {
  north: 21.321,
  south: 4.393,
  west: 116.87,
  east: 126.6,
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  clickableIcons: false,
  gestureHandling: "greedy",
  restriction: {
    latLngBounds: PHILIPPINES_BOUNDS,
    strictBounds: false,
  },
  styles: [
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
  ],
};

export const MapView = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const res = await fetch("/api/user/drivers");
        if (!res.ok) throw new Error("Failed to fetch drivers");
        const data = await res.json();
        setDrivers(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDrivers();
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      options={mapOptions}
    >
      {drivers.map((driver) => (
        driver.location && (
          <Marker
            key={driver.id}
            position={{
              lat: driver.location.lat,
              lng: driver.location.lng,
            }}
            title={`${driver.firstName} ${driver.surName}`}
          />
        )
      ))}
    </GoogleMap>
  );
};
