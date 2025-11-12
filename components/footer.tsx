"use client";

import { Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Footer() {
  const [isDashboardRoute, setIsDashboardRoute] = useState(false);

  const pathname = usePathname(); // Get current route

  useEffect(() => {
    if (pathname.startsWith("/dashboard")) {
      setIsDashboardRoute(true);
    } else {
      setIsDashboardRoute(false);
    }
  }, [pathname]);

  return (
    <footer
      className={`w-full bg-card border-t border-yellow-500 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 ${
        isDashboardRoute ? "hidden" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Portfolio */}
          <div className="text-center sm:text-left">
            <h3 className="text-yellow-500 font-bold text-base sm:text-lg mb-4 sm:mb-6">
              PORTFOLIO
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition text-sm inline-block"
                >
                  Films
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition text-sm inline-block"
                >
                  First Submission
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition text-sm inline-block"
                >
                  Commercials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition text-sm inline-block"
                >
                  Branded Documentaries
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="text-yellow-500 font-bold text-base sm:text-lg mb-4 sm:mb-6">
              CONTACT
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm text-gray-400">
              <li>
                <span className="font-semibold block">Cut to Black</span>
                <p className="mt-1">2900 S. Lamar Boulevard Suite 107</p>
              </li>
              <li>
                <p>Austin, Texas 78704</p>
              </li>
              <li>
                <p className="break-words">texasfilmfest.com</p>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-yellow-500 font-bold text-base sm:text-lg mb-4 sm:mb-6">
              QUICK LINK
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/contest-rules"
                  className="text-gray-400 hover:text-yellow-500 transition text-sm inline-block"
                >
                  Contest Rules
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="text-gray-400 hover:text-yellow-500 transition text-sm inline-block"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-yellow-500 transition text-sm inline-block"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center sm:justify-start lg:justify-center gap-4 sm:gap-6 col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <a
                href="https://twitter.com/cuttoblack"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition text-sm"
              >
                <Image
                  width={80}
                  height={80}
                  src="./imdb.png"
                  alt="IMDB"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/cuttoblack/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition text-sm"
              >
                <Image
                  width={80}
                  height={80}
                  src="./linkdin.png"
                  alt="LinkedIn"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                />
              </a>
              <a
                href="https://www.facebook.com/cuttoblack"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition text-sm"
              >
                <Image
                  width={80}
                  height={80}
                  src="./facebook.png"
                  alt="Facebook"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
