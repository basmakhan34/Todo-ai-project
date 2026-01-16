"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import AiAssistant from "../../components/AiAssistant";
import TodoList from "../../components/TodoList";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); // List ko refresh karne ke liye

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login"); // Auth Guard
    } else {
      setLoading(false);
    }
  }, [router]);

  // Ye function AI Assistant call karega
  const handleTaskCreated = () => {
    setRefreshKey(prev => prev + 1); // Key badalne se list refresh ho jayegi
  };

  if (loading) return <div className="h-screen bg-black text-white flex items-center justify-center">Loading Workspace...</div>;

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans">
      {/* Sidebar - Navigation side */}
      <Sidebar />

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col p-6 gap-6 overflow-hidden">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tight">WORKSPACE</h1>
          <div className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            Status: <span className="text-green-500">Connected</span>
          </div>
        </header>

        <div className="flex flex-1 gap-6 overflow-hidden">
          {/* List Area - RefreshKey yahan kaam karega */}
          <div className="flex-[2] bg-zinc-950 rounded-[2.5rem] border border-white/5 overflow-y-auto p-4 custom-scrollbar">
            <TodoList key={refreshKey} />
          </div>

          {/* AI Chat Area */}
          <div className="flex-[1.2] bg-zinc-950 rounded-[2.5rem] border border-white/5 relative flex flex-col shadow-2xl">
            <AiAssistant onTaskCreated={handleTaskCreated} />
          </div>
        </div>
      </main>
    </div>
  );
}