'use client';
import { motion } from 'framer-motion';

export default function OverviewSection() {
    const points = [
        {
            title: 'Passenger App',
            description: 'Book rides, track your driver, and make payments seamlessly for a safe and convenient experience.',
        },
        {
            title: 'Driver App',
            description: 'Manage ride requests, navigate efficiently, and track earnings to optimize operations.',
        },
        {
            title: 'Empowering Drivers',
            description: 'Thorough understanding of the platform enables faster, reliable services and supports iPick’s mission.',
        },
        {
            title: 'iPick Mission & Vision',
            description: 'iPick redefines urban mobility in the Philippines, and drivers play a key role in realizing this vision.',
        },
    ];

    return (
        <section className="relative bg-gray-900 py-24 sm:py-32 overflow-hidden">
            {/* Floating background shapes */}
            <motion.div
                className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-gradient-to-tr from-green-400 via-yellow-300 to-orange-400 opacity-20 blur-3xl pointer-events-none"
                animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-indigo-400 opacity-20 blur-3xl pointer-events-none"
                animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: '-50px' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 relative inline-block">
                        Platform Overview
                        <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></span>
                    </h2>
                    <p className="mt-6 text-lg sm:text-xl text-gray-300">
                        The iPick platform consists of two main interfaces: the passenger app and the driver app. Understanding both is key to delivering efficient services and contributing to our mission.
                    </p>
                </motion.div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {points.map((point, index) => (
                        <motion.div
                            key={point.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: '-50px' }}
                            transition={{ duration: 0.8, delay: index * 0.2, ease: 'easeInOut' }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="flex flex-col items-start p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg hover:shadow-2xl transition-transform cursor-default"
                        >
                            <h3 className="text-xl font-semibold text-white mb-2">{point.title}</h3>
                            <p className="text-gray-300 leading-relaxed text-base md:text-lg">{point.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}