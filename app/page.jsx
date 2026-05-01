"use client";
import { Plus } from "lucide-react";
import FriendList from "./components/friendlist";
import Footer from "./components/footer";

const Banner = () => {
  // আপনার দেওয়া ব্যাকগ্রাউন্ড ইমেজের লিঙ্ক
  const bgImageUrl = "https://images.unsplash.com/photo-1647282518004-f37573ae12d4?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZW5kcyUyMHRvZ2V0aGVyfGVufDB8fDB8fHww";

  return (
    <section 
      className="relative flex flex-col items-center justify-center min-h-[500px] py-20 px-4 text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      {/* ছবির ওপর ডার্ক লেয়ার যেন টেক্সট সব ডিভাইসে পরিষ্কার থাকে */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* কন্টেন্ট যা লেয়ারের উপরে থাকবে */}
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
          Friends to keep close in your life
        </h1>
        <p className="max-w-2xl mx-auto text-gray-200 text-base md:text-xl mb-10 leading-relaxed drop-shadow-sm">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the 
          relationships that matter most.
        </p>
        <button className="flex items-center gap-2 bg-[#2D4A3E] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1D3D32] hover:scale-105 transition-all shadow-xl mx-auto group">
          <Plus size={22} className="group-hover:rotate-90 transition-transform duration-300" /> 
          Add a Friend
        </button>
      </div>
    </section>
  );
};

export default function Page() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <Banner />
      <div className="max-w-7xl mx-auto">
        <FriendList />
      </div>
      <Footer />
    </main>
  );
}