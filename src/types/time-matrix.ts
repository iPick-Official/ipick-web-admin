export interface TimeMatrixItem {
  _id: string;
  id: string;
  rangeTimeFrom: string; // minutes
  rangeTimeTo: string; // minutes
  tTime: number; // total time
  status: number; // 0 | 1
  createdOn: string;
  createdBy: string;
  updatedAt?: string;
  modifiedBy?: string;
}
