"use client";

import { Driver } from "@/types/drivers";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState, useRef } from "react";
import { Loading } from "./Loading";

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
  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
};

export const MapView = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [zoom, setZoom] = useState(10); // initial zoom
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const res = await fetch("/api/driver");
        if (!res.ok) throw new Error("Failed to fetch drivers");

        const data: Driver[] = await res.json();
        const approvedLoggedDrivers = data.filter(
          (driver) =>
            driver.status === "approved" && driver.isLogged === true
        );

        setDrivers(approvedLoggedDrivers);
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
          Failed to load Google Maps. Please try again later.
        </div>
      </div>
    );

  if (!isLoaded) return <Loading />;

  const handleZoomChanged = () => {
    if (mapRef.current) {
      setZoom(mapRef.current.getZoom() || 10);
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options={mapOptions}
      onLoad={(map) => {
        mapRef.current = map;
      }}
      onZoomChanged={handleZoomChanged}
    >
      {drivers.map(
        (driver) =>
          driver.location && (
            <Marker
              key={driver.id}
              title={`${driver.firstName} ${driver.surName}`}
              position={{
                lat: driver.location.lat,
                lng: driver.location.lng,
              }}
              label={
                zoom >= 13
                  ? {
                    text: `${driver.firstName} ${driver.surName}`,
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }
                  : undefined
              }
              icon={
                zoom >= 13
                  ? {
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    labelOrigin: new window.google.maps.Point(15, -10),
                  }
                  : undefined
              }
            />
          )
      )}
    </GoogleMap>
  );
};
