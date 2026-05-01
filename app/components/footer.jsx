"use client";
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#1D3D32] text-white py-12 px-4 mt-20 w-full">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* --- Logo & Description --- */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">KeenKeeper</h2>
        <p className="max-w-2xl mx-auto text-gray-300 text-sm md:text-base mb-10 leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        {/* --- Social Links --- */}
        <div className="mb-10">
          <h3 className="text-lg font-medium mb-4">Social Links</h3>
          <div className="flex justify-center gap-6">
            <Link href="#" className="bg-white p-2 rounded-full hover:scale-110 transition-transform">
              <img src="/instagram.png" alt="Instagram" className="w-6 h-6" />
            </Link>
            <Link href="#" className="bg-white p-2 rounded-full hover:scale-110 transition-transform">
              <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
            </Link>
            <Link href="#" className="bg-white p-2 rounded-full hover:scale-110 transition-transform">
              <img src="/twitter.png" alt="Twitter" className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* --- Divider Line --- */}
        <div className="border-t border-gray-600 my-8 opacity-30"></div>

        {/* --- Bottom Footer --- */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;