import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * Handles API responses and clears cookies if unauthorized (401)
 * @param res Fetch Response from backend
 * @returns NextResponse to send to client
 */
export async function handleApiResponse(res: Response) {
  const cookieStore = await cookies();

  if (res.status === 401) {
    // Clear cookies on unauthorized
    const response = NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
    cookieStore.delete("access_token");
    cookieStore.delete("admin"); // optional
    return response;
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    return NextResponse.json(errorData || { message: "Backend error" }, {
      status: res.status,
    });
  }

  const stream = res.body;
  if (!stream) {
    return NextResponse.json(
      { message: "No data from backend" },
      { status: 500 },
    );
  }

  return new NextResponse(stream, {
    headers: { "Content-Type": "application/json" },
  });
}
