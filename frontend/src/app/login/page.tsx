"use client";
import { useState } from "react";
import { API } from "../../lib/api"; 
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", { email, password });
      
  
      localStorage.setItem("token", res.data.token);
      

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user)); 
      }
      
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Authentication failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF] p-4 text-[#333333] font-sans antialiased">

      <div className="bg-white border border-[#D3CBC2] p-8 md:p-10 w-full max-w-md rounded-2xl shadow-sm">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-2 text-[#C77D6B]">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500">
            Please enter your details to sign in.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-800 border border-red-200 p-3 mb-6 rounded-md font-medium text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C77D6B] focus:border-[#C77D6B] transition-colors" 
              onChange={e => setEmail(e.target.value)} 
              placeholder="you@example.com"
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C77D6B] focus:border-[#C77D6B] transition-colors" 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-[#C77D6B] text-white py-3 rounded-md font-medium shadow-sm hover:bg-[#A6604F] transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-8 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#C77D6B] hover:text-[#A6604F] font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}