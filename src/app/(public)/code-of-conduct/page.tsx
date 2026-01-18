'use client';

import Footer from "@/components/LandingPageFooter";
import Navbar from "@/components/LandingPageNavbar";
import { useEffect, useRef, useState } from "react";

const sections = [
    { id: 'general', title: '1. General Code of Conduct' },
    { id: 'passenger', title: '2. Passenger Code of Conduct' },
    { id: 'community', title: '3. IPICK Community Conduct' },
    { id: 'breach', title: '4. Breach of Code' },
    { id: 'commitment', title: '5. Commitment to Community' },
];

export default function CodeConduct() {
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
            rootMargin: '0px 0px -70% 0px', // triggers before top reaches viewport
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
                        <h1 className="text-4xl font-bold text-center mb-16">Code of Conduct</h1>
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
                                            {sections.map(({ id, title }) => (
                                                <li key={id}>
                                                    <a
                                                        href={`#${id}`}
                                                        className={`block transition-colors ${activeId === id
                                                                ? 'text-green-600 font-semibold'
                                                                : 'hover:text-green-600'
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
                            <main className="lg:col-span-3 space-y-16 leading-relaxed text-base">
                                <section id="general">
                                    <h2 className="text-xl font-semibold mb-2">1. General Code of Conduct</h2>

                                    <ul className="list-none text-base space-y-4">
                                        <li>
                                            <h3 className="font-semibold leading-tight">Respect for All</h3>
                                            <p className="mt-1">
                                                We maintain a zero-tolerance policy towards assault, harassment, or abuse of any kind. Prohibited behaviors include, but are not limited to, physical abuse, verbal harassment, sexual assault, rape, murder, kidnapping, threats, and intimidation. Inappropriate contact with drivers or fellow passengers after the trip, except for the return of lost items, is strictly forbidden.
                                            </p>
                                        </li>

                                        <li>
                                            <h3 className="font-semibold leading-tight">Road Safety Compliance</h3>
                                            <p className="mt-1">
                                                Users must adhere to all road safety laws. Asking drivers to exceed speed limits, commit traffic violations, or stop at unsafe or illegal locations is prohibited. Seatbelts must be worn at all times. Helmets are required for bike or scooter rides. Babies, children, and pets should travel with appropriate restraints as per local laws.
                                            </p>
                                        </li>

                                        <li>
                                            <h3 className="font-semibold leading-tight">Prohibition of Theft and Property Damage</h3>
                                            <p className="mt-1">
                                                Any acts of theft, robbery, vandalism, or damage to the driver&apos;s vehicle or property are strictly prohibited and may result in legal penalties.
                                            </p>
                                        </li>

                                        <li>
                                            <h3 className="font-semibold leading-tight">Banned Substances and Items</h3>
                                            <p className="mt-1">
                                                Transporting illegal or prohibited items in the vehicle is forbidden. If you suspect your driver is under the influence of substances, terminate the trip immediately and notify authorities. Do not use our services to transport drugs or other illegal items.
                                            </p>
                                        </li>

                                        <li>
                                            <h3 className="font-semibold leading-tight">No Fraudulent Activities</h3>
                                            <p className="mt-1">
                                                Fraudulent activities, including unsubstantiated claims for refunds or compensation and the use of multiple accounts for such purposes, are strictly prohibited.
                                            </p>
                                        </li>
                                    </ul>
                                </section>

                                <section id="passenger">
                                    <h2 className="text-xl font-semibold mb-2">2. Passenger Code of Conduct</h2>

                                    <div className="space-y-4 text-base">
                                        <div>
                                            <h3 className="font-semibold">Punctuality and Commitment</h3>
                                            <p>
                                                Book your ride only when you&apos;re ready to travel. Arrive on time and avoid canceling without a valid reason.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">Smooth Pickups</h3>
                                            <p>
                                                Select the correct pickup location. Communicate effectively with your driver to facilitate an easy meetup.
                                                <br />
                                                Confirm your driver&apos;s identity before boarding the vehicle.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">Seamless Drop-offs</h3>
                                            <p>
                                                Ensure the drop-off location is accurate and safe. Our drivers follow GPS-suggested routes.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">Respect and Politeness</h3>
                                            <p>
                                                Always treat your driver respectfully. No smoking/vaping, littering, spitting, vomiting, shouting, swearing, putting legs on the dashboard, eating/drinking, or slamming doors. You are responsible for your guests behavior too.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">No Left Items</h3>
                                            <p>
                                                Ensure you don&apos;t leave any personal items or trash in the vehicle.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">Fair Ratings</h3>
                                            <p>
                                                After each trip or delivery, rate your driver or delivery partner fairly and provide constructive feedback.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">Privacy Matters</h3>
                                            <p>
                                                Do not retain or share personal details about your driver or delivery partner. Stay informed about our Privacy Policy.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">Emergency Protocol</h3>
                                            <p>
                                                In emergencies, contact authorities first. After ensuring safety and notifying authorities, report the incident to iPick. Misuse of the iPick Emergency Hotline for non-emergency issues or false reports is subject to penalties.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <section id="community">
                                    <h2 className="text-xl font-semibold mb-2">3. iPick Community Conduct</h2>

                                    <div className="space-y-4 text-base">
                                        <div>
                                            <h3 className="font-semibold">Adherence to Terms</h3>
                                            <p>
                                                You must be 18 to hold an iPick account. Minors must always be accompanied by an adult. For iPickFood, you must be of legal age to purchase alcohol.
                                                <br />
                                                Avoid booking rides for strangers. Stay informed about our Terms of Service.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">Selecting the Appropriate Service</h3>
                                            <p>
                                                If traveling with excessive luggage or more than 4 passengers, or needing to send items, select the appropriate iPick service. Failure to do so may lead to service refusal by the driver or delivery partner.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">Proper Use of Services</h3>
                                            <p>
                                                Do not use iPick for delivering unaccompanied goods. Avoid overloading vehicles or using the service for house moving. Any arrangements outside the iPick app are not supported or safeguarded by us.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">Acting in Good Faith</h3>
                                            <p>
                                                Do not share or duplicate accounts. Provide accurate information for account management, dispute resolutions, or feedback. Use promotions only as intended.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">Accurate Payment</h3>
                                            <p>
                                                Confirm your payment method, including any promotional or reward codes, before booking. Agree on the final fare, including tolls, before leaving the vehicle. Always pay the fare shown in the iPick app.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">Account Responsibility</h3>
                                            <p>
                                                Keep your account details current. Access your account only through the official iPick app. Your password is private; never share it. Report any suspicious activities to us immediately.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <section id="breach">
                                    <h2 className="text-xl font-semibold mb-2">4. Breach of Code</h2>
                                    <div className="space-y-4 text-base">
                                        <p>
                                            Non-compliance with this Code of Conduct may result in actions taken by iPick, including temporary or permanent suspension of your account.
                                        </p>
                                    </div>
                                </section>

                                <section id="commitment">
                                    <h2 className="text-xl font-semibold mb-2">5. Commitment to Community</h2>
                                    <div className="space-y-4 text-base">
                                        <p>
                                            Non-compliance with this Code of Conduct may result in actions taken by iPick, including temporary or permanent suspension of your account.
                                        </p>
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
