"use client"
import React, { ChangeEvent, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { usePostContext } from '@/Provider/Posts';
import PostNavbar from '@/Components/PostNavbar';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const [error, seterror] = useState("");
  const Postcontext = usePostContext();
  const router = useRouter();
  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const newValue = id === 'price' ? parseFloat(value) : value;
    // console.log(Postcontext?.postDetails);
    Postcontext?.setpostDetails((prevDetails: any) => ({
      ...prevDetails,
      [id]: newValue
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Postcontext?.postDetails.price || Postcontext?.postDetails.price <= 0) {
      toast.error("Price shouldbe greater than 0")
      return;
    }
    if (!Postcontext?.postDetails.description || Postcontext?.postDetails.description.length < 20 || Postcontext?.postDetails.description.length > 100) {
      seterror(`Description must be at least 20 and max 100 characters long.(currently have ${Postcontext?.postDetails.description.length} characters)`);
      return;
    }
    Postcontext.postDetails.isvalidated = true;
    router.push(`./createpost/final`);
  };





  return (
    <div>
      <PostNavbar title='Create Your post' />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 max-container padding-container">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-bold">Title *</label>
          <input
            type="text"
            id="title"
            value={Postcontext?.postDetails.title}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border rounded-md focus:border-green-500 focus:outline-none focus:border-2"
            required
            minLength={10}
            maxLength={40}

          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 font-bold">Description *</label>
          <textarea
            id="description"
            value={Postcontext?.postDetails.description}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border rounded-md h-48 focus:border-green-500 focus:outline-none focus:border-2"
            required

            minLength={10}
            maxLength={100}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2 font-bold">Price ₹ *</label>
          <input
            type="number"
            id="price"
            value={Postcontext?.postDetails.price}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border rounded-md focus:border-green-500 focus:outline-none focus:border-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block mb-2 font-bold">Location 🌎 *</label>
          <input
            type="text"
            id="Address"
            value={Postcontext?.postDetails.Address}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border rounded-md focus:border-green-500 focus:outline-none focus:border-2"
            required
            minLength={5}
            maxLength={30}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block mb-2 font-bold">Selected Category *</label>
          {/* <div className="flex space-x-3 items-center justify-center">
          <Categoryitem title={category.at(Postcontext?.categoryid)?.title} icon={category.at(Postcontext?.categoryid)?.icon} onclick={()=>{}} classname=''/>
            <div className=' underline text-blue-400 cursor-pointer' onClick={()=>{
              router.back();
            }}>Change</div>
          </div> */}
        </div>
        {
          error != "" && <div className=' my-2 text-sm text-red-600'>{error}</div>
        }
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">Next</button>
      </form>
    </div>
  );
};

export default CreatePost;
