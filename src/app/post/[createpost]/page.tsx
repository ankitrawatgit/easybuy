"use client"
import React, { ChangeEvent, useState } from 'react';
import PostNavbar from '@/Components/PostNavbar';
import { useParams } from 'next/navigation';
import { category } from '@/Components/CategoryBroswer';
import Categoryitem from '@/Components/Categoryitem';
import { useRouter } from 'next/navigation';


const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);


  const router = useRouter();

  const data = useParams();
  // console.log(data);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {


    const files = e.target.files;
    if (!files) {
      // If no files are selected, do nothing or provide feedback to the user
      return;
    }
    const filesArray = Array.from(files);
    // setImages(filesArray);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`./${data.createpost[0]}/final`)
    // Logic to submit the form
  };
  
  

  return (
    <div>
      <PostNavbar title='Create your post'/>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 max-container padding-container">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-bold">Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:border-green-500 focus:outline-none focus:border-2"
            required
           
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 font-bold">Description *</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md h-48 focus:border-green-500 focus:outline-none focus:border-2"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2 font-bold">Price ₹ *</label> 
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:border-green-500 focus:outline-none focus:border-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block mb-2 font-bold">Location 🌎 *</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:border-green-500 focus:outline-none focus:border-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block mb-2 font-bold">Selected Category *</label>
          <div className="flex space-x-3 items-center justify-center">
           
            <Categoryitem title={category.at(parseInt(data.createpost[0]))?.title} icon={category.at(parseInt(data.createpost[0]))?.icon} onclick={()=>{}} classname=''/>
            <div className=' underline text-blue-400 cursor-pointer' onClick={()=>{
              router.back();
            }}>Change</div>
           
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">Next</button>
      </form>
    </div>
  );
};

export default CreatePost;
