import React, { useState } from "react";
import { TransportRequirements } from "@/types/drivers";
import { Detail } from "../ui/Details";
import ImageView from "../ui/ImageView";

type SignedUrls = {
    operatorDocs?: string | null;
    ownerDocs?: string | null;
    operatorsDoc?: string | null;
    vehicleOR?: string | null;
    vehicleCR?: string | null;
    vehicleSalesInvoice?: string | null;
    authorizationLetterPageOne?: string | null;
    authorizationLetterPageTwo?: string | null;
    sPAPageOne?: string | null;
    sPAPageTwo?: string | null;
    pAPageOne?: string | null;
    pAPageTwo?: string | null;
    cPCPageOne?: string | null;
    cPCPageTwo?: string | null;
    mEPAPageOne?: string | null;
    mEPAPageTwo?: string | null;
    pAMI?: string | null;
};

type Props = {
    transportRequirements: TransportRequirements | null | undefined;
    signedUrls: SignedUrls;
};

const TransportRequirementsCard: React.FC<Props> = ({
    transportRequirements,
    signedUrls,
}) => {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [isImageOpen, setIsImageOpen] = useState(false);

    if (!transportRequirements) return null;

    const details = [
        { label: "Plate Number", value: transportRequirements.plateNumber || "-" },
        { label: "OR Number", value: transportRequirements.orNumber || "-" },
        { label: "CR Number", value: transportRequirements.crNumber || "-" },
        { label: "Brand", value: transportRequirements.carBrand || "-" },
        { label: "Vehicle Model", value: `${transportRequirements.carModel || ""}` },
        { label: "Color", value: transportRequirements.carColor || "-" },
    ];

    const files = [
        { label: "Operator Documents", signedUrl: signedUrls.operatorDocs },
        { label: "Owner Documents", signedUrl: signedUrls.ownerDocs },
        { label: "Operators Document", signedUrl: signedUrls.operatorsDoc },
        { label: "Vehicle OR", signedUrl: signedUrls.vehicleOR },
        { label: "Vehicle CR", signedUrl: signedUrls.vehicleCR },
        { label: "Vehicle Sales Invoice", signedUrl: signedUrls.vehicleSalesInvoice },
        { label: "Authorization Letter Page 1", signedUrl: signedUrls.authorizationLetterPageOne },
        { label: "Authorization Letter Page 2", signedUrl: signedUrls.authorizationLetterPageTwo },
        { label: "SPA Page 1", signedUrl: signedUrls.sPAPageOne },
        { label: "SPA Page 2", signedUrl: signedUrls.sPAPageTwo },
        { label: "PA Page 1", signedUrl: signedUrls.pAPageOne },
        { label: "PA Page 2", signedUrl: signedUrls.pAPageTwo },
        { label: "CPC Page 1", signedUrl: signedUrls.cPCPageOne },
        { label: "CPC Page 2", signedUrl: signedUrls.cPCPageTwo },
        { label: "MEPA Page 1", signedUrl: signedUrls.mEPAPageOne },
        { label: "MEPA Page 2", signedUrl: signedUrls.mEPAPageTwo },
        { label: "PAMI", signedUrl: signedUrls.pAMI },
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
                    alt="Transport document"
                    onClose={() => {
                        setIsImageOpen(false);
                        setActiveImage(null);
                    }}
                />
            )}
        </div>
    );
};

export default TransportRequirementsCard;
