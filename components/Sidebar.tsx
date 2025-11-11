import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Cookies from "js-cookie";
import { ChartNoAxesGantt, Cog, FileText, Home, LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const dashboardLinks = [
  { name: "Overview", href: "/dashboard", icon: Home },
  {
    name: "Invitation Code",
    href: "/dashboard/invitation-code",
    icon: ChartNoAxesGantt,
  },
  { name: "Submissions", href: "/dashboard/submissions", icon: FileText },

  { name: "Settings", href: "/dashboard/account", icon: Cog },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    Cookies.remove("__ACCESS-TOKEN");
    router.push("/login");
  };

  // Function to check if route is active
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Trigger - Assuming this is placed where needed, e.g., in header */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
            <Home className="h-4 w-4" />
            <span className="sr-only">Open Dashboard Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  Dashboard
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {dashboardLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Button
                    key={link.href}
                    asChild
                    variant={active ? "secondary" : "ghost"}
                    className="justify-start w-full h-auto py-3 px-4"
                  >
                    <Link href={link.href}>
                      <Icon className="mr-3 h-4 w-4" />
                      {link.name}
                    </Link>
                  </Button>
                );
              })}
            </nav>
            <div className="p-4 border-t border-border">
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-64 bg-background border-r border-border p-6 overflow-y-auto">
        <Link href="/" className="block">
          <h2 className="text-2xl font-bold text-foreground mb-8 hover:text-yellow-500 transition-all">
            Cut to Black Prize
          </h2>
        </Link>

        <nav className="space-y-2 mb-8 flex-1">
          {dashboardLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Button
                key={link.href}
                asChild
                variant={active ? "secondary" : "ghost"}
                className="justify-start w-full h-auto py-3 px-4"
              >
                <Link href={link.href}>
                  <Icon className="mr-3 h-4 w-4" />
                  {link.name}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="mt-auto">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
