export interface TnvsConfigItem {
  _id: string;
  id: string;
  seaterCapacity: number;
  baseFare: number;
  perKilometer: number;
  perMinute: number;
  addStopBaseFare: number;
  maxSurge: number;
  status: number; // 0 | 1
  timestamp: string;
  createdBy: string;
  updatedAt?: string;
  modifiedBy?: string;
}
