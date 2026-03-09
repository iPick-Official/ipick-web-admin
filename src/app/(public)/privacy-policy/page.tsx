'use client';

import Footer from "@/components/LandingPageFooter";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";

const sections = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'personal-data', title: '2. Personal Data' },
    { id: 'personal-data-collection', title: '3. Personal Data Collection' },
    { id: 'sensitive-personal-data', title: '4. Sensitive Personal Data' },
    { id: 'rights', title: '5. Personal Data of Other Individuals' },
    { id: 'minors', title: '6. Personal Data of Minors' },
    { id: 'use-of', title: '7. Use of Personal Data' },
    { id: 'disclosure', title: '8. Disclosure of Personal Data' },
    { id: 'retention', title: '9. Retention of Personal Data' },
    { id: 'cookies', title: '10. Cookies' },
    { id: 'protection', title: '11. Protection of Personal Data' },
    { id: 'respect', title: '12. Your Rights with Respect to Personal Data' },
    { id: 'amendments', title: '13. Amendments and Updates' },
    { id: 'contact', title: '14. Contact Us' },
];

export default function PrivacyPolicy() {
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
            rootMargin: '0px 0px -70% 0px', // Trigger when section is ~30% from top
            threshold: 0.1,
        });

        const elements = sections.map((section) => document.getElementById(section.id)).filter(Boolean) as HTMLElement[];

        elements.forEach((el) => observer.current?.observe(el));

        return () => {
            observer.current?.disconnect();
        };
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsDesktop(window.innerWidth >= 1024);
        }
    }, []);

    return (
        <>
            <div className="bg-white dark:bg-zinc-900 py-24 sm:py-32">
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
                        <h1 className="text-4xl font-bold text-center mb-16">Privacy Policy</h1>
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
                                        <p className="text-sm font-semibold">Contents</p>
                                        <ul className="space-y-2">
                                            {sections.map((section) => (
                                                <li key={section.id}>
                                                    <a
                                                        href={`#${section.id}`}
                                                        className={`block transition-colors ${activeId === section.id
                                                                ? 'text-green-600 font-semibold'
                                                                : 'hover:text-green-600'
                                                            }`}
                                                    >
                                                        {section.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </aside>
                            )}

                            {/* RIGHT COLUMN - Content */}
                            <main className="lg:col-span-3 space-y-16 leading-relaxed text-base">
                                <section id="introduction">
                                    <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                                    <p>
                                        Thank you for trusting us with your personal information.

                                        This Privacy Notice describes how IPICK collect, use, process and disclose your Personal Data through the use of IPICK&apos;s mobile applications and websites (respectively “Apps” and “Websites”), as well as products, features and other services by IPICK in compliance with the provisions of REPUBLIC ACT NO. 10173 otherwise known as the “Data Privacy Act of 2012” and its Implementing Rules and Regulations.
                                    </p>
                                </section>

                                <section id="personal-data">
                                    <h2 className="text-xl font-semibold mb-2">2. Personal Data</h2>
                                    <p>
                                        IPICK collects the following personal information (Personal Data) which is defined as any information which can be used to identify you or from which you are identifiable, from our consumers, agents, vendors, suppliers, partners (driver, delivery and merchant partners), contractors and service providers. This includes but is not limited to your:
                                    </p>
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>Full Name</li>
                                        <li>Nationality</li>
                                        <li>Telephone Number</li>
                                        <li>Bank and Credit Card Details</li>
                                        <li>Payment Details (processed securely via third parties)</li>
                                        <li>Personal Interests</li>
                                        <li>Email Address</li>
                                        <li>Image or Photo</li>
                                        <li>Government-Issued Identification Numbers</li>
                                        <li>Biometric Data</li>
                                        <li>Race</li>
                                        <li>Date Of Birth</li>
                                        <li>Marital Status</li>
                                        <li>Religion</li>
                                        <li>Health Information</li>
                                        <li>Vehicle and Insurance Information</li>
                                        <li>Employment Information</li>
                                        <li>Financial Information</li>
                                        <li>Other information related to the Business</li>
                                    </ul>
                                    <p className="mt-4">
                                        IPICK collects, uses, discloses, or otherwise processes your Personal Data in accordance with this Privacy Notice with your consent, or in compliance with the above-mentioned law in the following situations:
                                    </p>
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>When it is required for us to comply with legal requirements;</li>
                                        <li>When it is required for us to enter into a contract with you;</li>
                                        <li>
                                            For IPICK&apos;s legitimate interests or the legitimate interests of any other persons, including but within the purposes set forth in this Privacy Notice.
                                        </li>
                                    </ul>
                                </section>

                                <section id="personal-data-collection">
                                    <h2 className="text-xl font-semibold mb-2">3. Personal Data Collection</h2>
                                    <p>IPICK collects and may combine Personal Data about you through the following means:</p>

                                    <ol className="list-decimal list-inside mt-4 space-y-2">
                                        <li>
                                            <strong>Personal Data provided to IPICK:</strong> IPICK collects your Personal Data when you provide it directly to us, including but not limited to:
                                            <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                                <li>Completing a user profile or registration form (e.g., name, contact information, identification data);</li>
                                                <li>Providing information to assess your eligibility as a driver or delivery partner (e.g., driver&apos; license, vehicle info, background check results);</li>
                                                <li>Interacting with IPICK&apos;s social media pages (e.g., social media ID, profile photo, public data);</li>
                                                <li>Participating in contests or events (e.g., submitted photos, audio, or video including your image);</li>
                                                <li>Verifying your identity via social media logins, selfie images, or verified payment card data;</li>
                                                <li>Filling out demographic surveys (e.g., age, gender, marital status, occupation, income);</li>
                                                <li>Agreeing to take a ride in vehicles with audio and/or video recording features.</li>
                                            </ul>
                                        </li>

                                        <li>
                                            <strong>When IPICK&apos;s Services are Availed of:</strong> Personal Data may be collected during your use of IPICK&apos;s apps, websites, and services, such as:
                                            <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                                <li>
                                                    <strong>Location Information:</strong> Real-time or approximate location via GPS, Wi-Fi, and mobile networks, collected during app usage (foreground or background, with permission). Used for service matching, navigation, safety, route optimization, fraud detection, and analytics.
                                                </li>
                                                <li>Feedback, ratings, and compliments;</li>
                                                <li>Transaction information, including payment method;</li>
                                                <li>Device information;</li>
                                                <li>Driving performance information;</li>
                                                <li>Messages or content sent through in-app communication features;</li>
                                                <li>Other personal data captured through your interaction with IPICK.</li>
                                            </ul>
                                            <p className="mt-2">
                                                IPICK may install in-vehicle audio and/or video recording devices for the safety of driver partners, delivery partners, and consumers. Your Personal Data may be captured through these recordings and will be processed in accordance with this Privacy Notice and applicable laws.
                                            </p>
                                        </li>

                                        <li>
                                            <strong>From Other Sources:</strong> IPICK may also collect Personal Data from external sources, including:
                                            <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                                <li>Business partners (e.g., fleet partners, payment providers, ride-hailing or transport partners);</li>
                                                <li>Insurance and financial service providers;</li>
                                                <li>Credit bureaus and alternative credit scoring agencies;</li>
                                                <li>Public or governmental databases and registries;</li>
                                                <li>When users add you as an emergency contact, recipient, or beneficiary of services;</li>
                                                <li>Messages sent through our in-app chat feature;</li>
                                                <li>Marketing service providers or partners.</li>
                                            </ul>
                                        </li>
                                    </ol>
                                </section>

                                <section id="sensitive-personal-data">
                                    <h2 className="text-xl font-semibold mb-2">4. Sensitive Personal Data</h2>
                                    <p>
                                        Some of the Personal Data that IPICK collects may be sensitive in nature. This may include Personal Data related to:
                                    </p>
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>Race</li>
                                        <li>National ID information</li>
                                        <li>Religious beliefs</li>
                                        <li>Background information including financial and criminal records, where legally allowed</li>
                                        <li>Health data</li>
                                        <li>Disability</li>
                                        <li>Marital status</li>
                                        <li>Biometric data, as applicable</li>
                                    </ul>
                                    <p className="mt-4">
                                        IPICK collects sensitive Personal Data only with your consent and/or in strict compliance with applicable laws. If you are ever required to provide any documentation or information to us for any purpose which may contain such sensitive data (that is not required for that purpose), you agree to redact the sensitive Personal Data before submitting such documentation or information to us.
                                    </p>
                                </section>

                                <section id="rights">
                                    <h2 className="text-xl font-semibold mb-2">5. When you provide Personal Data of other individuals to IPICK</h2>
                                    <p>In some situations, you may provide Personal Data of other individuals (such as your spouse, family members or friends) to us. For example, you may add them as your emergency contact, when you use the in-app chat or when you add them as recipients or beneficiaries of any use of our Services. If you provide us with their Personal Data, you represent and warrant that you have obtained their consent for their Personal Data to be collected, used and disclosed as set out in this Privacy Notice.</p>
                                </section>

                                <section id="minors">
                                    <h2 className="text-xl font-semibold mb-2">6. Personal Data of Minors</h2>
                                    <p>
                                        It is the duty and responsibility of parents not to allow minors under their care to submit Personal Data to IPICK. In the event that such Personal Data of a minor is disclosed to IPICK, parent&apos;s hereby consent to the processing of the minor&apos;s Personal Data and accept and agree to be bound by this Notice and take responsibility for his or her actions.
                                    </p>
                                </section>

                                <section id="use-of">
                                    <h2 className="text-xl font-semibold mb-2">7. Use of Personal Data</h2>
                                    <p>
                                        IPICK may use your Personal Data for the following purposes set out in the list below.
                                    </p>
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>Providing services and features</li>
                                        <li>Safety and security</li>
                                        <li>User support</li>
                                        <li>Research and development and security</li>
                                        <li>Legal purposes</li>
                                    </ul>
                                </section>

                                <section id="disclosure">
                                    <h2 className="text-xl font-semibold mb-2">8. Disclosure of Personal Data</h2>
                                    <p>
                                        IPICK may need to share your Personal Data with various parties in connection with the purposes outlined in this Privacy Policy. These parties include:
                                    </p>
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>Other users</li>
                                        <li>Third parties</li>
                                        <li>Third parties related to your use of IPICK services</li>
                                        <li>The owner of IPICK accounts that you may use</li>
                                        <li>Subsidiaries and affiliates</li>
                                        <li>IPICK&apos;s service providers and business partners</li>
                                        <li>IPICK&apos;s legal advisors</li>
                                        <li>Governmental authorities, where legally required</li>
                                        <li>In the event of business transfers (e.g., mergers, acquisitions, or asset sales)</li>
                                    </ul>
                                </section>

                                <section id="retention">
                                    <h2 className="text-xl font-semibold mb-2">9. Retention of Personal Data</h2>
                                    <p>
                                        IPICK retains your Personal Data for the period necessary to fulfill the Purposes outlined in this Privacy Notice unless a longer retention period is required or allowed by law. Once your Personal Data is no longer necessary for the Services or Purposes, or we no longer have a legal or business purpose for retaining your Personal Data, we take steps to erase, destroy, anonymize or prevent access or use of such Personal Data for any purpose other than compliance with this Privacy Notice, or for purposes of safety, security, fraud prevention and detection, in accordance with the requirements of applicable laws.
                                    </p>
                                </section>

                                <section id="cookies">
                                    <h2 className="text-xl font-semibold mb-2">10. Cookies and Tracking Technologies</h2>
                                    <p>
                                        IPICK and third parties we partner with may use cookies, web beacons, tags, scripts, local shared objects (such as HTML5), advertising identifiers, and similar technologies in connection with your use of our Websites and Apps. These technologies may be persistent or session-based and can be stored on your browsers or devices.
                                    </p>

                                    <p className="mt-4">
                                        Cookies may have unique identifiers and may be located on your computer or mobile device, in emails we send you, or on our web pages. These may be used to:
                                    </p>

                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>Provide essential functions for using our Websites, Services, or Apps</li>
                                        <li>Authenticate you or remember your preferences and settings</li>
                                        <li>Deliver and measure the effectiveness of advertising campaigns (e.g., views, clickthroughs)</li>
                                        <li>Analyze site traffic and usage trends</li>
                                        <li>Serve relevant ads across third-party websites and apps</li>
                                        <li>Enhance the user interface and experience by understanding user behavior and interests</li>
                                    </ul>

                                    <ol className="list-decimal list-inside mt-6 space-y-3">
                                        <li>
                                            <strong>Disabling cookies on IPICK&apos;s Websites:</strong>
                                            <p className="mt-1">
                                                You have the right to disable, block, or deactivate cookies. However, doing so may impact the availability or functionality of our Website, Services, or Apps. You can manage your browser settings to disable or clear cookies, browsing history, and cached data. Refer to the &apos;History&apos;, &apos;Preferences&apos;, &apos;Settings&apos;, or &apos;Privacy&apos; sections of your browser, or consult its help documentation for more information.
                                            </p>
                                        </li>

                                        <li>
                                            <strong>Disabling targeted ads through IPICK&apos;s App:</strong>
                                            <p className="mt-1">
                                                IPICK may display targeted ads on external platforms. You can limit the use of your Personal Data for advertising through your app preferences. Depending on your device and OS, you may be able to disable mobile identifiers (such as Apple&apos;s IDFA or Google&apos;s GAID) and restrict tracking across apps and websites via your device settings. These options typically allow you to reset, delete, limit, or restrict mobile ad tracking.
                                            </p>
                                        </li>
                                    </ol>
                                </section>

                                <section id="protection">
                                    <h2 className="text-xl font-semibold mb-2">11. Protection of Personal Data</h2>
                                    <p>
                                        IPICK takes reasonable legal, organizational, and technical measures to protect your Personal Data. These measures are designed to prevent your data from being lost, misused, or accessed without authorization.
                                    </p>

                                    <p className="mt-4">
                                        Access to your Personal Data is limited to authorized employees who require it for legitimate purposes and are obligated to handle it with strict confidentiality. Any individual processing your data will do so only in an authorized and secure manner.
                                    </p>

                                    <p className="mt-4">
                                        Please note that while we strive to protect your Personal Data, the transmission of information over the internet is not completely secure. Although we will take all reasonable steps to safeguard your information, any data transmission is ultimately at your own risk.
                                    </p>
                                </section>

                                <section id="respect">
                                    <h2 className="text-xl font-semibold mb-2">12. Your Rights with Respect to Personal Data</h2>
                                    <p>
                                        In accordance with applicable laws and regulations, you may be entitled to exercise the following rights concerning your Personal Data:
                                    </p>

                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>Inquire about the processing of your Personal Data and receive a copy of it.</li>
                                        <li>Request the correction and/or deletion of your Personal Data, in some cases.</li>
                                        <li>Request the restriction of or object to the processing of your Personal Data, in some cases.</li>
                                        <li>Withdraw your consent to the processing of your Personal Data, where processing is based on consent.</li>
                                        <li>Request receipt or transfer of your Personal Data to another organization, in a machine-readable format, where processing is based on consent or contract performance.</li>
                                        <li>File a complaint with the relevant data privacy authority if your rights are violated or you suffer harm due to unlawful data processing.</li>
                                    </ul>

                                    <p className="mt-4">
                                        Where you have the option to share your Personal Data with us, you may choose not to do so. If we request your consent and you later withdraw it, we will honor that decision in accordance with our legal obligations.
                                    </p>

                                    <p className="mt-4">
                                        However, please note that refusing to provide your Personal Data, or withdrawing your consent, may prevent us from performing essential functions needed to deliver our Services, as outlined in Section 7 (Use of Personal Data). This may also affect your ability to access or use our Apps or Services.
                                    </p>

                                    <p className="mt-4">
                                        After your consent is withdrawn, IPICK may still process your Personal Data to the extent required or permitted by applicable laws.
                                    </p>

                                    <p className="mt-4">
                                        All rights requests will be screened and verified. To confirm your identity or authority, we may ask you to provide additional documentation. Once verified, we will process your request within the timeframes prescribed by applicable laws.
                                    </p>
                                </section>

                                <section id="amendments">
                                    <h2 className="text-xl font-semibold mb-2">13. Amendments and Updates</h2>
                                    <p>
                                        IPICK may modify, update, or amend the terms in this Privacy Notice at any time. Any such amendments will be communicated to you through the Apps and/or other appropriate channels at least five (5) business days before the effective date.
                                    </p>
                                    <p className="mt-4">
                                        It is your responsibility to review this Privacy Notice regularly. By continuing to use the Apps, Websites, or Services, or by continuing to communicate or engage with IPICK following the effective date of any modifications—whether or not you have reviewed the changes—you acknowledge and agree to be bound by the updated terms of the Privacy Notice.
                                    </p>
                                </section>

                                <section id="contact">
                                    <h2 className="text-xl font-semibold mb-2">14. Contact Us</h2>
                                    <p>
                                        If you have any queries about this Privacy Notice or would like to exercise your rights as outlined herein, please fill out the provided form or directly contact our Data Protection Officer:
                                    </p>

                                    <div className="mt-4 space-y-2">
                                        <p><strong>IPICK Data Protection Officer</strong></p>
                                        <p><strong>Address:</strong> Eastwood Greenview Subdivision, Rodriguez, Rizal, Philippines</p>
                                        <p><strong>Contact Number:</strong> <a href="tel:+639279577257" className="text-green-600 hover:underline">(+639) 279 577 257</a></p>
                                        <p><strong>Email:</strong> <a href="mailto:gaygrepson@gmail.com" className="text-green-600 hover:underline">gaygrepson@gmail.com</a></p>
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
