"use client";
import { useRouter } from "next/navigation";
import { LayoutDashboard, CheckCircle, Trash2, LogOut, Zap } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login"); // Dashboard block logic is se trigger hogi
  };

  return (
    <div className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col p-6 h-screen sticky top-0">
      <div className="flex items-center gap-3 text-xl font-bold mb-10 text-white">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Zap size={18} fill="white" className="text-white" />
        </div>
        AI Agent
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        <button className="flex items-center gap-3 p-3 rounded-xl bg-blue-600/10 text-blue-500 border border-blue-500/10 transition text-left">
          <LayoutDashboard size={20} /> Dashboard
        </button>
        <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition text-left">
          <CheckCircle size={20} /> Completed
        </button>
        <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition text-left">
          <Trash2 size={20} /> Trash
        </button>
      </nav>

      <div className="pt-6 border-t border-white/5">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-500/10 transition">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
}