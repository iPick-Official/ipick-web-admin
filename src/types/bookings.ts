export interface Booking {
  _id: string;
  riderId: string;
  driverId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  travelFare: number;
  origin: { name: string };
  destination: { name: string };
  computations: {
    baseFare: number;
    serviceFee: number;
    fareDistanceInKM: number;
    fareDurationInMins: number;
    costPerKM: number;
    costPerMin: number;
  };
  riderRating: { rating: number; comments: string };
  driverRating: { rating: number; comments: string };
  tripStatus: number;
  referenceNumber: string;
}
