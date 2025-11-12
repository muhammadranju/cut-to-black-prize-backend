"use client";

import { UserCog } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Fast & Seamless Streaming",
      description:
        "Enjoy short films without buffering or long load times — smooth viewing",
    },
    {
      title: "Curated Short Films",
      description:
        "Every short film is handpicked for storytelling, creativity, and quality",
    },
    {
      title: "Ad-Free Viewing",
      description:
        "Watch short films without interruptions, fully focused on the",
    },
    {
      title: "Watch Anywhere",
      description:
        "Enjoy short films on any device, anywhere — on mobile, tablet, or",
    },
  ];

  return (
    <section className="w-full bg-black py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          Why Choose <span className="text-yellow-500">Us</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-yellow-100/80 rounded-lg p-6 hover:border-gray-400 transition"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center shrink-0">
                  <UserCog />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
