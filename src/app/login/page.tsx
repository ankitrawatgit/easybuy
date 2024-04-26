"use client"
import { useGetLogedinUser, useLoginuser } from '@/hooks/User';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Router from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export interface logindetails {
  email: string | null,
  username: string | null,
  password: string
}


function Login() {
  const [usernameoremail, setUsernameoremail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { mutateAsync } = useLoginuser();

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    handlelogin()

  };


  const isEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };


  const router = useRouter();

  const handlelogin = async () => {
    const logindetails = {
      email: '',
      username: '',
      password: password
    }

    if (isEmail(usernameoremail)) {
      logindetails.email = usernameoremail;
    } else {
      logindetails.username = usernameoremail
    }

    //console.log(logindetails);


    try {
      const res = await mutateAsync(logindetails)
      if (res.status == 200) {
        router.push('/')
      }


    } catch (error: any) {
      //console.log(error);

      if (error.response?.data?.errorMessage) {
        setError(error.response.data.errorMessage);
      }

    }
  }



  return (
    <div className="bg-gradient-to-r from-red-400 to-indigo-600 h-screen flex justify-center items-center ">
      <div className="w-96 bg-white p-8 rounded-lg shadow-md mx-2">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username/Email</label>
            <input type="text" id="username" name="username" value={usernameoremail} onChange={(e) => setUsernameoremail(e.target.value)} placeholder="Enter your username or email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required minLength={6} />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div>Dont have account? <Link href={'/signup'} className=' text-blue-400 underline' >Signup</Link></div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
