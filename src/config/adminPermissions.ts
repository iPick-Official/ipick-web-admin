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

  technology_product: {
    sections: ["Fare Matrix Management"],
    paths: ["/admin/profile"],
  },

  marketing_growth: {
    sections: ["Finance"],
    paths: ["/admin/profile"],
  },

  finance_legal: {
    sections: ["Finance"],
    paths: ["/admin/profile"],
  },

  hr_people: {
    sections: ["Finance"],
    paths: ["/admin/profile"],
  },
} as const;
