"use client";

import { Driver } from "@/types/drivers";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState, useRef } from "react";
import { Loading } from "./Loading";
import { getSignedUrlClient } from "@/lib/uploadService";
import { createCircularMarker } from "@/app/utils/createCircularMarker";
import { containerStyle, center, mapOptions } from "@/app/utils/mapUtils";

export const MapView = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [avatars, setAvatars] = useState<Record<string, string>>({});
  const [zoom, setZoom] = useState(10); // initial zoom
  const mapRef = useRef<google.maps.Map | null>(null);

  // Fetch drivers
  useEffect(() => {
    async function fetchDrivers() {
      try {
        const res = await fetch("/api/driver");
        if (!res.ok) throw new Error("Failed to fetch drivers");

        const data: Driver[] = await res.json();
        const approvedLoggedDrivers = data.filter(
          (driver) => driver.status === "approved" && driver.isLogged
        );

        setDrivers(approvedLoggedDrivers);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDrivers();
  }, []);

  // Fetch avatars concurrently
  useEffect(() => {
    if (!drivers.length) return;

    const fetchAvatars = async () => {
      const avatarEntries = await Promise.all(
        drivers.map(async (driver) => {
          const raw = driver.personalRequirements?.profilePicture?.url;
          if (!raw) return null;

          try {
            const signedUrl = await getSignedUrlClient(raw);
            if (!signedUrl) return null;

            const circular = await createCircularMarker(signedUrl, 55, "#2ecc71");
            return [driver._id, circular] as [string, string];
          } catch (err) {
            console.error(`Failed to load avatar for driver ${driver._id}:`, err);
            return null;
          }
        })
      );

      // Filter out failed entries and convert to object
      const avatarMap: Record<string, string> = Object.fromEntries(
        avatarEntries.filter((e): e is [string, string] => e !== null)
      );

      setAvatars(avatarMap);
    };

    fetchAvatars();
  }, [drivers]);

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
        mapRef.current = map; // assign the map
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
              icon={
                avatars[driver._id]
                  ? {
                    url: avatars[driver._id], // circular avatar
                    scaledSize: new window.google.maps.Size(40, 40),
                    anchor: new window.google.maps.Point(27, 27),
                    labelOrigin: new window.google.maps.Point(27, 60),
                  }
                  : undefined // default Google Maps pin
              }
              label={
                zoom >= 13 && avatars[driver._id]
                  ? {
                    text: `${driver.firstName.toUpperCase()} ${driver.surName.toUpperCase()}`,
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }
                  : undefined
              }
            />
          )
      )}
    </GoogleMap>
  );
};
