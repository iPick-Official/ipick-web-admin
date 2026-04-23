import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { handleApiResponse } from "@/app/utils/api";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      cookieStore.delete("access_token");
      cookieStore.delete("refresh_token");

      return NextResponse.json(
        { message: "Unauthorized: No token found" },
        { status: 401 },
      );
    }

    const { id } = await context.params;
    const body = await request.json();
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/${id}/status`,
      {
        method: "PATCH", // 👈 changed
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // 👈 required for PATCH
      },
    );

    return handleApiResponse(backendRes);
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      { message: "Failed to update status" },
      { status: 500 },
    );
  }
}
