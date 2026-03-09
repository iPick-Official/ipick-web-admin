'use client'

import Footer from '@/components/LandingPageFooter'
import Navbar from '@/components/Navbar'

export default function DiscountPage() {
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
                        Apply for 20% Discount
                    </h2>
                    <p className="mt-2 text-lg">
                        Fill out the form to claim your 20% discount. A representative will verify your ID.
                    </p>
                </div>

                {/* Form */}
                <form
                    action="#"
                    method="POST"
                    className="mx-auto mt-16 max-w-xl sm:mt-20"
                    encType="multipart/form-data"
                >
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        {/* First Name */}
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-semibold">
                                First name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md bg-white dark:bg-zinc-700 px-3.5 py-2 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600"
                                />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="last-name" className="block text-sm font-semibold">
                                Last name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="last-name"
                                    name="last-name"
                                    type="text"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md bg-white dark:bg-zinc-700 px-3.5 py-2 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600"
                                />
                            </div>
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
                                    className="block w-full rounded-md bg-white dark:bg-zinc-700 px-3.5 py-2 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600"
                                />
                            </div>
                        </div>

                        {/* Mobile Number */}
                        <div className="sm:col-span-2">
                            <label htmlFor="mobile-number" className="block text-sm font-semibold">
                                Mobile Number
                            </label>
                            <div className="mt-2.5 relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className=" text-sm flex items-center gap-1">
                                        🇵🇭 +63
                                    </span>
                                </div>
                                <input
                                    type="tel"
                                    name="mobile-number"
                                    id="mobile-number"
                                    autoComplete="tel-national"
                                    maxLength={10}
                                    placeholder="9123456789"
                                    className="block w-full rounded-md bg-white dark:bg-zinc-700 pl-20 pr-3.5 py-2 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600"
                                    pattern="[0-9]{10}"
                                    required
                                />
                            </div>
                            <p className="mt-1 text-sm ">Enter 10-digit number without the leading 0.</p>
                        </div>

                        {/* ID Image Upload */}
                        <div className="sm:col-span-2">
                            <label htmlFor="id-image" className="block text-sm font-semibold">
                                Upload ID Image
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="id-image"
                                    name="id-image"
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-base 
                                    file:mr-4 file:py-2 file:px-4 
                                    file:rounded-md file:border-0 
                                    file:bg-green-600 file:text-white 
                                    file:transition-colors file:duration-300 
                                    hover:file:bg-green-700"
                                />

                                <p className="mt-1 text-sm ">Accepted formats: JPG, PNG, etc.</p>
                            </div>
                        </div>

                        {/* Agree to terms */}
                        <div className="flex gap-x-4 sm:col-span-2">
                            <div className="flex h-6 items-center">
                                <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px outline-offset-2 outline-green-600 transition-colors duration-200 ease-in-out has-checked:bg-green-600 has-focus-visible:outline-2">
                                    <span className="size-4 rounded-full bg-white dark:bg-zinc-700 shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5" />
                                    <input
                                        id="agree"
                                        name="agree"
                                        type="checkbox"
                                        aria-label="Agree to terms"
                                        className="absolute inset-0 appearance-none focus:outline-hidden"
                                        required
                                    />
                                </div>
                            </div>
                            <label htmlFor="agree" className="text-sm">
                                I agree to the{' '}
                                <a href='/terms-of-service' className="font-semibold text-green-600">
                                    terms and conditions
                                </a>
                                .
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition"
                        >
                            Apply Now
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}
