import { useEffect, useState } from "react";

/** Extract filename or key */
function extractFileName(input?: string | null) {
  if (!input) return null;

  // already a filename
  if (!input.startsWith("http")) return input;

  try {
    const url = new URL(input);
    return url.pathname.split("/").pop() ?? null;
  } catch {
    return null;
  }
}

export function useSignedS3Url(rawKey?: string | null) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const filename = extractFileName(rawKey);

  useEffect(() => {
    const fetchPhotoUrl = async () => {
      if (!filename) {
        setSignedUrl(null);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          `/api/photo-url?filename=${encodeURIComponent(filename)}`,
          { cache: "no-store" } // Next.js safety
        );

        const data = await res.json();
        setSignedUrl(data.url ?? null);
      } catch (err) {
        console.error("Failed to fetch photo URL:", err);
        setSignedUrl(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoUrl();
  }, [filename]);

  return { signedUrl, loading };
}
