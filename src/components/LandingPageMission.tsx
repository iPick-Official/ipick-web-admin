'use client';
import { motion } from 'framer-motion';

const values = [
    {
        title: 'Empower Mobility',
        description: 'Facilitating effortless movement and breaking down geographical barriers for all individuals.',
    },
    {
        title: 'Enhance Lives',
        description: 'Offering safe, reliable, and stress-free transportation solutions.',
    },
    {
        title: 'Foster Connections',
        description: 'Creating shared experiences that bridge people, cultures, and places.',
    },
    {
        title: 'Lead Sustainability',
        description: 'Promoting eco-friendly transportation choices to ease traffic congestion and reduce carbon emissions.',
    },
    {
        title: 'Innovate for Tomorrow',
        description: 'Embracing technological advancements to set new standards in transportation.',
    },
];

export default function MissionValuesSection() {
    return (
        <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
            {/* Floating background shapes */}
            <div className="absolute -top-32 -left-32 w-72 h-72 bg-gradient-to-tr from-green-200 via-yellow-200 to-pink-200 rounded-full opacity-30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200 rounded-full opacity-30 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: '-50px' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 relative inline-block">
                        Mission & Values
                        <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></span>
                    </h2>
                    <p className="mt-6 text-lg sm:text-xl text-gray-600">
                        Drivers are the frontline representatives of iPick. Aligning with our mission and values ensures consistent, high-quality service for every passenger.
                    </p>
                </motion.div>

                {/* Mission & Vision Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: '-50px' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="bg-white rounded-2xl p-10 shadow-md mb-16 border border-gray-100 text-center"
                >
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Mission</h3>
                    <p className="text-gray-700 mb-6 text-lg">
                        Redefining urban mobility with convenient, safe, and efficient ride-hailing services.
                    </p>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Vision</h3>
                    <p className="text-gray-700 text-lg">
                        To provide exceptional ride-hailing service for Filipinos, one place at a time.
                    </p>
                </motion.div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: '-50px' }}
                            transition={{ duration: 0.2, delay: index * 0.2, ease: 'easeInOut' }}
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center p-6 rounded-2xl bg-white shadow hover:shadow-xl transition-transform cursor-default text-center border border-gray-100"
                        >
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}