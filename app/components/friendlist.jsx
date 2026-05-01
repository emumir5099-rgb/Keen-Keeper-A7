"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const FriendList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
   
    fetch("/friend.json")
      .then((res) => res.json())
      .then((data) => setFriends(data))
      .catch((err) => console.error("Error loading friends:", err));
  }, []);

  return (
    <div className="bg-gray-50 py-10 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
       
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-800">{friends.length}</h3>
            <p className="text-gray-500 text-sm">Total Friends</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
            <h3 className="text-3xl font-bold text-green-600">
              {friends.filter(f => f.status === 'on-track').length}
            </h3>
            <p className="text-gray-500 text-sm">On Track</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
            <h3 className="text-3xl font-bold text-red-500">
              {friends.filter(f => f.status === 'overdue').length}
            </h3>
            <p className="text-gray-500 text-sm">Need Attention</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
            <h3 className="text-3xl font-bold text-blue-500">12</h3>
            <p className="text-gray-500 text-sm">Interactions This Month</p>
          </div>
        </div>

       
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {friends.map((friend) => (
            <Link href={`/friend/${friend.id}`} key={friend.id}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-center cursor-pointer h-full">
                <img 
                  src={friend.picture} 
                  alt={friend.name} 
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-gray-100"
                />
                <h4 className="font-bold text-lg text-gray-900">{friend.name}</h4>
                <p className="text-xs text-gray-400 mb-3">{friend.days_since_contact}d ago</p>
                
                
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {friend.tags.map(tag => (
                    <span key={tag} className="bg-green-50 text-green-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                      {tag}
                    </span>
                  ))}
                </div>

           
                <div className={`text-[10px] font-bold py-1 px-3 rounded-full inline-block uppercase tracking-wider ${
                  friend.status === 'overdue' ? 'bg-red-500 text-white' : 
                  friend.status === 'almost due' ? 'bg-orange-400 text-white' : 
                  'bg-emerald-600 text-white'
                }`}>
                  {friend.status.replace('-', ' ')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendList;