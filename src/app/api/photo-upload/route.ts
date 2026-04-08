import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "Missing file" }, { status: 400 });
    }

    // Re-create form data to forward to backend
    const backendFormData = new FormData();
    backendFormData.append("file", file, file.name);

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_S3}/files/upload`,
      {
        method: "POST",
        body: backendFormData,
      }
    );

    if (!apiRes.ok) {
      const text = await apiRes.text();
      throw new Error(`Backend upload failed: ${text}`);
    }

    const data = await apiRes.json();

    return NextResponse.json({
      message: "Upload successful",
      ...data, // e.g. { filename, url }
    });
  } catch (error) {
    console.error("File upload API error:", error);
    return NextResponse.json(
      { message: "Failed to upload file" },
      { status: 500 }
    );
  }
}
