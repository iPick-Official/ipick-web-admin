import { NextResponse } from "next/server";
import { getPrivateFileUrl } from "@/lib/uploadService";

export async function POST(req: Request) {
  const { key } = await req.json();

  if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });

  try {
    const url = await getPrivateFileUrl(key);
    return NextResponse.json({ url });
  } catch (e) {
    console.error("Signed URL error:", e);
    return NextResponse.json(
      { error: "Failed to get signed URL" },
      { status: 500 }
    );
  }
}
