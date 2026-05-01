"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, BarChart3, UserPlus } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

//navigation link
  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Timeline", href: "/timeline", icon: <MessageSquare size={18} /> },
    { name: "Stats", href: "/stats", icon: <BarChart3 size={18} /> },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
              <img src="/logo.png" alt="" />
            </Link>
          </div>

        
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-1 py-1 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-blue-500"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </div>

         
          <div className="md:hidden flex items-center">
             <button className="text-gray-500 p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
             </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;