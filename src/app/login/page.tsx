"use client"
import React, { ChangeEvent, useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e:ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    console.log('Username/Email:', username);
    console.log('Password:', password);
  };

  return (
    <div className="bg-gradient-to-r from-red-400 to-indigo-600 h-screen flex justify-center items-center">
      <div className="w-96 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username/Email</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username or email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
