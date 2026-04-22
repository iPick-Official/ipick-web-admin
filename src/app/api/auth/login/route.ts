import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      },
    );

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Invalid login" },
        { status: backendRes.status },
      );
    }

    const user = data.user;

    const res = NextResponse.json({
      message: "Login successful",
      user,
    });

    // Save secure access token
    res.cookies.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    // Save user data (client-accessible)
    res.cookies.set("admin", JSON.stringify(user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
