'use client';

import { collection, orderBy, query } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import NewChat from "./NewChat";
function SideBar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session && query(collection(db, 'users', session.user?.email!, 'chats'),
    orderBy('createdAt','asc')
    )
  );

  return (
  <div className="p-2 flex flex-col h-screen">
    <div className="flex-1">
        <div>
         <NewChat />

         <div className="hidden sm:inline">
          <ModelSelection  />
         </div>

         <div className="flex flex-col space-y-1 my-2">    

         {loading && (
          <div className="animate-pulse text-center text-white">
             <p>Loading Chats...</p>
          </div>
         )}

         {/* Map through the ChatRows */}
         {chats?.docs.map(chat => (
          <ChatRow key={chat.id} id = {chat.id} />
         ))}
         </div>
        </div>
    </div>
    {session && (
      <img src={session.user?.image!} alt="Profile Picture" className="h-12 w-12 rounded-full cursor-not-allowed mx-auto mb-2" />
    )}
    <button onClick={() => signOut()} className="flex items-center justify-center font-bold text-sm text-white mb-2 bg-slate-700 rounded px-0 py-2 cursor-pointer hover:animate-pulse outline-none">
      Sign Out
    </button>
  </div>
  );
}
export default SideBar;

