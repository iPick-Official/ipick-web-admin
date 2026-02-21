export interface Place {
  nick?: string | null;
  type: string; // e.g., "Point"
  name: string;
  coordinates: [number, number]; // [latitude, longitude]
  notes: string;
}

export interface Riders {
  _id: string;
  id: string;
  name: string;
  address: string;
  mobnum: string;
  email: string;
  password: string;
  createdAt: string | null;
  updatedAt: string;
  isLogged: boolean;
  authToken?: string;
  fcmToken?: string;
  type?: string; // e.g., "rider"
  places?: Place[];
  messages?: any[];
  rideHistory?: any[];
}
