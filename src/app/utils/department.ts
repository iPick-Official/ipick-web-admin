export const departments = [
  {
    id: "executive_leadership",
    name: "Executive / Leadership",
    roles: [
      { id: "ceo_founder", name: "CEO / Founder" },
      { id: "coo", name: "COO" },
      { id: "cto", name: "CTO" },
    ],
  },
  {
    id: "operations",
    name: "Operations",
    roles: [
      { id: "operations_manager", name: "Operations Manager" },
      { id: "driver_coordinator", name: "Driver Coordinator" },
      { id: "customer_support_agent", name: "Customer Support Agent" },
    ],
  },
  {
    id: "technology_product",
    name: "Technology / Product",
    roles: [
      { id: "mobile_app_developer", name: "Mobile App Developer" },
      { id: "backend_developer", name: "Backend Developer / API Engineer" },
      { id: "ui_ux_designer", name: "UI/UX Designer" },
      { id: "devops_engineer", name: "DevOps / Infrastructure Engineer" },
    ],
  },
  {
    id: "marketing_growth",
    name: "Marketing / Growth",
    roles: [
      { id: "marketing_manager", name: "Marketing Manager" },
      { id: "social_media_manager", name: "Social Media / Community Manager" },
      { id: "growth_hacker", name: "Growth Hacker" },
    ],
  },
  {
    id: "finance_legal",
    name: "Finance / Legal",
    roles: [
      { id: "accountant", name: "Accountant / Bookkeeper" },
      { id: "financial_analyst", name: "Financial Analyst" },
      { id: "legal_advisor", name: "Legal Advisor / Consultant" },
    ],
  },
  {
    id: "hr_people",
    name: "HR / People",
    roles: [{ id: "hr_manager", name: "HR Manager" }],
  },
  {
    id: "data_analytics",
    name: "Data & Analytics",
    roles: [{ id: "data_analyst", name: "Data Analyst / Scientist" }],
  },
];

export const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
  { value: "resigned", label: "Resigned" },
];
