"use client";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import Navbar from "@/components/Navbar";
import HeroHeader from "@/components/HeroHeader";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (

    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <HeroHeader />
      <StatsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
