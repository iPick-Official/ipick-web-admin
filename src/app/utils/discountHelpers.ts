// utils/discountHelpers.ts

export const getAdminFromCookie = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; admin=`);

  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift();
    if (cookieValue) {
      return JSON.parse(decodeURIComponent(cookieValue));
    }
  }

  return null;
};

export const updateDiscountStatusRequest = async ({
  id,
  status,
  reason,
}: {
  id: string;
  status: "approved" | "rejected";
  reason?: string;
}) => {
  const admin = getAdminFromCookie();

  const reviewedBy =
    admin?.firstName && admin?.lastName
      ? `${admin.firstName} ${admin.lastName}`
      : "unknown";

  const res = await fetch(`/api/discount/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
      reviewedBy,
      reason,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to update discount status");
  }

  return { reviewedBy };
};
