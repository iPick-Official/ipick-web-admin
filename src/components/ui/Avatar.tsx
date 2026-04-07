import Image from "next/image";
import { useAvatarUrl } from "@/hooks/useAvatarUrl";

type AvatarProps = {
    photoUrl?: string | null; // filename OR blob URL
    size?: number;
    alt?: string;
    directUrl?: boolean;
};

const DEFAULT_AVATAR = "/logo.png";

export function Avatar({
    photoUrl,
    size = 96,
    alt = "Avatar",
    directUrl = false,
}: AvatarProps) {
    const { avatarUrl, loading } = useAvatarUrl(
        !directUrl && photoUrl ? photoUrl : null
    );

    const src = directUrl
        ? photoUrl || DEFAULT_AVATAR
        : avatarUrl || DEFAULT_AVATAR;

    return (
        <div
            className="rounded-full overflow-hidden border bg-gray-100 dark:bg-zinc-800"
            style={{ width: size, height: size }}
        >
            {loading && !src ? (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                    Loading…
                </div>
            ) : directUrl ? (
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            ) : (
                <Image
                    src={src}
                    alt={alt}
                    width={size}
                    height={size}
                    className="w-full h-full object-cover rounded-full"
                    unoptimized
                />
            )}
        </div>
    );
}