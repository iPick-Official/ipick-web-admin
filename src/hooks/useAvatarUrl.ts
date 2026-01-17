import { useEffect, useState } from "react";

export function useAvatarUrl(photoUrl?: string | null) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!photoUrl) {
      setAvatarUrl(null);
      return;
    }

    // Extract S3 key if a full URL is provided
    const filename = photoUrl.startsWith("http")
      ? photoUrl.split(".amazonaws.com/")[1]
      : photoUrl;

    const fetchAvatar = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/photo-url?filename=${encodeURIComponent(filename)}`
        );

        if (!res.ok) throw new Error("Failed to fetch avatar");

        const data = await res.json();
        setAvatarUrl(data.url);
      } catch {
        setAvatarUrl(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAvatar();
  }, [photoUrl]);

  return { avatarUrl, loading };
}
