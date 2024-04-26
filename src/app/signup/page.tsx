"use client"
import { useCreateUser, useGetLogedinUser } from '@/hooks/User';
import { useUploadImage } from '@/hooks/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {};

export interface SignupDetails{
    name:string,
    username:string,
    email:string,
    password:string,
    image:string | undefined
}


function Signup({ }: Props) {

   const [signupdetails, setsignupdetails] = useState<SignupDetails>({
    name:'',
    username:'',
    email:'',
    password:'',
    image:undefined
   });

   const [confirmPassword, setconfirmPassword] = useState("");
   const [error, seterror] = useState("");
   const {mutateAsync} = useUploadImage();
   const {mutateAsync:createuser} = useCreateUser();
   const [isuploading, setisuploading] = useState(false);
   const router = useRouter();
   
   const handleimgupload = async ( imagefile: File) => {
    const formData = new FormData();
    formData.append('key', '8b2a62b54cb531329049e7f01262b70f');
    formData.append('image', imagefile);
    try {
      const res = await mutateAsync(formData);
      if (res.status == 200) {
        ////console.log(res.data)
        setsignupdetails((prev)=>({...prev,image:res.data.data.url}))
      }
    } catch (error) {
      //console.log("error");
    } finally {
      setisuploading(false);
    }

  }



   const handleChangeEvent=(e:ChangeEvent<HTMLInputElement>)=>{
    const { name, value } = e.target;
    setsignupdetails((prev:any) => ({
            ...prev,
            [name]: value
        }));
   }

    const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(isuploading){
            return;
        }
        if (e.target.files && e.target.files.length > 0) {
            setisuploading(true);
            handleimgupload(e.target.files[0])
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isuploading){
            toast("Please wait Photo is uploading.",{id:"1"})
        }

        if (signupdetails.password !== confirmPassword) {
            seterror("Confirm password not match");
            return
        }
        seterror('')
        //console.log('Name:', signupdetails.name);
        //console.log('Email:', signupdetails.email);
        //console.log('Username:', signupdetails.username);
        //console.log('Password:', signupdetails.password);
        //console.log('Confirm Password:', confirmPassword);
        //console.log('Profile Image:', signupdetails.image);
        finalsubmit();
    };


    const finalsubmit=async()=>{

        const {name,email,username,password,image} = signupdetails;

        try {
            const res  = await createuser({name,email,username,password,image})
            //console.log(res);
            router.push('/')
            
        } catch (error:any) {
            //console.log(error.response.data.errorMessage);    
            if(error.response.data.errorMessage){
                seterror(error.response.data.errorMessage);    

            }    
            
        }

    }



    return (
        <div className="bg-gradient-to-r from-red-400 to-indigo-600 h-screen flex justify-center items-center">
            <div className="w-96 bg-white p-8 rounded-lg shadow-md mx-2">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={signupdetails.email}
                            onChange={handleChangeEvent}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                           maxLength={30}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">
                            Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={signupdetails.name}
                            onChange={handleChangeEvent}
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                            minLength={4}
                            maxLength={15}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">
                            Username *
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={signupdetails.username}
                            onChange={handleChangeEvent}
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                            minLength={5}
                            maxLength={10}
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">
                            Password *
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={signupdetails.password}
                            onChange={handleChangeEvent}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                            minLength={6}
                            maxLength={12}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700">
                            Confirm Password *
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e:ChangeEvent<HTMLInputElement>)=>{setconfirmPassword(e.target.value)}}
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
                    <div>Alrady have an account? <Link href={'/login'} className=' text-blue-400 underline' >Login</Link></div>
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
