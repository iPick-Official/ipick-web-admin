import { useEffect, useState } from "react";

/** Extract filename or key */
function extractFileName(input?: string | null) {
  if (!input) return null;

  if (!input.startsWith("http")) return input;

  try {
    const url = new URL(input);
    return url.pathname.split("/").pop() ?? null;
  } catch {
    return null;
  }
}

const signedUrlCache = new Map<string, string>();

export function useSignedS3Url(rawKey?: string | null) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const filename = extractFileName(rawKey);

  useEffect(() => {
    if (!filename) {
      setSignedUrl(null);
      return;
    }

    if (signedUrlCache.has(filename)) {
      setSignedUrl(signedUrlCache.get(filename)!);
      return;
    }

    let cancelled = false;

    const fetchPhotoUrl = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/photo-url?filename=${encodeURIComponent(filename)}`,
          { cache: "no-store" },
        );

        if (!res.ok) throw new Error("Failed request");

        const data = await res.json();

        if (!cancelled) {
          const url = data.url ?? null;

          if (url) {
            signedUrlCache.set(filename, url);
          }

          setSignedUrl(url);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to fetch photo URL:", err);
          setSignedUrl(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPhotoUrl();

    return () => {
      cancelled = true;
    };
  }, [filename]);

  return { signedUrl, loading };
}
