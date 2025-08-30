"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MapPin, Menu, X } from "lucide-react";
import { Loading } from "../components/Loading";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    setLoading(true); // show loading
    setTimeout(() => {
      router.push("/auth"); // redirect after delay
    }, 1500); // 1.5s delay for effect
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading /> {/* your imported component */}
      </div>
    );
  }

  return (

    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Jeepney/Marker Icon */}
            <MapPin className="w-7 h-7 text-gray-800" />

            {/* Brand Text */}
            <span className="font-bold text-xl text-gray-800">
              Komyut<span className="text-orange-500">PH</span>
            </span>
          </div>


          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <a href="#features" className="hover:text-blue-400 duration-300">
              Features
            </a>
            <a href="#pricing" className="hover:text-blue-400 duration-300">
              Pricing
            </a>
            <a href="#contact" className="hover:text-blue-400 duration-300">
              Contact
            </a>
          </div>

          {/* CTA */}
          <a
            onClick={handleGetStarted}
            className="hidden md:block px-5 py-2 bg-blue-400 duration-300 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md px-6 py-4 flex flex-col gap-4">
            <a href="#features" className="hover:text-blue-400 duration-300">
              Features
            </a>
            <a href="#pricing" className="hover:text-blue-400 duration-300">
              Pricing
            </a>
            <a href="#contact" className="hover:text-blue-400 duration-300">
              Contact
            </a>
            <a
              onClick={handleGetStarted}
              className="px-5 py-2 bg-blue-400 duration-300 text-white rounded-lg hover:bg-blue-700 transition text-center"
            >
              Get Started
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <h1 className="flex items-center gap-2 text-3xl sm:text-5xl font-bold text-gray-800 mb-4 leading-snug">
          <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-gray-800" />
          Komyut<span className="text-orange-500">PH</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-lg sm:max-w-2xl">
          Real-time Jeepney Tracking & Integrated POS System for commuters and drivers.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            onClick={handleGetStarted}
            className="px-5 py-3 w-full sm:w-auto text-center bg-blue-400 duration-300 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            Get Started
          </a>
          <a
            href="#features"
            className="px-5 py-3 w-full sm:w-auto text-center border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-200 transition"
          >
            Learn More
          </a>
        </div>
      </header>

      {/* Features Section */}
      <main
        id="features"
        className="flex-1 px-6 sm:px-10 md:px-20 py-12 sm:py-16 grid gap-16"
      >
        {/* Tracking Feature */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <Image
            src="/jeepney.png"
            alt="Jeepney Tracking"
            width={500}
            height={400}
            className="rounded-xl shadow w-full object-cover"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Real-Time Jeepney Tracking
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Track jeepneys live on the map, know arrival times, and reduce
              waiting time. Optimized for commuters and operators.
            </p>
          </div>
        </section>

        {/* POS Feature */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Integrated POS System
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Simplify fare collection with our built-in POS solution. Digital
              payments, automated fare calculation, and driver incentives
              included.
            </p>
          </div>
          <Image
            src="/konduktor.png"
            alt="POS System"
            width={500}
            height={400}
            className="rounded-xl w-full object-cover order-1 md:order-2"
          />
        </section>
      </main>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-gray-800 text-gray-300 py-8 px-6 text-center"
      >
        <p className="mb-4 text-sm sm:text-base">
          © {new Date().getFullYear()} KomyutPH. All rights reserved.
        </p>
        <div className="flex gap-6 justify-center flex-wrap text-sm sm:text-base">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Twitter
          </a>
          <a href="mailto:support@komyutph.com" className="hover:text-white">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
