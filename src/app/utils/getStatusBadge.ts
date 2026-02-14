export const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400";
    case "rejected":
      return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400";
    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  }
};
