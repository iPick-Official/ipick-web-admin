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

// Map options with tilt & rotation enabled
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
  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID
};

export const MapView = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const res = await fetch("/api/driver");
        if (!res.ok) throw new Error("Failed to fetch drivers");
        const data = await res.json();
        setDrivers(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDrivers();
  }, []);

  if (loadError)
    return (
      <div className="flex items-center justify-center h-full w-full bg-gray-50">
        <div className="text-red-600 text-lg font-semibold">
          ⚠️ Failed to load Google Maps. Please try again later.
        </div>
      </div>
    );

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center h-full w-full bg-gray-50">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-500 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span className="text-gray-600 text-lg font-medium">
            Loading map...
          </span>
        </div>
      </div>
    );

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      options={mapOptions}
    >
      {drivers.map(
        (driver) =>
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
      )}
    </GoogleMap>
  );
};
