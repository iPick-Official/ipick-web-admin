import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucket = process.env.NEXT_AWS_S3_BUCKET!;
const region = process.env.NEXT_AWS_REGION!;
const accessKeyId = process.env.NEXT_AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.NEXT_AWS_SECRET_ACCESS_KEY!;

const s3Client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });

  try {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return NextResponse.json({ signedUrl: url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate signed URL" },
      { status: 500 }
    );
  }
}
