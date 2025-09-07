"use client";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

// Fullscreen container style
const containerStyle = {
  width: "100%",
  height: "100%",
};

// Approximate center of the Philippines
const center = {
  lat: 12.8797,
  lng: 121.7740,
};

// Bounds to restrict map view (Philippines area)
const PHILIPPINES_BOUNDS = {
  north: 21.321,     // northernmost island
  south: 4.393,      // southernmost island
  west: 116.87,      // westernmost
  east: 126.6,       // easternmost
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
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
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      stylers: [{ visibility: "off" }],
    },
  ],
};

export const MapView = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6.5} // good for whole PH view
      options={mapOptions}
    >
      {/* Children components (e.g., markers) go here */}
    </GoogleMap>
  );
};
