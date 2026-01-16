"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTodos, deleteTodo } from "../../lib/api";
import AiAssistant from "../../components/AiAssistant";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Database se tasks lane wala function
  const refreshTasks = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Backend server is likely down:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Auth Check aur initial data load
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login"); // Redirect agar login nahi hai
    } else {
      refreshTasks();
    }
  }, []);

  // 3. Logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  return (
    <div className="flex h-[calc(100vh-73px)] bg-[#050505] text-white">
      {/* Todo List Area */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight">Agentic Workspace</h2>
              <p className="text-gray-500 mt-1">Manage your thoughts with AI precision.</p>
            </div>
            <button 
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-500 border border-gray-800 px-4 py-2 rounded-lg hover:border-red-900 transition"
            >
              Logout
            </button>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="animate-pulse flex flex-col gap-4">
                {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-gray-900 rounded-2xl" />)}
              </div>
            ) : todos.length === 0 ? (
              <div className="text-center py-24 border-2 border-dashed border-gray-900 rounded-3xl">
                <p className="text-gray-600 text-lg italic">The stage is empty. Ask AI to start the performance.</p>
              </div>
            ) : (
              todos.map((todo: any) => (
                <div key={todo.id} className="bg-[#0f0f0f] border border-gray-800 p-6 rounded-2xl flex justify-between items-center group hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <span className="text-xl font-medium">{todo.task}</span>
                  </div>
                  <button 
                    onClick={async () => { await deleteTodo(todo.id); refreshTasks(); }}
                    className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 font-bold"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* AI Assistant Sidebar */}
      <div className="w-[450px] bg-[#0a0a0a] border-l border-gray-800 shadow-2xl">
        <AiAssistant onTaskCreated={refreshTasks} />
      </div>
    </div>
  );
}