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
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/auth");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
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
      <header className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 sm:pt-32 sm:pb-20 relative overflow-hidden bg-gradient-to-b from-white via-white to-gray-100">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-orange-100 opacity-70 blur-3xl z-0"></div>
        <div className="absolute inset-0 bg-orange opacity-60 filter blur-2xl rounded-full z-10"></div>
        <div className="relative z-20 text-gray-800 max-w-3xl mx-auto">
          <h1 className="flex items-center gap-2 text-3xl sm:text-5xl font-bold text-gray-800 mb-4 leading-snug justify-center">
            <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-gray-800" />
            Komyut<span className="text-orange-500">PH</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-lg sm:max-w-2xl mx-auto mb-8">
            KomyutPH provides an advanced, real-time tracking and ticketing system for both jeepneys and buses. Designed for commuters and drivers alike, our platform enhances operational efficiency, reduces wait times, and streamlines fare collection—ensuring a smooth, reliable, and modern transport experience for all stakeholders.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
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
            className="shadow w-full object-cover"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Real-Time Vehicle Tracking
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Track both jeepneys and buses live on an interactive map, view accurate arrival times, and significantly reduce waiting time. KomyutPH uses GPS-enabled tracking to provide real-time updates, helping commuters make informed travel decisions and avoid unnecessary delays.
              <br /><br />
              For operators, our system delivers powerful insights into route performance, vehicle location, and driver behavior—enabling better decision-making, improved scheduling, and reduced fuel costs. The platform also supports traffic-aware routing and automated notifications to keep everyone informed on the go.
              <br /><br />
              Whether you're catching a ride or managing a fleet, KomyutPH ensures transparency, reliability, and convenience in every journey. It's not just tracking—it's transforming how public transport works in the Philippines.
            </p>
          </div>
        </section>

        {/* POS Feature */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Integrated Ticketing System
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Simplify fare collection with our built-in Ticketing solution. Digital payments, automated fare calculation, and driver incentives are all included to streamline transactions and reduce cash handling.
              <br /><br />
              Our system supports multiple payment methods—including QR codes, NFC cards, and mobile wallets—ensuring flexibility and convenience for every passenger. Fare prices are automatically computed based on distance traveled, minimizing human error and disputes.
              <br /><br />
              For drivers and operators, the Ticketing system provides daily reports, real-time earnings tracking, and performance-based incentives. This not only boosts transparency but also motivates improved service and accountability. KomyutPH makes fare management faster, safer, and smarter.
            </p>
          </div>
          <Image
            src="/konduktor.png"
            alt="POS System"
            width={500}
            height={400}
            className="shadow w-full object-cover order-1 md:order-2"
          />
        </section>
      </main>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="w-full min-h-screen py-12 sm:py-16 bg-gray-50 flex flex-col justify-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          Pricing Plans
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 sm:px-10 md:px-20">
          {/* Basic Plan */}
          <div className="p-6 border border-gray-300 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Basic</h3>
            <p className="text-xl text-gray-600 mb-6">$10/month</p>
            <ul className="text-left text-gray-600 mb-6">
              <li>Real-time jeepney tracking</li>
              <li>Basic POS features</li>
              <li>Email support</li>
              <li>Access to 10 routes</li>
            </ul>
            <p className="text-sm text-gray-500 mb-4">Perfect for small operators and commuters looking for basic features.</p>
            <a
              href="#"
              className="px-5 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Choose Basic
            </a>
          </div>

          {/* Pro Plan */}
          <div className="p-6 border border-gray-300 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Pro</h3>
            <p className="text-xl text-gray-600 mb-6">$30/month</p>
            <ul className="text-left text-gray-600 mb-6">
              <li>All Basic features</li>
              <li>Advanced POS features</li>
              <li>Priority support</li>
              <li>Access to 50 routes</li>
              <li>Driver incentives integration</li>
            </ul>
            <p className="text-sm text-gray-500 mb-4">Ideal for growing operators who need advanced features and faster support.</p>
            <a
              href="#"
              className="px-5 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Choose Pro
            </a>
          </div>

          {/* Enterprise Plan */}
          <div className="p-6 border border-gray-300 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Enterprise</h3>
            <p className="text-xl text-gray-600 mb-6">$50/month</p>
            <ul className="text-left text-gray-600 mb-6">
              <li>All Pro features</li>
              <li>Custom solutions tailored to your business</li>
              <li>24/7 dedicated support</li>
              <li>Access to unlimited routes</li>
              <li>Data analytics and reporting</li>
            </ul>
            <p className="text-sm text-gray-500 mb-4">For large enterprises with custom needs, complete support, and full access to all features.</p>
            <a
              href="#"
              className="px-5 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Choose Enterprise
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="px-6 sm:px-10 md:px-20 py-12 sm:py-16 bg-gray-800 text-gray-300"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8">
          Contact Us
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-center text-gray-200 mb-6">
            Have questions? Reach out to us and we'll be happy to help.
          </p>
          <div className="text-center">
            <a
              href="mailto:support@komyutph.com"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Send us an email
            </a>
          </div>
        </div>
      </section>

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
