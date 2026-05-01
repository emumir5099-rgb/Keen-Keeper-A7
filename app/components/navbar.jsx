"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, BarChart3, Menu, X, User } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Timeline", href: "/timeline", icon: <MessageSquare size={20} /> },
    { name: "Stats", href: "/stats", icon: <BarChart3 size={20} /> },
  ];

  return (
    <>
     
      <nav className="bg-white/70 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
          
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
               
              </Link>
            </div>

            
            <div className="hidden md:flex space-x-6 items-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-[#1D3D32] text-white shadow-lg"
                        : "text-gray-600 hover:bg-[#1D3D32]/10 hover:text-[#1D3D32]"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                );
              })}
            </div>

            
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(true)}
                className="text-[#1D3D32] p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-bold text-[#1D3D32]">Menu</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          
          <div className="space-y-4 flex-grow">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-medium transition-all ${
                    isActive
                      ? "bg-[#1D3D32] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </div>

         
          <div className="mt-auto border-t border-gray-100 pt-6">
            <div className="flex items-center gap-3 px-4 py-2 text-gray-500">
              <User size={20} />
              <span className="text-sm font-medium">Mohammad Emu Mir</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;