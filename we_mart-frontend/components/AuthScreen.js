// components/AuthScreen.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 🟢 1. Import Next Router
import { useCart } from '../context/CartContext';

export default function AuthScreen() {
  const { user, loginUser, logoutUser } = useCart();
  const router = useRouter(); // 🟢 2. Initialize the router instance

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', isError: false });
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage({ text: '', isError: false });
    setLoading(true);

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000';
    const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login';

    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication processing failed.');
      }

      if (isSignUp) {
        setMessage({
          text: data.message || "Registration successful!",
          isError: false,
        });
        setIsSignUp(false);
      } else {
        // Save auth data
        const token = data.session.access_token;

        // localStorage.setItem("access_token", token);
        // localStorage.setItem("user", JSON.stringify(data.user));

        loginUser(data.user, token);

        router.push("/");
      }

      setPassword('');
    } catch (error) {
      setMessage({ text: error.message, isError: true });
    } finally {
      setLoading(false);
    }
  };

  // If the user lands here while already authenticated, cleanly show dashboard
  if (user) {
    return (
      <div className="max-w-md mx-auto my-20 bg-white border border-gray-100 p-8 rounded-3xl shadow-sm text-center">
        <span className="text-5xl">🔐</span>
        <h2 className="text-2xl font-black text-gray-900 mt-4">Account Active</h2>
        <div className="bg-gray-50 rounded-xl py-2 px-4 my-4 font-mono text-xs text-indigo-600 break-all">
          {user.email}
        </div>
        <button
          onClick={() => {
            logoutUser();
            router.push('/');
          }}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all cursor-pointer shadow-sm border-none"
        >
          Sign Out of WeMart
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-20 bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          {isSignUp ? 'Join WeMart pipeline system today.' : 'Enter credentials to manage your profile.'}
        </p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl text-sm mb-4 font-medium border ${message.isError ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'
          }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-900 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-900 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm cursor-pointer disabled:bg-gray-300 border-none"
        >
          {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-50 text-center">
        <button
          onClick={() => {
            setIsSignUp(!isSignUp);
            setMessage({ text: '', isError: false });
          }}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer bg-transparent border-none"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'New to our network? Create an account'}
        </button>
      </div>
    </div>
  );
}