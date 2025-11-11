"use client";
import FAQ from "@/components/home/faq";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import Testimonials from "@/components/home/testimonials";
import WhyChooseUs from "@/components/home/why-choose-us";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
    </div>
  );
}
