export interface Discounts {
  _id: string;
  riderId: string;
  name: string;

  photoUrl?: {
    name: string;
    url: string;
  };

  reviewedBy: string;
  idNumber: string;
  status: "pending" | "approved" | "rejected";
  idType: "student" | "senior" | "pwd";
  reason?: string;
  expirationDate: string;
  createdAt: string | null;
  updatedAt: string | null;
}
