import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get("access_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/register`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const data = await backendRes.json();

    return NextResponse.json(
      backendRes.ok
        ? { message: "Registration successful", admin: data.admin }
        : { message: data.message || "Registration failed" },
      { status: backendRes.ok ? 201 : backendRes.status },
    );
  } catch (err) {
    console.error("Register API error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
