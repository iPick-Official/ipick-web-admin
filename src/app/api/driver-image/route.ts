import { NextResponse } from "next/server";
import { getPrivateFileUrl } from "@/lib/uploadService";
import type { NextApiRequest, NextApiResponse } from "next";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const key = req.query.key as string;
  if (!key) return res.status(400).json({ error: "Missing 'key'" });

  try {
    const signedUrl = await getPrivateFileUrl(key);
    res.status(200).json({ signedUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate signed URL" });
  }
}
