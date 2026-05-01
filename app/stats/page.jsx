"use client";
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Link from 'next/link';
import { ArrowLeft, BarChart3 } from 'lucide-react';

const FriendshipStats = () => {
  // আপনার দেওয়া ব্যাকগ্রাউন্ড ইমেজের লিঙ্ক
  const bgImageUrl = "https://images.unsplash.com/photo-1647282518004-f37573ae12d4?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZW5kcyUyMHRvZ2V0aGVyfGVufDB8fDB8fHww";

  const data = [
    { name: 'Text', value: 45, color: '#8B5CF6' }, 
    { name: 'Call', value: 30, color: '#365E44' }, 
    { name: 'Video', value: 25, color: '#4ADE80' }, 
  ];

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      {/* ডার্ক ওভারলে */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="flex-grow flex flex-col items-center z-10 relative p-4 md:p-10">
        
        {/* ব্যাক বাটন */}
        <div className="w-full max-w-4xl text-left mb-6">
          <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium w-fit">
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
        </div>

        {/* মেইন কন্টেনার - গ্লাস লুক */}
        <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-6 md:p-12 mb-10">
          <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-6">
            <div className="bg-[#1D3D32] p-3 rounded-2xl">
              <BarChart3 className="text-white" size={28} />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Friendship Analytics
            </h1>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-500 mb-8 uppercase tracking-widest text-center">
              Interaction Distribution
            </h3>
            
            <div className="h-[350px] w-full flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={data} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={90} 
                    outerRadius={120} 
                    paddingAngle={8} 
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="#fff" 
                        strokeWidth={2} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend 
                    iconType="circle" 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    formatter={(value) => <span className="text-gray-700 font-bold px-2">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* অতিরিক্ত ইনফো কার্ড (অপশনাল) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {data.map((item, idx) => (
               <div key={idx} className="bg-white/50 p-4 rounded-2xl text-center border border-white/40">
                  <p className="text-gray-500 text-xs font-bold uppercase">{item.name}</p>
                  <p className="text-2xl font-black mt-1" style={{color: item.color}}>{item.value}%</p>
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#1D3D32] text-white py-12 px-4 w-full z-10 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">KeenKeeper</h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-sm mb-10 leading-relaxed">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
          <div className="flex justify-center gap-6 mb-10">
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
          <div className="border-t border-gray-600 my-8 opacity-30"></div>
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
    </div>
  );
};

export default FriendshipStats;