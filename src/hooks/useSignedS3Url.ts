import { useEffect, useState } from "react";

const DEBOUNCE_MS = 300;

/** Extract key from a full S3 URL */
function extractS3Key(input: string | null | undefined) {
  if (!input) return null;

  if (!input.startsWith("http")) return input;

  try {
    const url = new URL(input);
    const key = url.pathname;
    return key.startsWith("/") ? key.slice(1) : key;
  } catch {
    return input;
  }
}

export function useSignedS3Url(rawKey: string | null | undefined) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const key = extractS3Key(rawKey);

  useEffect(() => {
    // If there's no key → reset state and stop
    if (!key) {
      setSignedUrl(null);
      setLoading(false);
      setError(null);
      return;
    }

    let isCancelled = false;
    const timer = setTimeout(() => {
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
          if (isCancelled) return;

          if (data.url) {
            setSignedUrl(data.url);
          } else {
            setError("Failed to generate signed URL");
          }
        } catch {
          if (!isCancelled) setError("Error fetching signed URL");
        } finally {
          if (!isCancelled) setLoading(false);
        }
      };

      fetchUrl();
    }, DEBOUNCE_MS);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [key]);

  return { signedUrl, loading, error };
}

export async function fetchSignedS3Url(
  rawKey: string | null | undefined
): Promise<string | null> {
  if (!rawKey) return null;

  const key = extractS3Key(rawKey);
  if (!key) return null;

  try {
    const res = await fetch("/api/driver-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });

    const data = await res.json();
    return data.url || null;
  } catch (err) {
    console.error("Error fetching signed URL:", err);
    return null;
  }
}
