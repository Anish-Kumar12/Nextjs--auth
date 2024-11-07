"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function sendForgot() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const checkEmail = async () => {
    try {
      setLoading(true);
      setMessage('');
      const response = await axios.post('/api/users/sendforgot', { email });
    } catch (error: any) {
      setMessage(error.response?.data?.msg || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Forgot Password"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button
        onClick={checkEmail}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Email"}
      </button>
      {message && <p>{message}</p>}
      <Link href="/">Back to Login</Link>
    </div>
  );
}