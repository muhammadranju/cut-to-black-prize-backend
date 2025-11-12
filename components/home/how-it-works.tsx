"use client";

import { Clapperboard, PartyPopper, Youtube } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Browse Short Films",
      description: "Find the perfect short film",
      icon: <Clapperboard />,
    },
    {
      title: "Select & Play",
      description: "Click and watch instantly",
      icon: <Youtube />,
    },
    {
      title: "Share & Enjoy",
      description: "Share with friends anytime.",
      icon: <PartyPopper />,
    },
  ];

  return (
    <section className="w-full  py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center border border-yellow-100/60 rounded-lg p-8 transition-colors hover:border-white hover:bg-white/10"
            >
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-yellow-400/40 to-yellow-500 flex items-center justify-center mb-6">
                <span className="text-3xl">{step.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
