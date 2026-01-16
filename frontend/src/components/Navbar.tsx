"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black p-4 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold hover:text-blue-500 transition">
          TodoApp
        </Link>
        <div className="flex gap-4">
          <Link href="/login" className="bg-blue-600 px-6 py-2 rounded-lg text-white font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-900/20">
            Login
          </Link>
          <Link href="/login" className="bg-gray-800 px-6 py-2 rounded-lg text-white font-bold hover:bg-gray-700 transition">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}