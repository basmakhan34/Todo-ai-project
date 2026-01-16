"use client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = (e: any) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <form onSubmit={handleLogin} className="p-10 bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <input type="email" placeholder="Email" className="p-2 bg-black border border-zinc-700 rounded" required />
        <input type="password" placeholder="Password" className="p-2 bg-black border border-zinc-700 rounded" required />
        <button className="bg-blue-600 p-2 rounded font-bold">Sign In</button>
      </form>
    </div>
  );
}