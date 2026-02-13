"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMemo, useRef, useState } from "react";
import { Loading } from "./Loading";
import { createCircularMarker } from "@/app/utils/createCircularMarker";
import { containerStyle, center, mapOptions } from "@/app/utils/mapUtils";
import { useDrivers } from "@/hooks/useDrivers";
import { Driver } from "@/types/drivers";

export const MapView = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const { data: drivers = [], isLoading } = useDrivers();

  const [zoom, setZoom] = useState(10);
  const mapRef = useRef<google.maps.Map | null>(null);
  const avatarCacheRef = useRef<Map<string, string>>(new Map());

  /* -------- AVATAR LOADER (LAZY + CACHED) -------- */
  const loadAvatar = async (driver: Driver) => {
    const fileName = driver.personalRequirements?.profilePicture?.name;
    if (!fileName) return undefined;

    if (avatarCacheRef.current.has(driver._id)) {
      return avatarCacheRef.current.get(driver._id);
    }

    try {
      const res = await fetch(
        `/api/photo-url?filename=${encodeURIComponent(fileName)}`
      );
      if (!res.ok) return undefined;

      const { url } = await res.json();
      if (!url) return undefined;

      const circular = await createCircularMarker(url, 55, "#008000");
      avatarCacheRef.current.set(driver._id, circular);

      return circular;
    } catch {
      return undefined;
    }
  };

  /* -------- MARKERS (MEMOIZED) -------- */
  const markers = useMemo(() => {
    if (!isLoaded || typeof window === "undefined") return [];

    return drivers
      .filter((d) => d.location)
      .map((driver) => ({
        driver,
        label:
          zoom >= 13
            ? {
              text: `${driver.firstName.toUpperCase()} ${driver.surName.toUpperCase()}`,
              color: "black",
              fontSize: "14px",
              fontWeight: "bold",
            }
            : undefined,
      }));
  }, [drivers, zoom, isLoaded]);

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-red-600">Failed to load Google Maps</span>
      </div>
    );
  }

  if (!isLoaded || isLoading) return <Loading />;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options={mapOptions}
      onLoad={(map) => { mapRef.current = map; }}
      onZoomChanged={() =>
        mapRef.current && setZoom(mapRef.current.getZoom() ?? 10)
      }
    >
      {markers.map(({ driver, label }) => (
        <Marker
          key={driver._id}
          position={{
            lat: driver.location!.lat,
            lng: driver.location!.lng,
          }}
          label={label}
          title={`${driver.firstName} ${driver.surName}`}
          onLoad={async (marker) => {
            const avatar = await loadAvatar(driver);
            if (!avatar) return;

            marker.setIcon({
              url: avatar,
              scaledSize: new window.google.maps.Size(40, 40),
              anchor: new window.google.maps.Point(20, 20),
              labelOrigin: new window.google.maps.Point(20, 50),
            });
          }}
        />
      ))}
    </GoogleMap>
  );
};
