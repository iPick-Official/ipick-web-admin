// Reusable file/document structure
export interface FileDocument {
  name: string;
  url: string;
}

// Vehicle Ownership
export interface VehicleOwnership {
  ownershipId: string;
  description: string;
  operatorsFullName: string;
  operatorsAddress: string;
  operatorsMobileNumber: string;
  operatorDocuments: FileDocument;
}

// Personal Requirements
export interface PersonalRequirements {
  profilePicture: FileDocument;
  nationality: string;
  pwd: number;
  pwdFile: FileDocument;
  vaccinationCertificate: FileDocument;
  vaccinationCertificateConsent: boolean;
  emergencyContactName: string;
  emergencyContactAddress: string;
  emergencyContactMobNum: string;
  emergencyRelationship: string;
  driverLicenseFront: FileDocument;
  driverLicenseBack: FileDocument;
  driverLicenseNumber: string;
  driverLicenseExpDate: string;
  documentType: string;
  documentImg: FileDocument;
  privacyNotice: boolean;
  codeOfConduct: boolean;
  termsOfService: boolean;
  declarations: boolean;
}

// Transport Requirements
export interface TransportRequirements {
  vehicleOwnership: VehicleOwnership;
  plateNumber: string;
  orNumber: string;
  crNumber: string;
  carColor: string;
  carBrand: string;
  carModel: string;
  ownerDocuments: FileDocument;
  operatorsDocument: FileDocument;
  vehicleOR: FileDocument;
  vehicleCR: FileDocument;
  vehicleSalesInvoice: FileDocument;
  authorizationLetterPageOne: FileDocument;
  authorizationLetterPageTwo: FileDocument;
  sPAPageOne: FileDocument;
  sPAPageTwo: FileDocument;
  ltfrbDocType: string;
  pAPageOne: FileDocument;
  pAPageTwo: FileDocument;
  cPCPageOne: FileDocument;
  cPCPageTwo: FileDocument;
  mEPAPageOne: FileDocument;
  mEPAPageTwo: FileDocument;
  pAMI: FileDocument;
}

// Wallet Transaction Log
export interface WalletLog {
  _id: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  bookingId: string;
  userId: string;
  userType: "driver" | "user" | string;
  description: string;
}

// Driver Structure
export interface Driver {
  _id: string;
  id: string;
  name: string;
  firstName: string;
  surName: string;
  address: string;
  city: string;
  province: string;
  zipCode: string;
  mobnum: string;
  email: string;
  password: string;
  referralCode: string;
  createdAt: string | null;
  status: "pending" | "approved" | "rejected" | string;
  type: "driver";
  carType: string;
  zone: string;
  personalRequirements: PersonalRequirements;
  transportRequirements: TransportRequirements;
  authToken: string;
  isLogged: boolean;
  updatedAt: string | { $date: string };
  __v: number;
  messages: object[];
  places: object[];
  rideHistory: object[];
  fcmToken: string;
  location: {
    lat: number;
    lng: number;
  };
  updatedBy: string;
}

// Wallet Data
export interface Wallet {
  _id: string;
  walletBalance: number;
}

// Combined API Response
export interface DriverResponse {
  driver: Driver;
  wallet: Wallet;
  walletLogs: WalletLog[];
}

// Optional wallet on driver type
export interface DriverWithWallet extends Driver {
  wallet?: Wallet;
  walletLogs?: WalletLog[];
}
