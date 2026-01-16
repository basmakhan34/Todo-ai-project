"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <div className="text-center max-w-4xl space-y-6">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
          NEXT-GEN AI TODO
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
          Don't just write tasks. Chat with them. Our Agentic AI builds your schedule while you think out loud.
        </p>
        
        <div className="flex gap-4 justify-center mt-10">
          <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
            Open Dashboard
          </Link>
          <button className="border border-gray-700 hover:border-gray-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all">
            Learn More
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl w-full">
        <div className="bg-[#111] p-8 rounded-3xl border border-gray-800 hover:border-blue-500 transition-colors">
          <div className="text-blue-500 text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-bold mb-2">AI Agentic Power</h3>
          <p className="text-gray-500 text-sm">Tell the AI what to do, and it manages your database automatically.</p>
        </div>
        <div className="bg-[#111] p-8 rounded-3xl border border-gray-800 hover:border-purple-500 transition-colors">
          <div className="text-purple-500 text-4xl mb-4">💾</div>
          <h3 className="text-xl font-bold mb-2">Persistent Memory</h3>
          <p className="text-gray-500 text-sm">Your tasks and chat history never vanish, even after a hard reload.</p>
        </div>
        <div className="bg-[#111] p-8 rounded-3xl border border-gray-800 hover:border-pink-500 transition-colors">
          <div className="text-pink-500 text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-2">Real-time Sync</h3>
          <p className="text-gray-500 text-sm">Instant updates across your dashboard as soon as the AI responds.</p>
        </div>
      </div>
    </div>
  );
}