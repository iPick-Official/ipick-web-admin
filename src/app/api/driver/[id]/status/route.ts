import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Read statusDto from body
    const statusDto = await req.json();

    // Get secure token from cookies
    const token = (await cookies()).get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    // Call your NestJS backend
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "x-api-key": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statusDto),
      }
    );

    if (!backendRes.ok) {
      const errorData = await backendRes.json().catch(() => null);
      return NextResponse.json(errorData || { message: "Backend error" }, {
        status: backendRes.status,
      });
    }

    // Stream backend response
    const stream = backendRes.body;
    if (!stream) {
      return NextResponse.json(
        { message: "No data from backend" },
        { status: 500 }
      );
    }

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating driver status:", error);
    return NextResponse.json(
      { message: "Failed to update driver status" },
      { status: 500 }
    );
  }
}
