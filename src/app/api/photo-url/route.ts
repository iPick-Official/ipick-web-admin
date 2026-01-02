import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json({ message: "Missing filename" }, { status: 400 });
  }

  try {
    const apiRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/files/url?filename=${encodeURIComponent(filename)}`
    );

    if (!apiRes.ok) {
      throw new Error("Backend fetch failed");
    }

    const data = await apiRes.json();
    return NextResponse.json({ url: data.url });
  } catch (error) {
    console.error("Photo URL API error:", error);
    return NextResponse.json(
      { message: "Failed to fetch photo URL" },
      { status: 500 }
    );
  }
}
