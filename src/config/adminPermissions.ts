// src/config/adminPermissions.ts
export const ADMIN_PERMISSIONS = {
  Operations: {
    sections: ["Driver Management", "CRM"],
    paths: [
      "/admin/bookings",
      "/admin/drivers",
      "/admin/dashboard",
      "/admin/riders",
      "/admin/feedback",
      "/admin/reports",
      "/admin/profile",
    ],
  },

  Admin: {
    sections: "ALL",
    paths: "ALL",
  },

  Finance: {
    sections: ["Finance"],
    paths: ["/admin/finance"],
  },
} as const;
