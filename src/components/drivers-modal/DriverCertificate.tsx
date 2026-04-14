"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { DriverWithWallet } from "@/types/drivers";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";

interface Props {
    driver: DriverWithWallet;
}

export default function DriverCertificate({ driver }: Props) {
    const certRef = useRef<HTMLDivElement>(null);

    const downloadPDF = async () => {
        if (!certRef.current) return;

        const canvas = await html2canvas(certRef.current, {
            scale: 2,
            backgroundColor: "#ffffff",
            onclone: (doc) => {
                doc.documentElement.classList.remove("dark");
                const all = doc.querySelectorAll("*");

                all.forEach((el) => {
                    const htmlEl = el as HTMLElement;
                    htmlEl.style.color = "#000000";
                    htmlEl.style.backgroundColor = "#ffffff";
                    htmlEl.style.borderColor = "#000000";
                });
            },
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("portrait", "mm", "a4");
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
        pdf.save(`Certificate-${driver.name}.pdf`);
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div
                ref={certRef}
                className="
                    w-[794px] h-[1123px] p-20
                    bg-white text-black border-gray-800
                    grid grid-rows-[auto_1fr_auto]"
            >
                {/* HEADER */}
                <div className="flex flex-col items-start mb-6">
                    <img src="/logo-word.png" alt="IPICK Logo" className="h-8 object-contain" />
                    <hr className="w-full border-t border-gray-300 mt-5" />
                </div>

                {/* BODY */}
                <div className="flex flex-col">
                    <p className="text-lg uppercase tracking-widest text-center font-bold">
                        Certificate of Accreditation
                    </p>

                    <p className="mt-8 text-sm">
                        {driver.createdAt
                            ? new Date(driver.createdAt).toLocaleDateString()
                            : "N/A"}
                    </p>
                    <p className="mt-3 text-sm">To whom it may concern,</p>
                    <p className="mt-3 text-sm">
                        This is to certify that as of the date stated above, Mr./Ms.
                        <span className="font-bold"> {driver.name}</span> has the following details under iPick's platform:
                    </p>

                    {/* DETAILS TABLE */}
                    <div className="mt-10 w-full border border-gray-300 overflow-hidden">
                        <table className="w-full table-fixed text-left border-collapse border border-gray-300">
                            <tbody>
                                {[
                                    ["Plate Number", driver.transportRequirements?.plateNumber],
                                    ["License Number", driver.personalRequirements.driverLicenseNumber],
                                    ["Contact Number", driver.mobnum],
                                    ["LTFRB Case Number", driver.caseNum],
                                ].map(([label, value]) => (
                                    <tr key={label}>
                                        <td className="font-semibold px-4 py-2 w-1/3 border border-gray-300 bg-gray-200">{label}</td>
                                        <td className="font-semibold px-4 py-2 border border-gray-300">{value || "N/A"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className="mt-10 text-sm">iPick does not assume any responsibility over the actions of our driver partners or any inference that may be drawn from this certification which is issued based solely on iPick's system.</p>
                    <p className="mt-10 mb-5 text-md">Best Regards,</p>
                    <div className="flex flex-col items-start">
                        <img src="/ray-signature.png" alt="Ray Anthony Oreto" className="h-25 object-contain" />
                    </div>
                    <div className="flex flex-col w-1/3">
                        <div className="font-semibold">
                            Ray Anthony Oreto
                        </div>
                        <p className="text-sm mt-1 opacity-80">Head of Drivers Operation</p>
                    </div>
                </div>

                {/* BUTTON */}
                <button
                    onClick={downloadPDF}
                    className="
                        absolute bottom-20 right-20 
                        bg-green-600 p-3 rounded-full shadow-lg 
                        hover:bg-green-700"
                    aria-label="Download Certificate"
                >
                    <ArrowDownTrayIcon className="h-6 w-6 text-white" />
                </button>
            </div>
        </div>
    );
}