'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { HiShieldCheck } from 'react-icons/hi';
import { FaDownload, FaUsers, FaUserTie } from 'react-icons/fa';
import { motion } from 'framer-motion';

const stats = [
    { id: 1, name: 'Safety', value: 99, suffix: '%', icon: HiShieldCheck },
    { id: 2, name: 'Downloads', value: 3847, icon: FaDownload },
    { id: 3, name: 'Drivers', value: 596, icon: FaUserTie },
    { id: 4, name: 'Passengers', value: 6846, icon: FaUsers },
];

export default function StatsSection() {
    const { ref, inView } = useInView({ threshold: 0.3 });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (inView) {
            setHasAnimated(true); // Start animation when in view
        } else {
            setHasAnimated(false); // Reset animation when scrolled out
        }
    }, [inView]);

    return (
        <section ref={ref} className="bg-gray-900 py-24 sm:py-32 relative overflow-hidden">
            {/* Background decorative shapes */}
            <div className="absolute -top-32 -left-32 w-72 h-72 bg-gradient-to-tr from-orange-400 via-yellow-400 to-green-400 rounded-full opacity-20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-green-400 via-yellow-400 to-orange-400 rounded-full opacity-20 blur-3xl pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                        Why Choose iPick?
                    </h2>
                    <p className="mt-4 text-lg sm:text-xl leading-8 text-gray-300">
                        Trusted by thousands of passengers and drivers, iPick continues to provide fast, reliable, and safe transportation every day.
                    </p>
                </div>

                {/* Statistics Grid */}
                <dl className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ delay: index * 0.2, duration: 0.8, ease: 'easeOut' }}
                                className="flex flex-col items-center gap-y-3 p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg hover:scale-105 transition-transform"
                            >
                                <div className="p-4 rounded-full bg-orange-500/20 text-orange-400 text-3xl">
                                    <Icon />
                                </div>
                                <dd className="text-4xl sm:text-5xl font-extrabold text-white">
                                    {hasAnimated ? (
                                        <CountUp
                                            end={stat.value}
                                            duration={2}
                                            separator=","
                                            suffix={stat.suffix || ''}
                                        />
                                    ) : (
                                        0
                                    )}
                                </dd>
                                <dt className="text-lg sm:text-xl text-gray-300 font-medium">
                                    {stat.name}
                                </dt>
                            </motion.div>
                        );
                    })}
                </dl>
            </div>
        </section>
    );
}