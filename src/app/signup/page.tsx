"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';

type Props = {};

function Signup({ }: Props) {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [error, seterror] = useState("");

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            seterror("password not match");
        }

        console.log('Email:', email);
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
        console.log('Profile Image:', profileImage);
    };

    return (
        <div className="bg-gradient-to-r from-red-400 to-indigo-600 h-screen flex justify-center items-center">
            <div className="w-96 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 ml-6">Welcome to EasyBuy</h2>
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="Confirm your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="profileImage" className="block text-gray-700">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            id="profileImage"
                            name="profileImage"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    {
                        error !== "" && <div className='mb-4'>
                            <p className=' text-xs text-red-600'>{error}</p>
                        </div>

                    }

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
