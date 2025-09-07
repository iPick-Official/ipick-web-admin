'use client'
import { CloudArrowDownIcon } from "@heroicons/react/20/solid"
import { UserPlusIcon, MapPinIcon, CarIcon, CreditCardIcon, CarTaxiFrontIcon } from "lucide-react"

const features = [
    {
        name: 'Download the App',
        description:
            'Get started by downloading the iPick app from the App Store or Google Play. It’s quick, easy, and free.',
        icon: CloudArrowDownIcon,
    },
    {
        name: 'Sign Up',
        description:
            'Create your iPick account and save your preferences for a seamless experience.',
        icon: UserPlusIcon, 
    },
    {
        name: 'Open Phone’s Location',
        description:
            'Make sure to open your device’s location to enable tracking.',
        icon: MapPinIcon,
    },
    {
        name: 'Book Your Ride',
        description:
            'Open the app, enter your destination, and choose your ride option.',
        icon: CarIcon,
    },
    {
        name: 'Ride in Style',
        description:
            'Your driver will be there in no time, all set to take you on a comfortable and enjoyable journey.',
        icon: CarTaxiFrontIcon,
    },
    {
        name: 'Rate and Pay',
        description:
            'After your ride, kindly rate your experience and pay through the app. No need to worry about searching for cash or cards.',
        icon: CreditCardIcon, 
    },
]

export default function FeaturesSection() {
    return (
        <section id="learn-more" className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        How It Works?
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-700">
                        The iPick Mobile App is designed to provide a seamless and user-friendly experience for both passengers and drivers. It is divided into two key features: iPick Passenger and iPick Driver, each tailored to meet the specific needs of its users.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500">
                                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}
