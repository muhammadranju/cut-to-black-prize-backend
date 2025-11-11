import ContentWrapper from "@/components/content-wrapper";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

const ThankYou: React.FC = () => {
  return (
    <ContentWrapper>
      {/* Success Icon */}
      <div className="flex justify-center mb-8 mt-10">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full"></div>
          <div className="relative bg-green-500/10 border-2 border-green-500 rounded-full p-6">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-500 mb-6">
          Thank You!
        </h1>
        <p className="text-2xl md:text-3xl text-white mb-4 font-medium">
          Your screenplay has been received.
        </p>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          A confirmation email has been sent to your registered email address.
          Our judging panel will review your screenplay and make a decision
          within 10 - 15 days. You will receive a notification email with the
          decision and the next steps for your screenplay submission.
          <span className="text-yellow-500 font-semibold"></span>.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Link href="/">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg px-8 py-6 rounded-lg transition-all hover:scale-105">
            BACK TO HOME
          </Button>
        </Link>
      </div>

      {/* Contact Section */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gray-900/50 border border-gray-800 rounded-full px-6 py-3">
          <Mail className="w-4 h-4 text-gray-400" />
          <p className="text-gray-400 text-sm">
            Questions?{" "}
            <a
              href="#"
              className="text-yellow-500 hover:text-yellow-400 font-medium underline"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default ThankYou;
