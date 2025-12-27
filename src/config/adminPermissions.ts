// src/config/adminPermissions.ts
export const ADMIN_PERMISSIONS = {
  executive_leadership: {
    sections: "ALL",
    paths: "ALL",
  },

  operations: {
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

  finance_legal: {
    sections: ["Finance"],
    paths: ["/admin/finance"],
  },
} as const;
