"use client";
import { useEffect, useState } from "react";
import { Phone, MessageSquare, Video, Users, Calendar, Filter, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link"; 

const Timeline = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState("All");

  // আপনার দেওয়া ব্যাকগ্রাউন্ড ইমেজের লিঙ্ক
  const bgImageUrl = "https://images.unsplash.com/photo-1647282518004-f37573ae12d4?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZW5kcyUyMHRvZ2V0aGVyfGVufDB8fDB8fHww";

  useEffect(() => {
    try {
      const savedTimeline = localStorage.getItem("timeline");
      if (savedTimeline) { setActivities(JSON.parse(savedTimeline)); }
    } catch (error) { setActivities([]); }
  }, []);

  const deleteActivity = (timestamp) => {
    const updatedActivities = activities.filter(item => item.timestamp !== timestamp);
    setActivities(updatedActivities);
    localStorage.setItem("timeline", JSON.stringify(updatedActivities));
  };

  const filteredActivities = activities.filter((item) => {
    if (filter === "All") return true;
    return item.type === filter.split(' ')[0];
  });

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      {/* ছবির ওপর ডার্ক ওভারলে */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="flex-grow p-6 md:p-12 z-10 relative">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 w-fit">
              <ArrowLeft size={20} /> <span className="font-medium">Back to Home</span>
            </Link>
            <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-md">Timeline</h1>
            
            <div className="relative max-w-xs">
              {/* ফিল্টার বক্সটি স্বচ্ছ করা হয়েছে */}
              <select 
                onChange={(e) => setFilter(e.target.value)} 
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg py-3 px-4 text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="All" className="text-black">Filter timeline</option>
                <option value="Calls Only" className="text-black">Calls Only</option>
                <option value="Texts Only" className="text-black">Texts Only</option>
                <option value="Video Only" className="text-black">Video Only</option>
              </select>
              <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-4">
            {filteredActivities.map((item, index) => (
              <div 
                key={item.timestamp || index} 
                className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/20 flex items-center justify-between hover:bg-white transition-all group"
              >
                <div className="flex items-center gap-5">
                  <div className={`p-4 rounded-xl ${item.type === "Call" ? "bg-blue-100 text-blue-600" : item.type === "Text" ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"}`}>
                    {item.type === "Call" ? <Phone size={22} /> : item.type === "Text" ? <MessageSquare size={22} /> : <Video size={22} />}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">
                      {item.type} <span className="font-medium text-gray-500">with {item.friendName}</span>
                    </h4>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <Calendar size={14} /> {item.date}
                    </p>
                  </div>
                </div>
                
                {/* ডিলিট বাটন */}
                <button 
                  onClick={() => deleteActivity(item.timestamp)} 
                  className="p-2 text-gray-400 hover:text-red-500 md:opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            {filteredActivities.length === 0 && (
              <div className="text-center py-20 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/10">
                <p className="text-white/50">No activities found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-[#1D3D32] text-white py-12 px-4 w-full z-10 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">KeenKeeper</h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-sm mb-10 leading-relaxed">
            Your personal shelf of meaningful connections.
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
          <p className="text-xs text-gray-400">© 2026 KeenKeeper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Timeline;