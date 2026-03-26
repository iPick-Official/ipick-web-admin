import { useEffect, useState } from "react";

const avatarCache = new Map<string, string>();

export function useAvatarUrl(filename?: string | null) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!filename || filename.startsWith("blob:")) {
      setAvatarUrl(null);
      return;
    }

    // ✅ Return cached value immediately
    if (avatarCache.has(filename)) {
      setAvatarUrl(avatarCache.get(filename)!);
      return;
    }

    let cancelled = false;

    const fetchAvatar = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/photo-url?filename=${encodeURIComponent(filename)}`,
        );

        if (!res.ok) throw new Error("Failed to fetch avatar");

        const data = await res.json();

        if (!cancelled) {
          avatarCache.set(filename, data.url);
          setAvatarUrl(data.url);
        }
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
