"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What kind of short films can I watch here?",
      answer:
        "Our platform showcases independent and emerging filmmakers – featuring a variety of genres like drama, thriller, and social stories.",
    },
    {
      question: "Do I need a subscription to watch the films?",
      answer:
        "Some content is free, while certain premium films may require a subscription or one-time payment.",
    },
    {
      question: "Can I submit my own film?",
      answer:
        'Yes! We encourage new creators. You can upload your film through the "Submit Film" section by filling out the form.',
    },
  ];

  return (
    <section className="w-full  py-10 mb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card border border-white/20 rounded-lg overflow-hidden hover:border-yellow-100/80 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 hover:bg-neutral-800 transition"
              >
                <span className="text-left text-white font-semibold">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-yellow-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-400 border-t border-neutral-800">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
