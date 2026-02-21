export interface Coordinates {
  0: number; // latitude
  1: number; // longitude
}

export interface Location {
  name: string;
  type: string;
  coordinates: Coordinates;
}

export interface Rating {
  rating: number;
  comments: string;
}

export interface Computations {
  baseFare: number;
  serviceFee: number;
  fareDistanceInKM: number;
  fareDurationInMins: number;
  costPerKM: number;
  costPerMin: number;
  // Optional: totalFare can also be computed
}

export interface Booking {
  _id: string;
  riderId: string;
  driverId: string | null;
  referenceNumber: string;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  travelFare: number;
  origin: Location;
  destination: Location;
  computations: Computations;
  riderRating: Rating[];
  driverRating: Rating[];
  tripStatus: number;
  notes?: string;
  seatType?: string;
  paymentMethod?: string;
  systemShare?: number;
  discount?: number;
  pickupFare?: number;
}
