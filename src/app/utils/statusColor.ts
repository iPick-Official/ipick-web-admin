export const STATUS_COLORS: Record<string, string> = {
  // Driver statuses
  approved: "text-green-600",
  pending: "text-yellow-600",
  rejected: "text-red-600",

  // Booking statuses
  finished: "text-green-600",
  active: "text-blue-600",
  cancelled: "text-red-600",
  booked: "text-yellow-600",
};

export const getStatusColor = (status: string) =>
  STATUS_COLORS[status.toLowerCase()] ?? "text-gray-500";
