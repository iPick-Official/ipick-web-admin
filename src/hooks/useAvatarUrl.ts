import { useEffect, useState } from "react";

export function useAvatarUrl(filename?: string | null) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!filename) {
      setAvatarUrl(null);
      return;
    }
    if (filename.startsWith("blob:")) {
      setAvatarUrl(null);
      return;
    }

    let cancelled = false;

    const fetchAvatar = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/photo-url?filename=${encodeURIComponent(filename)}`
        );

        if (!res.ok) throw new Error("Failed to fetch avatar");

        const data = await res.json();

        if (!cancelled) setAvatarUrl(data.url);
      } catch {
        if (!cancelled) setAvatarUrl(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAvatar();

    return () => {
      cancelled = true;
    };
  }, [filename]);

  return { avatarUrl, loading };
}
