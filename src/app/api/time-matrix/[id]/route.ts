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
    const body = await req.json();

    // Determine action: edit info or change password
    // For example, if body contains newPassword => change password
    const endpoint = body.newPassword ? "change-password" : "edit-information";

    // Get token from cookies
    const token = (await cookies()).get("access_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Call NestJS backend
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/${id}/${endpoint}`,
      {
        method: "PATCH",
        headers: {
          "x-api-key": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!backendRes.ok) {
      const errorData = await backendRes.json().catch(() => null);
      return NextResponse.json(errorData || { message: "Backend error" }, {
        status: backendRes.status,
      });
    }

    const data = await backendRes.json().catch(() => null);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error updating admin:", error);
    return NextResponse.json(
      { message: "Failed to update admin" },
      { status: 500 }
    );
  }
}
