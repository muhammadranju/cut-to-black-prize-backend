"use client";

import { User } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sulfiye (M) Leder",
      rating: 5,
      text: "The quality of the design is top-notch, and I love how organized the files are. It's easy to find what I need.",
    },
    {
      name: "Sulfiye (M) Leder",
      rating: 5,
      text: "The quality of the design is top-notch, and I love how organized the files are. It's easy to find what I need.",
    },
    {
      name: "Sulfiye (M) Leder",
      rating: 5,
      text: "The quality of the design is top-notch, and I love how organized the files are. It's easy to find what I need.",
    },
    {
      name: "Sulfiye (M) Leder",
      rating: 5,
      text: "The quality of the design is top-notch, and I love how organized the files are. It's easy to find what I need.",
    },
    {
      name: "Sulfiye (M) Leder",
      rating: 5,
      text: "The quality of the design is top-notch, and I love how organized the files are. It's easy to find what I need.",
    },
    {
      name: "Sulfiye (M) Leder",
      rating: 5,
      text: "The quality of the design is top-notch, and I love how organized the files are. It's easy to find what I need.",
    },
  ];

  return (
    <section className="w-full py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Testimonials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-yellow-100/80 rounded-lg p-6 transition-colors hover:border-white hover:bg-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                  <span>
                    <User />
                  </span>
                </div>
                <div>
                  <p className="text-yellow-500 text-sm font-semibold">
                    {testimonial.name}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-500">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
