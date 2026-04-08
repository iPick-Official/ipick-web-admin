import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json({ message: "Missing filename" }, { status: 400 });
  }

  // Strip S3 URL if accidentally passed
  if (filename.startsWith("http")) {
    filename = filename.split(".amazonaws.com/")[1];
  }

  try {
    const apiRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL_S3
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
