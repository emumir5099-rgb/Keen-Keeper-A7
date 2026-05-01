"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Phone, MessageSquare, Video, BellOff, Archive, Trash2, ArrowLeft } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const FriendDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [friend, setFriend] = useState(null);

  
  const bgImageUrl = "https://images.unsplash.com/photo-1647282518004-f37573ae12d4?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZW5kcyUyMHRvZ2V0aGVyfGVufDB8fDB8fHww";

  useEffect(() => {
    fetch("/friend.json") 
      .then((res) => {
        if (!res.ok) {
          throw new Error("ফাইলটি পাওয়া যায়নি (404)");
        }
        return res.json();
      })
      .then((data) => {
        const foundFriend = data.find((f) => String(f.id) === String(id));
        if (foundFriend) {
          setFriend(foundFriend);
        } else {
          console.error("এই ID দিয়ে কোনো বন্ধু পাওয়া যায়নি");
        }
      })
      .catch((err) => {
        console.error("ডাটা লোড করতে সমস্যা:", err);
      });
  }, [id]);

  const addToTimeline = (type) => {
    if (!friend) return; 
    
    const newEntry = {
      type: type,
      friendName: friend.name,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      timestamp: Date.now()
    };

    const existingTimeline = JSON.parse(localStorage.getItem("timeline") || "[]");
    localStorage.setItem("timeline", JSON.stringify([newEntry, ...existingTimeline]));
    
    toast.success(`${type} with ${friend.name} recorded!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleAction = (actionType) => {
    if (!friend) return;
    toast.info(`${actionType} action triggered for ${friend.name}`, {
      position: "top-center"
    });
  };

  if (!friend) return <div className="p-10 text-center font-bold">Loading details...</div>;

  return (
  
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
     
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <ToastContainer />
      
     
      <div className="flex-grow p-4 md:p-10 z-10 relative">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-white/80 mb-6 hover:text-white transition-colors font-medium">
          <ArrowLeft size={20} /> Back
        </button>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="md:col-span-1 space-y-6">
           
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 text-center">
              <img 
                src={friend?.picture} 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-white" 
                alt={friend?.name} 
              />
              <h2 className="text-2xl font-bold text-gray-800">{friend?.name}</h2>
              <div className="flex flex-wrap justify-center gap-2 my-4">
                <span className="bg-red-500 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  {friend?.status}
                </span>
                <span className="bg-[#1D3D32] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  {friend?.tags ? friend.tags[0] : 'N/A'}
                </span>
              </div>
              <p className="text-gray-600 italic text-sm">
                "{friend?.description || 'Former colleague, great mentor'}"
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden text-sm">
              <button onClick={() => handleAction("Snooze")} className="w-full flex items-center gap-3 p-4 hover:bg-white/50 border-b border-gray-100 transition-colors">
                <BellOff size={18} className="text-gray-400" /> Snooze 2 Weeks
              </button>
              <button onClick={() => handleAction("Archive")} className="w-full flex items-center gap-3 p-4 hover:bg-white/50 border-b border-gray-100 transition-colors">
                <Archive size={18} className="text-gray-400" /> Archive
              </button>
              <button onClick={() => handleAction("Delete")} className="w-full flex items-center gap-3 p-4 hover:bg-red-50 text-red-500 transition-colors">
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 text-center">
                <h3 className="text-3xl font-extrabold text-gray-800">{friend?.days_since_contact}</h3>
                <p className="text-gray-500 text-[9px] uppercase font-bold mt-1 tracking-widest">Days Since Contact</p>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 text-center">
                <h3 className="text-3xl font-extrabold text-gray-800">30</h3>
                <p className="text-gray-500 text-[9px] uppercase font-bold mt-1 tracking-widest">Goal (Days)</p>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 text-center">
                <h3 className="text-xl font-bold text-[#1D3D32] pt-1">Feb 27, 2026</h3>
                <p className="text-gray-400 text-[9px] uppercase font-bold mt-2 tracking-widest">Next Due</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-white/20 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Relationship Goal</h4>
                <p className="text-sm text-gray-500">
                  Connect every <span className="font-bold text-black">30 days</span>
                </p>
              </div>
              <button className="text-xs bg-white px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors shadow-sm">
                Edit
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-white/20">
              <h4 className="font-bold text-gray-800 mb-6">Quick Check-In</h4>
              <div className="grid grid-cols-3 gap-4">
                <button onClick={() => addToTimeline("Call")} className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/50 hover:bg-green-500 hover:text-white transition-all group">
                  <Phone size={24} className="text-gray-600 group-hover:text-white" /> 
                  <span className="text-xs font-bold">Call</span>
                </button>
                <button onClick={() => addToTimeline("Text")} className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/50 hover:bg-blue-500 hover:text-white transition-all group">
                  <MessageSquare size={24} className="text-gray-600 group-hover:text-white" /> 
                  <span className="text-xs font-bold">Text</span>
                </button>
                <button onClick={() => addToTimeline("Video")} className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/50 hover:bg-purple-500 hover:text-white transition-all group">
                  <Video size={24} className="text-gray-600 group-hover:text-white" /> 
                  <span className="text-xs font-bold">Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#1D3D32] text-white py-12 px-4 w-full z-10 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">KeenKeeper</h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-sm mb-10 leading-relaxed">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
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

export default FriendDetails;