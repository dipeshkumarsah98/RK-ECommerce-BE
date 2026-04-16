import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { logger } from "./logger.js";

/**
 * R2 Storage client configuration
 */
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

/**
 * Generate a signed URL for a private R2 object
 * @param url - The full R2 URL (e.g., https://...r2.cloudflarestorage.com/bucket/key)
 * @param expiresIn - URL expiration time in seconds (default: 3600 = 1 hour)
 * @returns Presigned URL or null if parsing fails
 */
export async function getSignedR2Url(
  url: string,
  expiresIn: number = 3600,
): Promise<string | null> {
  const BUCKET_NAME = process.env.R2_BUCKET;

  if (!BUCKET_NAME) {
    logger.error({ url }, "R2_BUCKET environment variable is not set");
    return null;
  }

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: url,
    });

    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    logger.error({ error, url }, "Failed to generate signed URL");
    return null;
  }
}

/**
 * Generate signed URLs for multiple R2 objects
 * @param urls - Array of R2 URLs
 * @param expiresIn - URL expiration time in seconds (default: 3600 = 1 hour)
 * @returns Array of signed URLs (null for failed items)
 */
export async function getSignedR2Urls(
  urls: string[],
  expiresIn: number = 3600,
): Promise<(string | null)[]> {
  return Promise.all(urls.map((url) => getSignedR2Url(url, expiresIn)));
}

/**
 * Helper to safely generate signed URL, returning original URL on failure
 * @param url - The R2 URL to sign
 * @param expiresIn - URL expiration time in seconds (default: 3600 = 1 hour)
 * @returns Signed URL or original URL if signing fails
 */
export async function getSignedR2UrlOrFallback(
  url: string,
  expiresIn: number = 3600,
): Promise<string> {
  const signedUrl = await getSignedR2Url(url, expiresIn);
  return signedUrl || url;
}
