"use client";

import { Driver } from "@/types/drivers";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState, useRef } from "react";
import { Loading } from "./Loading";
import { createCircularMarker } from "@/app/utils/createCircularMarker";
import { containerStyle, center, mapOptions } from "@/app/utils/mapUtils";
import { fetchSignedS3Url } from "@/hooks/useSignedS3Url";

export const MapView = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [avatars, setAvatars] = useState<Record<string, string>>({});
  const [zoom, setZoom] = useState(10);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const res = await fetch("/api/driver");
        if (!res.ok) throw new Error("Failed to fetch drivers");

        const data: Driver[] = await res.json();
        const approvedLoggedDrivers = data.filter(
          (driver) => driver.status === "approved" && driver.isLogged === true
        );

        setDrivers(approvedLoggedDrivers);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDrivers();
  }, []);

  useEffect(() => {
    if (!drivers.length) return;

    const fetchAvatars = async () => {
      const avatarEntries = await Promise.all(
        drivers.map(async (driver) => {
          const raw = driver.personalRequirements?.profilePicture?.url;
          if (!raw) return null;

          try {
            const signedUrl = await fetchSignedS3Url(raw);
            if (!signedUrl) return null;

            const circular = await createCircularMarker(signedUrl, 55, "#008000");
            return [driver._id, circular] as [string, string];
          } catch (err) {
            // console.error(`Failed to load avatar for driver ${driver._id}:`, err);
            return null;
          }
        })
      );

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
      onLoad={(map) => { mapRef.current = map; }}
      onZoomChanged={handleZoomChanged}
    >
      {drivers.map(
        (driver) =>
          driver.location && (
            <Marker
              key={driver._id}
              title={`${driver.firstName} ${driver.surName}`}
              position={{
                lat: driver.location.lat,
                lng: driver.location.lng,
              }}
              icon={
                avatars[driver._id]
                  ? {
                    url: avatars[driver._id],
                    scaledSize: new window.google.maps.Size(40, 40),
                    anchor: new window.google.maps.Point(20, 20),
                    labelOrigin: new window.google.maps.Point(20, 50),
                  }
                  : undefined
              }
              label={
                zoom >= 13
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
