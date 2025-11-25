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

export interface Message {
  _id: string;
  bookingId: string;
  riderId: string;
  driverId: string;
  msg: string;
  sender: "driver" | "rider";
  createdAt: string;
  updatedAt: string;
}

export interface DriverDataResponse {
  driver: {
    history: Ride[];
    messages: Message[];
  };
}
