// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";

// const NavLinks = [
//   {
//     name: "Home",
//     href: "/",
//   },
//   {
//     name: "Enter Contest",
//     href: "/submit",
//   },
//   {
//     name: "The Prize",
//     href: "/the-prize",
//   },
//   {
//     name: "Contest Rules",
//     href: "/contest-rules",
//   },
//   {
//     name: "Past Winners",
//     href: "/past-winners",
//   },

//   {
//     name: "About",
//     href: "/about",
//   },
// ];

// export default function Navigation() {
//   const pathname = usePathname();
//   const [isHome, setIsHome] = useState(false);

//   const isActive = (href: string) => {
//     // Exact match for home page
//     if (href === "/" && pathname === "/") {
//       // setIsHome(true);
//       return true;
//     }
//     // For other pages, check if pathname starts with href (but not home)
//     if (href !== "/" && pathname.startsWith(href)) {
//       // setIsHome(false);
//       return true;
//     }
//     // setIsHome(false);
//     return false;
//   };

//   useEffect(() => {
//     if (pathname === "/") {
//       setIsHome(true);
//     } else {
//       setIsHome(false);
//     }
//   }, [pathname]);

//   console.log(isHome);

//   return (
//     <nav
//       className={`fixed top-0 w-full z-50 ${
//         isHome
//           ? "bg-transparent border-transparent backdrop-blur-xs"
//           : "bg-black/20 backdrop-blur-sm border-b border-gray-800/20"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto py-4">
//         <div className="flex items-center justify-between gap-6">
//           <Link href="/" className="flex items-center gap-4">
//             <Image
//               height={10}
//               width={10}
//               src="./logo.png"
//               alt=""
//               className="w-fit h-10 mr-4"
//             />
//           </Link>
//           <div className="flex items-center gap-4">
//             {NavLinks.map((link) => (
//               <Link
//                 href={link.href}
//                 key={link.name}
//                 className={`px-4 py-2 border rounded-md text-sm font-medium transition ${
//                   isActive(link.href)
//                     ? "bg-white text-black border-white"
//                     : "border-gray-200 text-gray-50 hover:text-white hover:bg-black/80 hover:border-gray-400"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NavLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Enter Contest",
    href: "/submit",
  },
  {
    name: "The Prize",
    href: "/the-prize",
  },
  {
    name: "Contest Rules",
    href: "/contest-rules",
  },
  {
    name: "Past Winners",
    href: "/past-winners",
  },

  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isHome, setIsHome] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDashboardRoute, setIsDashboardRoute] = useState(false);

  const isActive = (href: string) => {
    // Exact match for home page
    if (href === "/" && pathname === "/") {
      return true;
    }
    // For other pages, check if pathname starts with href (but not home)
    if (href !== "/" && pathname.startsWith(href)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (pathname === "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
    if (pathname.startsWith("/dashboard")) {
      setIsDashboardRoute(true);
    } else {
      setIsDashboardRoute(false);
    }
  }, [pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 ${isDashboardRoute ? "hidden" : ""} ${
        isHome
          ? "bg-transparent border-transparent backdrop-blur-xs"
          : "bg-black/20 backdrop-blur-sm border-b border-gray-800/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              height={40}
              width={40}
              src="./logo.png"
              alt="Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {NavLinks.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className={`px-3 xl:px-4 py-2 border rounded-md text-xs xl:text-sm font-medium transition whitespace-nowrap ${
                  isActive(link.href)
                    ? "bg-white text-black border-white"
                    : "border-gray-200 text-gray-50 hover:text-white hover:bg-black/80 hover:border-gray-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-50 hover:text-white transition duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[60px] bg-black/95 backdrop-blur-md">
            <div className="flex flex-col items-center bg-card py-5 pb-10 justify-start pt-8 px-4 space-y-4 overflow-y-auto max-h-[calc(100vh-60px)]">
              {NavLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.name}
                  className={`w-full max-w-sm px-6 py-3 border rounded-md text-sm font-medium transition text-center ${
                    isActive(link.href)
                      ? "bg-white text-black border-white"
                      : "border-gray-200 text-gray-50 hover:text-white hover:bg-black/80 hover:border-gray-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
