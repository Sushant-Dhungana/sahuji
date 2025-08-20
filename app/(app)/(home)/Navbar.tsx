"use client";
import * as React from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "bg-white hover:bg-slate-300 rounded-md hover:border-primary border-transparent",
        isActive &&
          "bg-slate-300 text-white hover:bg-slate-300 hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];
export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <nav className="bg-gray-800 p-4 items-center flex flex-row justify-between">
      <Link href="/" className="pl-6 items-center">
        <span
          className={cn("text-2xl font-semibold text-white", poppins.className)}
        >
          Sushant
        </span>
      </Link>
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.label}
            <NavbarSidebar
              open={isSidebarOpen}
              onOpenChange={setIsSidebarOpen}
              items={navbarItems}
            />
          </NavbarItem>
        ))}
      </div>
      <div className="hidden lg:flex items-center gap-2">
        <Button variant="outline" className="text-white bg-red-500" asChild>
          <Link prefetch href="/sign-in">
            Login
          </Link>
        </Button>
        <Button variant="default" className="text-white" asChild>
          <Link prefetch href="/sign-up">
            Sign Up
          </Link>
        </Button>
      </div>
      <div className="flex lg:hidden  items-center justify-center">
        <Button
          variant="ghost"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="size-12 border-transparent bg-white"
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
