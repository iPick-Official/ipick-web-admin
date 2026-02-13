'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { HiShieldCheck } from 'react-icons/hi';
import { FaDownload, FaUsers, FaUserTie } from 'react-icons/fa';

const stats = [
    { id: 1, name: 'Safety', value: 99, suffix: '%', icon: HiShieldCheck },
    { id: 2, name: 'Downloads', value: 3000, icon: FaDownload },
    { id: 3, name: 'Drivers', value: 500, icon: FaUserTie },
    { id: 4, name: 'Passengers', value: 6000, icon: FaUsers },
];

export default function StatsSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (inView) {
            setHasAnimated(true);
        }
    }, [inView]);

    return (
        <section ref={ref} className="bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Why Choose iPick?
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-300">
                        Trusted by thousands of passengers and drivers, iPick continues to provide fast, reliable, and safe transportation every day.
                    </p>
                </div>

                {/* Statistics Grid */}
                <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4 items-center">
                                <Icon className="text-gray-400 text-3xl" />
                                <dd className="order-first text-4xl sm:text-6xl font-bold tracking-tight text-orange-400">
                                    {hasAnimated ? (
                                        <CountUp
                                            end={stat.value}
                                            duration={2}
                                            separator=","
                                            suffix={stat.suffix || ''}
                                        />
                                    ) : (
                                        '0'
                                    )}
                                </dd>
                                <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                            </div>
                        );
                    })}
                </dl>
            </div>
        </section>
    );
}
