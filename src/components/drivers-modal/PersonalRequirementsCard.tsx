import React, { useState } from "react";
import { PersonalRequirements } from "@/types/drivers"; // <-- use your actual type
import { Detail } from "../ui/Details";
import ImageView from "../ui/ImageView";

type SignedUrls = {
    pwdFile?: string | null;
    vaccinationCert?: string | null;
    driverLicenseFront?: string | null;
    driverLicenseBack?: string | null;
    otherDoc?: string | null;
};

type Props = {
    personalRequirements: PersonalRequirements | null | undefined;
    signedUrls: SignedUrls;
};

const PersonalRequirementsCard: React.FC<Props> = ({
    personalRequirements,
    signedUrls,
}) => {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [isImageOpen, setIsImageOpen] = useState(false);

    if (!personalRequirements) return null;

    const details = [
        {
            label: "Nationality",
            value: personalRequirements.nationality || "-",
        },
        {
            label: "PWD",
            value: personalRequirements.pwd === 1 ? "Yes" : "No",
        },
        {
            label: "Emergency Contact",
            value: personalRequirements.emergencyContactName || "-",
        },
        {
            label: "License Number",
            value: personalRequirements.driverLicenseNumber || "-",
        },
        {
            label: "License Expiry",
            value: personalRequirements.driverLicenseExpDate || "-",
        },
    ];

    const files = [
        { label: "PWD File", signedUrl: signedUrls.pwdFile },
        { label: "Vaccination Certificate", signedUrl: signedUrls.vaccinationCert },
        { label: "Driver License Front", signedUrl: signedUrls.driverLicenseFront },
        { label: "Driver License Back", signedUrl: signedUrls.driverLicenseBack },
        { label: "Other Document", signedUrl: signedUrls.otherDoc },
    ];

    return (
        <div className="flex flex-col md:flex-row bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 md:p-8 items-center space-y-6 md:space-y-0 md:space-x-10">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm md:text-base">
                {details.map(({ label, value }) => (
                    <Detail key={label} label={label} value={value} />
                ))}

                {files.map(
                    ({ label, signedUrl }) =>
                        signedUrl && (
                            <Detail
                                key={label}
                                label={label}
                                value={
                                    <button
                                        onClick={() => {
                                            setActiveImage(signedUrl);
                                            setIsImageOpen(true);
                                        }}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View
                                    </button>
                                }
                            />
                        )
                )}
            </div>

            {activeImage && (
                <ImageView
                    isOpen={isImageOpen}
                    imageUrl={activeImage}
                    alt="Driver document"
                    onClose={() => {
                        setIsImageOpen(false);
                        setActiveImage(null);
                    }}
                />
            )}
        </div>
    );
};

export default PersonalRequirementsCard;
