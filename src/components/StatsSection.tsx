'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const stats = [
    { id: 1, name: 'Safety', value: 99.9, suffix: '%' },
    { id: 2, name: 'Downloads', value: 5000 },
    { id: 3, name: 'Drivers', value: 500 },
    { id: 4, name: 'Passengers', value: 46000 },
];

export default function StatsSection() {
    const { ref, inView } = useInView({
        triggerOnce: true, // only trigger once
        threshold: 0.3, // 30% of the section needs to be visible
    });

    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (inView) {
            setHasAnimated(true);
        }
    }, [inView]);

    return (
        <section ref={ref} className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Why Choose iPick?
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">
                        Trusted by thousands of riders and drivers, iPick continues to provide fast, reliable, and safe transportation every day.
                    </p>
                </div>

                {/* Statistics Grid */}
                <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                            <dd className="order-first text-4xl sm:text-6xl font-bold tracking-tight text-orange-600">
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
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
