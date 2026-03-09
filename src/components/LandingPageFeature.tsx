'use client'
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CloudArrowDownIcon } from "@heroicons/react/20/solid";
import { UserPlusIcon, MapPinIcon, CarIcon, CreditCardIcon, CarTaxiFrontIcon } from "lucide-react";

const features = [
    { name: 'Download the App', description: 'Get started by downloading the iPick app from the App Store or Google Play. It’s quick, easy, and free.', icon: CloudArrowDownIcon, gradient: 'from-purple-500 to-pink-500' },
    { name: 'Sign Up', description: 'Create your iPick account and save your preferences for a seamless experience.', icon: UserPlusIcon, gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Open Phone’s Location', description: 'Make sure to open your device’s location to enable tracking.', icon: MapPinIcon, gradient: 'from-green-400 to-lime-500' },
    { name: 'Book Your Ride', description: 'Open the app, enter your destination, and choose your ride option.', icon: CarIcon, gradient: 'from-yellow-400 to-orange-500' },
    { name: 'Ride in Style', description: 'Your driver will be there in no time, all set to take you on a comfortable and enjoyable journey.', icon: CarTaxiFrontIcon, gradient: 'from-red-400 to-pink-500' },
    { name: 'Rate and Pay', description: 'After your ride, kindly rate your experience and pay through the app. No need to worry about searching for cash or cards.', icon: CreditCardIcon, gradient: 'from-indigo-500 to-purple-500' },
];

export default function FeaturesSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" }); // triggers every time scrolls in

    return (
        <section ref={sectionRef} id="learn-more" className="relative bg-white dark:bg-zinc-900 py-24 sm:py-32 overflow-hidden">
            {/* Background Floating Shapes */}
            <motion.div
                className="absolute top-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 rounded-full bg-purple-300 opacity-20 blur-3xl mix-blend-multiply"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-pink-300 opacity-20 blur-3xl mix-blend-multiply"
                animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                transition={{ duration: 12, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto max-w-2xl text-center z-10 relative">
                    <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 dark:text-white">
                        How It Works
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        The iPick Mobile App is designed to provide a seamless and user-friendly experience for both passengers and drivers. It is divided into two key features: iPick Passenger and iPick Driver, each tailored to meet the specific needs of its users.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-5xl z-10 relative">
                    <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.name}
                                className="relative rounded-xl p-6 bg-gray-50 dark:bg-zinc-800 hover:shadow-2xl cursor-pointer transition-all duration-300"
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} // re-animate when scrolling back
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                whileHover={{ y: -5 }}
                            >
                                <dt className="flex items-center gap-4">
                                    <motion.div
                                        className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} text-white`}
                                        whileHover={{ scale: 1.2, rotate: 15 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                                    </motion.div>
                                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{feature.name}</span>
                                </dt>
                                <dd className="mt-3 text-gray-600 dark:text-gray-300 leading-7">{feature.description}</dd>
                            </motion.div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}