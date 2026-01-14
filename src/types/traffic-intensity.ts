export interface TrafficIntensityItem {
  _id: string;
  id: string;
  intensityLevel: string;
  isPeakHour: number;
  surchargeRate: string; // "0.05"
  status: string;
  timestamp: string;
  createdBy: string;
  updatedAt?: string;
  modifiedBy?: string;
}
