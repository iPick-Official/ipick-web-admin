"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { DriverWithWallet } from "@/types/drivers";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";

interface Props {
    driver: DriverWithWallet;
}

export default function EndorsementLetter({ driver }: Props) {
    const recomendRef = useRef<HTMLDivElement>(null);

    const downloadPDF = async () => {
        if (!recomendRef.current) return;

        const canvas = await html2canvas(recomendRef.current, {
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
        pdf.save(`endorsement-letter-${driver.name}.pdf`);
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div
                ref={recomendRef}
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
                        ENDORSEMENT LETTER
                    </p>

                    <p className="mt-8 text-sm">
                        <span className="font-bold">Date:</span> {new Date().toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-sm">
                        <span className="font-bold">To:</span> {driver.transportRequirements.carBrand}
                    </p>
                    <p className="mt-2 text-sm">
                        <span className="font-bold">Subject:</span> Endorsement for Certificate of Conformity Request
                    </p>
                    <p className="mt-3 text-sm">Good day,</p>
                    <p className="mt-3 text-sm">This letter is issued by <span className="font-bold">IPICK</span> to formally endorse<span className="font-bold"> {driver.name}</span>, a franchise applicant under our company, for the purpose of requesting a Certificate of Conformity from your office.
                    </p>
                    <p className="mt-5 text-sm">The vehicle details are as follows:</p>

                    {/* DETAILS TABLE */}
                    <div className="mt-3 w-full border border-gray-300 overflow-hidden">
                        <table className="w-full text-sm border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    {["Make", "Case No.", "Plate No.", "OR No.", "CR No."].map(h => (
                                        <th key={h} className="px-3 py-2 border">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {[
                                        `${driver.transportRequirements?.carBrand || "N/A"} ${driver.transportRequirements?.carModel || ""}`,
                                        driver.caseNum,
                                        driver.transportRequirements?.plateNumber,
                                        driver.transportRequirements?.orNumber,
                                        driver.transportRequirements?.crNumber,
                                    ].map((val, i) => (
                                        <td key={i} className="px-3 py-2 border">
                                            {val || "N/A"}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="mt-8 text-sm">We, the <span className="font-bold">IPICK</span>, hereby certify that the above-mentioned applicant is legitimate and authorized to proceed with necessary transactions related to their franchise application.</p>
                    <p className="mt-8 text-sm">We respectfully request your kind assistance in facilitating this request.</p>
                    <p className="mt-8 text-sm">Thank you for your continued support.</p>
                    <p className="mt-8 mb-5 text-sm">Respectfully yours,</p>
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