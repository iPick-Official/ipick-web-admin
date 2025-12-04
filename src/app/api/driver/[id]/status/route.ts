import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    // Resolve params if it's a Promise
    const resolvedParams = await context.params;
    const { id } = resolvedParams;

    // Parse JSON body
    const statusDto = await req.json();

    // Get token from cookies
    const token = (await cookies()).get("access_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Call NestJS backend
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

    const stream = backendRes.body;
    if (!stream) {
      return NextResponse.json(
        { message: "No data from backend" },
        { status: 500 }
      );
    }

    return new NextResponse(stream, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating driver status:", error);
    return NextResponse.json(
      { message: "Failed to update driver status" },
      { status: 500 }
    );
  }
}
