import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { handleApiResponse } from "@/app/utils/api";

export async function POST(request: Request) {
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

    const body = await request.json();

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    return handleApiResponse(backendRes);
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      { message: "Failed to process request" },
      { status: 500 },
    );
  }
}
