import Papa from "papaparse";
import { saveAs } from "file-saver";
import { Booking } from "@/types/bookings";
import { DriverWithWallet } from "@/types/drivers";
import { Riders } from "@/types/riders";

export function exportBookingsToCSV(bookings: Booking[]) {
  const csv = Papa.unparse(
    bookings.map((booking) => ({
      "Booking ID": booking._id,
      "Reference Number": booking.referenceNumber,
      "Rider ID": booking.riderId,
      "Driver ID": booking.driverId,
      Timestamp: booking.timestamp,
      "Created At": booking.createdAt,
      "Updated At": booking.updatedAt,
      Status: booking.status,
      "Travel Fare": booking.travelFare,
      Origin: booking.origin?.name ?? "",
      Destination: booking.destination?.name ?? "",
      // Computations
      "Base Fare": booking.computations?.baseFare ?? 0,
      "Service Fee": booking.computations?.serviceFee ?? 0,
      "Fare Distance (KM)": booking.computations?.fareDistanceInKM ?? 0,
      "Fare Duration (Mins)": booking.computations?.fareDurationInMins ?? 0,
      "Cost per KM": booking.computations?.costPerKM ?? 0,
      "Cost per Min": booking.computations?.costPerMin ?? 0,
      // Ratings
      "Rider Rating": booking.riderRating?.rating ?? "",
      "Rider Comments": booking.riderRating?.comments ?? "",
      "Driver Rating": booking.driverRating?.rating ?? "",
      "Driver Comments": booking.driverRating?.comments ?? "",
      "Trip Status": booking.tripStatus,
    }))
  );

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "bookings-report.csv");
}

export function exportDriversToCSVWithPapa(drivers: DriverWithWallet[]) {
  const csv = Papa.unparse(
    drivers.map((driver) => ({
      // Basic Info
      Name: `${driver.firstName} ${driver.surName}`,
      "Email Address": driver.email,
      "Contact Number": driver.mobnum,
      Address: driver.address,
      City: driver.city,
      Province: driver.province,
      "ZIP Code": driver.zipCode,
      Status: driver.status,
      "Referral Code": driver.referralCode,
      "Created At": driver.createdAt,
      "Updated At": driver.updatedAt,
      // Personal Requirements (excluding documents)
      Nationality: driver.personalRequirements.nationality,
      PWD: driver.personalRequirements.pwd,
      "Vaccination Consent": driver.personalRequirements
        .vaccinationCertificateConsent
        ? "Yes"
        : "No",
      "Emergency Contact Name":
        driver.personalRequirements.emergencyContactName,
      "Emergency Contact Address":
        driver.personalRequirements.emergencyContactAddress,
      "Emergency Contact Number":
        driver.personalRequirements.emergencyContactMobNum,
      "Emergency Relationship":
        driver.personalRequirements.emergencyRelationship,
      "Privacy Notice": driver.personalRequirements.privacyNotice
        ? "Yes"
        : "No",
      "Code of Conduct": driver.personalRequirements.codeOfConduct
        ? "Yes"
        : "No",
      "Terms of Service": driver.personalRequirements.termsOfService
        ? "Yes"
        : "No",
      Declarations: driver.personalRequirements.declarations ? "Yes" : "No",
      // Transport Requirements (excluding documents)
      "Vehicle Ownership ID":
        driver.transportRequirements.vehicleOwnership.ownershipId,
      "Vehicle Description":
        driver.transportRequirements.vehicleOwnership.description,
      "Vehicle Operators Name":
        driver.transportRequirements.vehicleOwnership.operatorsFullName,
      "Vehicle Operators Address":
        driver.transportRequirements.vehicleOwnership.operatorsAddress,
      "Vehicle Operators Number":
        driver.transportRequirements.vehicleOwnership.operatorsMobileNumber,
      "Plate Number": driver.transportRequirements.plateNumber,
      "OR Number": driver.transportRequirements.orNumber,
      "CR Number": driver.transportRequirements.crNumber,
      "Car Color": driver.transportRequirements.carColor,
      "Car Brand": driver.transportRequirements.carBrand,
      "Car Model": driver.transportRequirements.carModel,
      // Wallet info if available
      "Wallet Balance": driver.wallet?.walletBalance ?? 0,
    }))
  );

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "drivers-report.csv");
}

export function exportRidersToCSV(riders: Riders[]) {
  const csv = Papa.unparse(
    riders.map((rider) => ({
      "Rider ID": rider.id,
      "Full Name": `${rider.firstName} ${rider.surName}`,
      "First Name": rider.firstName,
      Surname: rider.surName,
      Email: rider.email,
      "Contact Number": rider.mobnum,
      Address: rider.address,
      "Created At": rider.createdAt ?? "",
      "Is Logged In": rider.isLogged ? "Yes" : "No",
    }))
  );

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "riders-report.csv");
}
