interface Location {
  name: string;
  type: string;
  coordinates: number[];
}

interface Computations {
  baseFare: number;
  serviceFee: number;
  fareDistanceInKM: number;
  fareDurationInMins: number;
  costPerKM: number;
  costPerMin: number;
}

interface Ride {
  _id: string;
  riderId: string;
  driverId: string;
  origin: Location;
  destination: Location;
  travelFare: number;
  status: string;
  timestamp: string;
  computations: Computations;
}

export interface RideHistory {
  driver: Ride[];
}
