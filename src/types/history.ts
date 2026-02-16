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

export interface Ride {
  _id: string;
  riderId: string;
  driverId: string;
  origin: Location;
  destination: Location;
  travelFare: number;
  status: string;
  updatedAt: string;
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

export type DriverDataResponse = {
  driver?: {
    history: Ride[];
    messages: Message[];
  };
};

export type Rides = {
  rideHistory?: {
    driver?: {
      history?: Ride[];
    };
  } | null;
};
