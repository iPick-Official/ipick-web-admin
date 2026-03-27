export const containerStyle = {
  width: "100%",
  height: "100%",
};

export const center = {
  lat: 14.5995,
  lng: 120.9842,
};

export const PHILIPPINES_BOUNDS = {
  north: 21.321,
  south: 4.393,
  west: 116.87,
  east: 126.6,
};

export const mapOptions = {
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
  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || "4bc0535556f8db1a820",
};
