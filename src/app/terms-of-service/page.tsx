'use client';

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";

const sections = [
    { id: 'amendment', title: '1. Amendment To Terms Of Service Agreement' },
    { id: 'standard', title: '2. Standard Operating Procedure' },
    { id: 'terms', title: '3. Terms Of Service Agreement For Passengers' },
];

export default function TermsService() {
    const [tocOpen, setTocOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                    break;
                }
            }
        };

        observer.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '0px 0px -70% 0px',
            threshold: 0.1,
        });

        const elements = sections.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

        elements.forEach((el) => observer.current?.observe(el));

        return () => observer.current?.disconnect();
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsDesktop(window.innerWidth >= 1024);
        }
    }, []);

    return (
        <>
            <div className="bg-white py-24 sm:py-32">
                <Navbar />
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    {/* Background Gradient Shape - Top */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6fbf73] to-[#FF9E2A] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }} />
                    </div>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <h1 className="text-4xl font-bold text-gray-900 text-center mb-16">Terms of Service</h1>
                        <div className="lg:hidden mb-4 flex justify-between items-center">
                            <button
                                onClick={() => setTocOpen(!tocOpen)}
                                className="text-sm text-green-600 hover:underline"
                            >
                                {tocOpen ? "Hide" : "Show"}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* LEFT COLUMN - Table of Contents */}
                            {(tocOpen || isDesktop) && (
                                <aside className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-gray-200 pb-4 lg:pb-0 lg:pr-4 sticky lg:top-32 self-start">
                                    <nav className="space-y-4 text-sm">
                                        <p className="text-sm font-semibold text-gray-700 capitalize">Contents</p>
                                        <ul className="space-y-2">
                                            {sections.map(({ id, title }) => (
                                                <li key={id}>
                                                    <a
                                                        href={`#${id}`}
                                                        className={`block transition-colors capitalize ${activeId === id
                                                                ? 'text-green-600 font-semibold'
                                                                : 'text-gray-600 hover:text-green-600'
                                                            }`}
                                                    >
                                                        {title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </aside>
                            )}

                            {/* RIGHT COLUMN - Content */}
                            <main className="lg:col-span-3 space-y-16 text-gray-700 leading-relaxed text-base">
                                <section id="amendment">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4 uppercase">
                                        Amendment to Terms of Service Agreement
                                    </h2>

                                    <div className="space-y-4 text-base text-gray-700">
                                        <p>
                                            This Amendment to the Terms of Service Agreement (the “Amendment”) is effective as of <strong>December 14, 2023</strong>, by and between <strong>iPick Booking Services (“iPick”)</strong>, and its users, including Passengers and TNVS Operators.
                                        </p>

                                        <p><strong>WHEREAS</strong>, iPick has established a Terms of Service Agreement;</p>
                                        <p><strong>WHEREAS</strong>, iPick desires to amend certain provisions to enhance service quality, user experience, and regulatory compliance;</p>
                                        <p><strong>NOW, THEREFORE</strong>, iPick hereby amends the Terms of Service Agreement as follows:</p>

                                        <ul className="list-disc list-inside space-y-2">
                                            <li>
                                                <strong>1. Digital Booking and Dispatch (SOP – Section 1):</strong><br />
                                                Amend to include: “iPick reserves the right to introduce new features and functionalities to the digital application that may enhance user experience and service efficiency.”
                                            </li>
                                            <li>
                                                <strong>2. Safety and Security (SOP – Section 3):</strong><br />
                                                Amend to include: “Regular safety training sessions for drivers will be conducted to ensure passenger safety and compliance with traffic regulations.”
                                            </li>
                                            <li>
                                                <strong>3. Driver Training and Identification (SOP – Section 4):</strong><br />
                                                Amend to include: “Training Program will now also cover topics on customer service excellence and emergency response protocols.”
                                            </li>
                                            <li>
                                                <strong>4. Regulatory Compliance and Reporting (SOP – Section 5):</strong><br />
                                                Amend to include: “TNVS Operators must now submit vehicle maintenance and inspection reports bi-annually to iPick for safety compliance verification.”
                                            </li>
                                            <li>
                                                <strong>5. Other Remarks (SOP – Section 8):</strong><br />
                                                Amend to include: “iPick commits to regularly updating its SOPs in line with technological advancements and regulatory changes in the transportation sector.”
                                            </li>
                                            <li>
                                                <strong>Amend to include:</strong> Terms of Service Agreement for Passengers
                                            </li>
                                            <li>
                                                <strong>Amend to include:</strong> Terms of Service Agreement for TNVS Operators
                                            </li>
                                        </ul>

                                        <h3 className="text-lg font-semibold text-gray-800 mt-6">General Provisions:</h3>

                                        <ul className="list-disc list-inside space-y-2">
                                            <li>
                                                <strong>Effect of Amendment:</strong> This Amendment shall be considered part of, and integrated into, the original Terms of Service Agreement.
                                            </li>
                                            <li>
                                                <strong>Severability:</strong> If any provision of this Amendment is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
                                            </li>
                                            <li>
                                                <strong>Entire Agreement:</strong> This Amendment, along with the original Terms of Service Agreement, constitutes the entire agreement between iPick, its Passengers, and TNVS Operators.
                                            </li>
                                            <li>
                                                <strong>Governing Law:</strong> This Amendment shall be governed by the laws of the jurisdiction in which iPick operates.
                                            </li>
                                        </ul>

                                        <div className="mt-6">
                                            <p className="font-semibold">IN WITNESS WHEREOF, iPick has caused this Amendment to be executed as of the date first above written.</p>

                                            <div className="mt-4 space-y-1">
                                                <p><strong>IPICK BOOKING SERVICES</strong></p>
                                                <p className="mt-2"><strong>By:</strong></p>
                                                <p><strong>Name:</strong> Mark Dominic P. Camacho</p>
                                                <p><strong>Title:</strong> President</p>
                                                <p><strong>Date:</strong> December 14, 2023</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section id="standard">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4 uppercase">
                                        Standard Operating Procedure
                                    </h2>

                                    <div className="space-y-6 text-base text-gray-700">
                                        <div>
                                            <h3 className="font-semibold text-lg">1. Digital Booking and Dispatch</h3>
                                            <ul className="list-disc list-inside space-y-1 mt-2">
                                                <li>Application Usage: All transportation must be exclusively booked and arranged via our company’s internet-based digital technology application.</li>
                                                <li>Technology Requirements: Regular updates and maintenance of the digital application to ensure reliability and efficiency.</li>
                                                <li>New Features and Functionalities: iPick reserves the right to introduce new features and functionalities to the digital application that may enhance user experience and service efficiency.</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-lg">2. Passenger Information and Transparency</h3>
                                            <ul className="list-disc list-inside space-y-1 mt-2">
                                                <li>Driver Information: Before initiating a trip, the passenger must be provided with the driver’s name, photograph, vehicle license plate number, and case number issued by the Board.</li>
                                                <li>Fare Transparency: Clearly display the total fare, fare range, or rate by distance or time on the application before the passenger confirms the ride.</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-lg">3. Safety and Security</h3>
                                            <ul className="list-disc list-inside space-y-1 mt-2">
                                                <li>Complaint Mechanism: Integrate a feature in the application for passengers to lodge complaints or report lost items. Include the Board’s Hotline Number for direct communication.</li>
                                                <li>Background Checks: Conduct comprehensive criminal background checks on all applicant-drivers before their accreditation.</li>
                                                <li>Driver Accreditation: Accredit drivers who possess a professional Driver’s License and are proficient in Filipino and English.</li>
                                                <li>Zero Tolerance Policy: Enforce a strict “zero tolerance drug and alcohol policy” for all drivers.</li>
                                                <li>Safety Training Sessions: Regular safety training sessions for drivers will be conducted to ensure passenger safety and compliance with traffic regulations.</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-lg">4. Driver Training and Identification</h3>
                                            <ul className="list-disc list-inside space-y-1 mt-2">
                                                <li>Training Program: Establish a continuous Training Program focusing on the use of digital technology, safety standards, and adherence to terms and conditions.</li>
                                                <li>Customer Service & Emergency Training: Training Program will now also cover topics on customer service excellence and emergency response protocols.</li>
                                                <li>Driver Identification: Issue photo identification cards to all accredited drivers, mandatory to wear during service.</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-lg">5. Regulatory Compliance and Reporting</h3>
                                            <ul className="list-disc list-inside space-y-1 mt-2">
                                                <li>Eligibility: TNVS Operators must meet eligibility requirements set by the Philippine authorities.</li>
                                                <li>Enforcement Mechanism: Develop a system to monitor driver activity and report to the Board within 30 days of Certificate issuance.</li>
                                                <li>Incident Reporting: Report serious incidents involving drivers to the Board’s Legal Division within specified timelines.</li>
                                                <li>Vehicle Maintenance: Conduct regular inspections. TNVS Operators must submit maintenance reports bi-annually to iPick.</li>
                                                <li>Restricted Features: Prohibit installation of toplights or taximeters.</li>
                                                <li>Airport Services: Follow airport-specific regulations only when authorized.</li>
                                                <li>Trade Dress Requirement: All vehicles must display visible “trade dress” for identification during rides.</li>
                                                <li>Franchise Compliance: Only duly franchised TNVS vehicles may operate.</li>
                                                <li>Data Submission: Submit operational records (ride stats, complaints, accidents) to the Board every six months.</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-lg">6. Customer Service and Receipts</h3>
                                            <ul className="list-disc list-inside space-y-1 mt-2">
                                                <li>Electronic Receipts: Provide detailed digital receipts showing trip origin, destination, distance, duration, and fare.</li>
                                                <li>Service Quality: Maintain high levels of customer service to ensure passenger comfort and satisfaction.</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-lg">7. Legal and Ethical Compliance</h3>
                                            <ul className="list-disc list-inside space-y-1 mt-2">
                                                <li>Accreditation Terms: Follow all conditions tied to the Accreditation Certificate, including non-transferability.</li>
                                                <li>Non-Discrimination: Drivers should not be notified of passenger identities, especially Board employees or officials.</li>
                                                <li>Liability for Non-Compliance: Non-compliance may lead to accreditation cancellation after due process.</li>
                                                <li>Service Disclaimer: iPick is not liable for losses or injuries; services are used at the passenger’s risk. No warranties implied.</li>
                                                <li>Driver Consequences: Non-compliant drivers face disciplinary actions from suspension to permanent revocation.</li>
                                                <li>Legal Ramifications: Criminal activities may result in legal charges, fines, or imprisonment.</li>
                                                <li>Internal Sanctions: iPick may impose retraining, suspension, or termination for violations.</li>
                                                <li>Continuous Monitoring: A robust system is in place to monitor driver compliance and prevent violations.</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-lg">8. Other Remarks</h3>
                                            <ul className="list-disc list-inside space-y-1 mt-2">
                                                <li>Continuous Updates: This SOP will evolve with legal and technological developments.</li>
                                                <li>Training and Awareness: All staff and drivers will be trained regularly on the SOPs.</li>
                                                <li>Compliance Monitoring: Periodic reviews will ensure SOP compliance and service standards.</li>
                                            </ul>
                                        </div>

                                        <p className="mt-6">
                                            <em>
                                                This SOP is designed to align with the requirements of Memorandum Circular 2015-016-A, ensuring iPick operates within the legal framework while maintaining excellent service and safety standards.
                                            </em>
                                        </p>
                                    </div>
                                </section>
                                <section id="tos-passengers" className="mb-12">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4 uppercase">
                                        Terms of Service Agreement for Passengers
                                    </h2>
                                    <div className="space-y-4 text-base text-gray-700">
                                        <p><strong>1. Acceptance of Terms</strong><br />
                                            Welcome to iPick! By using our mobile application (the “App”) and our ride-hailing services (the “Services”), you agree to follow and be bound by these Terms of Service (“ToS”). If you disagree with these terms, please refrain from using our App or Services.</p>

                                        <p><strong>2. Definition of Terms</strong><br />
                                            • “iPick,” “We,” “Us,” or “Our” refers to iPick Booking Services, the entity providing the App and Services.<br />
                                            • “Passenger” or “User” denotes individuals who utilize the App to request and book rides.<br />
                                            • “Driver” signifies individuals who offer transportation services via the App.<br />
                                            • “Ride” pertains to the transportation service rendered to Passengers by Drivers.<br />
                                            • “Account” indicates the personal profile created by Passengers for using the App and Services.</p>

                                        <p><strong>3. Eligibility</strong><br />
                                            • To use our App and Services, Passengers must have the legal capacity to enter agreements. By using our App and Services, you affirm and guarantee that you fulfill these eligibility criteria.</p>

                                        <p><strong>4. Account Registration</strong><br />
                                            • Passengers must set up an Account to access the Services.<br />
                                            • You commit to providing accurate, complete, and current information during the registration process.<br />
                                            • You are responsible for safeguarding your Account login details and for all activities that happen under your Account.</p>

                                        <p><strong>5. Booking and Ride Services</strong><br />
                                            • iPick provides a platform enabling Passengers to request rides from Drivers.<br />
                                            • Passengers can arrange rides using the App by specifying their pick-up and drop-off locations.<br />
                                            • The App displays information about the Driver, such as their name, photo, and vehicle details.<br />
                                            • Before confirming the ride request, Passengers can see the estimated fare.</p>

                                        <p><strong>6. User Conduct</strong><br />
                                            • Passengers are expected to behave respectfully and courteously towards Drivers and other users.<br />
                                            • You agree not to partake in any illegal, disruptive, or harmful actions while using our Services.<br />
                                            • Activities such as harassment, fraud, vandalism, and breaching our policies are strictly forbidden.</p>

                                        <p><strong>7. Payments and Pricing</strong><br />
                                            • Passengers consent to pay for rides according to the fare set by the App at the time of booking.<br />
                                            • Pricing components may include a base fare, time rate, distance rate, and additional charges.<br />
                                            • Payments are made through the App using the provided payment methods.</p>

                                        <p><strong>8. Cancellation and Refunds</strong><br />
                                            • Passengers have the option to cancel rides before the Driver’s arrival at the pick-up location.<br />
                                            • In certain situations, cancellation fees may be imposed, as outlined in our Cancellation Policy.<br />
                                            • Refunds for canceled rides are processed following our Refund Policy.</p>

                                        <p><strong>9. Privacy Policy</strong><br />
                                            • iPick’s privacy practices are guided by our Privacy Policy, which is available within the App.<br />
                                            • Passengers consent to the collection, use, and sharing of their personal information as stated in the Privacy Policy.</p>

                                        <p><strong>10. Intellectual Property</strong><br />
                                            • All content and intellectual property in the App and Services are the property of iPick.<br />
                                            • Passengers are given a limited, non-exclusive, non-transferable license to use the App for personal use.</p>

                                        <p><strong>11. Liability and Disclaimers</strong><br />
                                            • iPick is not liable for any damages, losses, or injuries that arise from the use of our Services.<br />
                                            • Passengers use the Services at their own risk.<br />
                                            • iPick disclaims all warranties, including those of merchantability and fitness for a particular purpose.</p>

                                        <p><strong>12. Indemnity</strong><br />
                                            • Passengers agree to indemnify and hold iPick harmless from any claims, damages, or losses resulting from their use of the Services.</p>

                                        <p><strong>13. Termination</strong><br />
                                            • iPick reserves the right to suspend or terminate a Passenger’s access to the App and Services for violating these terms or engaging in unlawful activity.</p>

                                        <p><strong>14. Governing Law and Jurisdiction</strong><br />
                                            • This agreement is governed by the laws of the Philippines.<br />
                                            • Any disputes will be resolved through arbitration in accordance with the rules of the Land Transportation Franchising and Regulatory Board.</p>

                                        <p><strong>15. Amendments</strong><br />
                                            • iPick may update these terms at any time.<br />
                                            • Passengers will be notified of any changes, and continued use of the App constitutes acceptance of the revised terms.</p>

                                        <p><strong>16. Contact Information</strong><br />
                                            For questions, support, or inquiries, contact us at <a href="mailto:admin@ipick.ph" className="text-blue-600 underline">admin@ipick.ph</a>.</p>
                                    </div>
                                </section>

                                <section id="terms">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4 uppercase">
                                        Terms of Service Agreement for TNVS Operators
                                    </h2>
                                    <div className="space-y-4 text-base text-gray-700">
                                        <p><strong>1. Acceptance of Terms</strong><br />
                                            Welcome to iPick! By accessing or using our platform and services as a TNVS operator, you agree to comply with and be bound by the following Terms of Service (“ToS”). If you do not agree to these terms, please refrain from using our platform or services.</p>

                                        <p><strong>2. Definitions</strong><br />
                                            • “iPick,” “We,” “Us,” or “Our” refers to iPick Booking Services, the provider of the platform and services.<br />
                                            • “TNVS Operator” or “Operator” refers to individuals or entities offering transportation services using our platform.<br />
                                            • “Passenger” refers to individuals who request transportation services through our platform.<br />
                                            • “Platform” refers to our digital marketplace connecting Operators and Passengers.<br />
                                            • “Account” refers to the personal or business account Operators create to use the platform and offer transportation services.</p>

                                        <p><strong>3. Eligibility</strong><br />
                                            • TNVS Operators must meet the eligibility requirements set by the relevant government authorities in the Philippines to provide transportation services. By using our platform, you represent and warrant that you meet these eligibility requirements.</p>

                                        <p><strong>4. Account Registration</strong><br />
                                            • TNVS Operators are required to create an Account to use the platform and offer transportation services.<br />
                                            • You agree to provide accurate, complete, and up-to-date information during the registration process.<br />
                                            • You are responsible for maintaining the confidentiality of your Account login credentials and for all activities under your Account.</p>

                                        <p><strong>5. Offering Transportation Services</strong><br />
                                            • Operators can offer transportation services to Passengers through the platform.<br />
                                            • You agree to comply with all applicable laws, regulations, and requirements related to providing transportation services in the Philippines.</p>

                                        <p><strong>6. Vehicle Requirements</strong><br />
                                            • TNVS Operators must ensure their vehicles meet the safety and quality standards set by regulatory authorities in the Philippines.<br />
                                            • You are responsible for maintaining your vehicle’s safety and cleanliness and for providing accurate vehicle information on the platform.</p>

                                        <p><strong>7. Payments and Pricing</strong><br />
                                            • Passengers will pay for rides based on the fare determined by the platform at the time of booking.<br />
                                            • Pricing may include base fare, time rate, distance rate, and additional fees.<br />
                                            • Payments to Operators will be processed through the platform using specified payment methods.</p>

                                        <p><strong>8. Cancellation and Refunds</strong><br />
                                            • Passengers can cancel rides, and cancellation fees may apply in certain cases.<br />
                                            • Refunds for canceled rides will be processed according to our Refund Policy.</p>

                                        <p><strong>9. Privacy Policy</strong><br />
                                            • Our privacy practices are governed by our Privacy Policy, available on the platform.<br />
                                            • Operators consent to the collection, use, and sharing of their personal information as described in the Privacy Policy.</p>

                                        <p><strong>10. Intellectual Property</strong><br />
                                            • All content and intellectual property in the platform belong to iPick.<br />
                                            • Operators are granted a limited, non-exclusive, non-transferable license to use the platform for offering transportation services.</p>

                                        <p><strong>11. Liability and Disclaimers</strong><br />
                                            • iPick is not liable for any damages, losses, or injuries arising from the use of our platform or services.<br />
                                            • Operators use the platform and provide transportation services at their own risk.</p>

                                        <p><strong>12. Indemnity</strong><br />
                                            • Operators agree to indemnify and hold iPick harmless from any claims, damages, or losses arising from their use of the platform or provision of transportation services.</p>

                                        <p><strong>13. Termination</strong><br />
                                            • iPick reserves the right to suspend or terminate Operators’ access to the platform for violating these terms or any unlawful activity.</p>

                                        <p><strong>14. Governing Law and Jurisdiction</strong><br />
                                            • This agreement is governed by the laws of the Philippines.<br />
                                            • Disputes shall be resolved through arbitration in accordance with the Land Transportation Franchising and Regulatory Board (LTFRB) rules.</p>

                                        <p><strong>15. Amendments</strong><br />
                                            • iPick may update these terms at any time.<br />
                                            • Operators will be notified of changes, and continued use of the platform constitutes acceptance of the revised terms.</p>

                                        <p><strong>16. Contact Information</strong><br />
                                            For questions, support, or inquiries, please contact us at <a href="mailto:admin@ipick.ph" className="text-blue-600 underline">admin@ipick.ph</a>.</p>
                                    </div>
                                </section>
                            </main>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-700 transition duration-300"
                            >
                                ↑
                            </button>
                        </div>
                    </div>
                    {/* Background Gradient Shape - Bottom */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    >
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#6fbf73] to-[#FF9E2A] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
