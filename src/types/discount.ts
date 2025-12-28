export interface Discounts {
  _id: string;
  riderId: string;
  name: string;
  photoUrl: string;
  reviewedBy: string;
  idNumber: string;
  status: string;
  idType: string;
  reason?: string;
  expirationDate: string;
  createdAt: string | null;
  updatedAt: string | null;
}
