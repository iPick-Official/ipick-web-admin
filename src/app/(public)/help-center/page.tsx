'use client'

import Footer from '@/components/LandingPageFooter'
import Navbar from '@/components/Navbar'

export default function HelpCenter() {
    return (
        <>
            <div className="isolate bg-white dark:bg-zinc-900 px-6 py-24 sm:py-32 lg:px-8 min-h-screen">
                <Navbar />

                {/* Background Blur Blob */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6fbf73] to-[#FF9E2A] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>

                {/* Title & Subtitle */}
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                        Report and Resolution Center
                    </h2>
                    <p className="mt-2 text-lg">
                        At iPick, we prioritize your satisfaction and safety. If you have any concerns, feedback, or need assistance, we&apos;re here to help.
                    </p>
                    <p className="mt-4 text-sm ">Contact Us: <strong>(+63) 967-948-0032</strong></p>
                </div>

                {/* Form */}
                <form
                    action="#"
                    method="POST"
                    className="mx-auto mt-16 max-w-xl sm:mt-20"
                >
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        {/* Full Name */}
                        <div className="sm:col-span-2">
                            <label htmlFor="full-name" className="block text-sm font-semibold">
                                Your Full Name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="full-name"
                                    name="full-name"
                                    type="text"
                                    className="block w-full rounded-md bg-white dark:bg-zinc-700 px-3.5 py-2 text-base outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-green-600"
                                    required
                                />
                            </div>
                        </div>

                        {/* Booking ID */}
                        <div className="sm:col-span-2">
                            <label htmlFor="booking-id" className="block text-sm font-semibold">
                                Booking ID
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="booking-id"
                                    name="booking-id"
                                    type="text"
                                    placeholder="e.g. A1B2C3D4E5"
                                    pattern="^[A-Za-z0-9]{10}$"
                                    title="Booking ID must be 10 alphanumeric characters (letters and numbers only)"
                                    className="block w-full rounded-md bg-white dark:bg-zinc-700 px-3.5 py-2 text-base outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-green-600"
                                    required
                                />
                            </div>
                            <p className="mt-1 text-sm ">
                                Booking ID must be 10 characters long, containing only letters and numbers.
                            </p>
                        </div>

                        {/* Email */}
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold">
                                Email
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white dark:bg-zinc-700 px-3.5 py-2 text-base outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-green-600"
                                    required
                                />
                            </div>
                        </div>

                        {/* Contact Number */}
                        <div className="sm:col-span-2">
                            <label htmlFor="contact-number" className="block text-sm font-semibold">
                                Contact Number
                            </label>
                            <div className="mt-2.5 relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className=" text-sm flex items-center gap-1">
                                        🇵🇭 +63
                                    </span>
                                </div>
                                <input
                                    type="tel"
                                    name="contact-number"
                                    id="contact-number"
                                    maxLength={10}
                                    placeholder="9123456789"
                                    pattern="[0-9]{10}"
                                    className="block w-full rounded-md bg-white dark:bg-zinc-700 pl-20 pr-3.5 py-2 text-base outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-green-600"
                                    required
                                />
                            </div>
                        </div>

                        {/* Issue Type */}
                        <div className="sm:col-span-2">
                            <label htmlFor="issue-type" className="block text-sm font-semibold">
                                Issue Type
                            </label>
                            <div className="mt-2.5">
                                <select
                                    id="issue-type"
                                    name="issue-type"
                                    className="block w-full rounded-md bg-white dark:bg-zinc-700 px-3.5 py-2 text-base outline outline-1 outline-gray-300 focus:outline-2 focus:outline-green-600"
                                    required
                                >
                                    <option value="">-- Select an Issue --</option>
                                    <option value="safety">Safety Concerns</option>
                                    <option value="driver">Driver Feedback</option>
                                    <option value="technical">Technical Issues</option>
                                    <option value="general">General Feedback</option>
                                </select>
                            </div>
                        </div>

                        {/* Comment or Message */}
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold">
                                Comment or Message
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    className="block w-full rounded-md bg-white dark:bg-zinc-700 px-3.5 py-2 text-base outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-green-600"
                                    placeholder="Describe your concern or feedback in detail..."
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition"
                        >
                            Submit Report
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}
