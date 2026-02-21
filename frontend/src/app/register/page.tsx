"use client";
import { useState } from "react";
import { API } from "../../lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); 
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/auth/register", { name, email, password, role });
      alert("Registration successful! Please log in.");
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF] p-4 text-[#333333] font-sans antialiased">
      
      {/*  Register  */}
      <div className="bg-white border border-[#D3CBC2] p-8 md:p-10 w-full max-w-md rounded-2xl shadow-sm">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-2 text-[#C77D6B]">
            Create Account
          </h1>
          <p className="text-sm text-gray-500">
            Join the workspace to manage your tasks.
          </p>
        </div>
        
        {/*  Error Message */}
        {error && (
          <div className="bg-red-50 text-red-800 border border-red-200 p-3 mb-6 rounded-md font-medium text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C77D6B] focus:border-[#C77D6B] transition-colors" 
              onChange={e => setName(e.target.value)} 
              placeholder="Jane Doe"
              required 
            />
          </div>
          
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
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Account Type</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C77D6B] focus:border-[#C77D6B] transition-colors bg-white cursor-pointer" 
              onChange={e => setRole(e.target.value)} 
              value={role}
            >
              <option value="user">Standard User</option>
              <option value="admin">Administrator 👑</option>
            </select>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-[#C77D6B] text-white py-3 rounded-md font-medium shadow-sm hover:bg-[#A6604F] transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>
        
        <p className="mt-8 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#C77D6B] hover:text-[#A6604F] font-medium transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}