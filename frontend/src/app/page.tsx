"use client";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 selection:bg-blue-500/30">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full -z-10" />

      {/* Hero Section */}
      <div className="text-center max-w-4xl space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm mb-4 animate-fade-in">
          <Sparkles size={16} className="text-blue-400" />
          <span>Now Powered by Agentic Llama 3.3</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-tight">
          WORK LESS. <br /> CHAT MORE.
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
          The first AI-first Todo app. Don't manage tasks manually—just tell your agent what needs to be done.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
          {/* Dashboard Link ab Login par le jayega */}
          <Link href="/login" className="group bg-white text-black px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-xl shadow-white/5">
            Get Started Free
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link href="/login" className="border border-white/10 bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300">
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 max-w-6xl w-full">
        <div className="group bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 hover:border-blue-500/50 transition-all duration-500">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">Agentic Workflow</h3>
          <p className="text-gray-500 leading-relaxed">Simply type "Plan my gym session" and watch the AI populate your dashboard automatically.</p>
        </div>

        <div className="group bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 hover:border-purple-500/50 transition-all duration-500">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">Protected Access</h3>
          <p className="text-gray-500 leading-relaxed">Secure authentication ensures your private tasks and chat history are always for your eyes only.</p>
        </div>

        <div className="group bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 hover:border-pink-500/50 transition-all duration-500">
          <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-500 mb-6 group-hover:scale-110 transition-transform">
            <Sparkles size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">Contextual Memory</h3>
          <p className="text-gray-500 leading-relaxed">The AI remembers your previous conversations, making task management feel like a real assistant.</p>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="mt-32 text-gray-600 text-sm border-t border-white/5 w-full max-w-6xl pt-10 pb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 Todo-AI Agentic Workspace.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Github</a>
        </div>
      </footer>
    </div>
  );
}