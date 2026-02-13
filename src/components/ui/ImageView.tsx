import { XMarkIcon } from "@heroicons/react/20/solid";
import { ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ImageViewProps {
    isOpen: boolean;
    imageUrl?: string | null;
    alt?: string;
    onClose: () => void;
}

const ImageView: React.FC<ImageViewProps> = ({
    isOpen,
    imageUrl,
    alt = "",
    onClose,
}) => {
    const [zoom, setZoom] = useState<number>(1);

    useEffect(() => {
        if (!isOpen) setZoom(1);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
                <button
                    className="p-2 bg-gray-700 bg-opacity-70 rounded hover:bg-opacity-90"
                    onClick={() => setZoom((z) => z + 0.1)}
                    title="Zoom In"
                >
                    <ZoomInIcon className="w-6 h-6 text-white" />
                </button>

                <button
                    className="p-2 bg-gray-700 bg-opacity-70 rounded hover:bg-opacity-90"
                    onClick={() => setZoom((z) => Math.max(0.1, z - 0.1))}
                    title="Zoom Out"
                >
                    <ZoomOutIcon className="w-6 h-6 text-white" />
                </button>

                <button
                    className="p-2 bg-red-600 bg-opacity-80 rounded hover:bg-opacity-100"
                    onClick={onClose}
                    title="Close"
                >
                    <XMarkIcon className="w-6 h-6 text-white" />
                </button>
            </div>

            {/* Image */}
            <div className="flex items-center justify-center w-full h-full overflow-hidden">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={alt}
                        style={{
                            transform: `scale(${zoom})`,
                            transition: "transform 0.2s ease-in-out",
                            maxHeight: "90vh",
                            maxWidth: "90vw",
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default ImageView;
