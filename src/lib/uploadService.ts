// lib/uploadService.ts
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucket = process.env.NEXT_AWS_S3_BUCKET!;
const region = process.env.NEXT_AWS_REGION!;
const accessKeyId = process.env.NEXT_AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.NEXT_AWS_SECRET_ACCESS_KEY!;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function uploadFileToS3(
  key: string,
  content: Buffer,
  contentType: string
) {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: content,
    ContentType: contentType,
  });

  await s3Client.send(command);

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

export async function getPrivateFileUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}
