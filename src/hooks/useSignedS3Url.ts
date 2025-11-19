import { useEffect, useState } from "react";

const signedUrlCache = new Map<string, string>();

/** Extract key from a full S3 URL */
function extractS3Key(input: string | null | undefined) {
  if (!input) return null;

  // Already a key
  if (!input.startsWith("http")) return input;

  try {
    const url = new URL(input);
    let key = url.pathname;
    return key.startsWith("/") ? key.slice(1) : key;
  } catch {
    return input;
  }
}

export function useSignedS3Url(rawKey: string | null | undefined) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!rawKey) return;

    const key = extractS3Key(rawKey);
    if (!key) return;

    // ✔ 1. Return immediately if cached
    if (signedUrlCache.has(key)) {
      setSignedUrl(signedUrlCache.get(key)!);
      return;
    }

    const fetchUrl = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/driver-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key }),
        });

        const data = await res.json();

        if (data.url) {
          // ✔ 2. Cache it
          signedUrlCache.set(key, data.url);
          setSignedUrl(data.url);
        } else {
          setError("Failed to generate signed URL");
        }
      } catch (err) {
        setError("Error fetching signed URL");
      } finally {
        setLoading(false);
      }
    };

    fetchUrl();
  }, [rawKey]);

  return { signedUrl, loading, error };
}
