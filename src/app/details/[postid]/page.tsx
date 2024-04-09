"use client"
import PostNavbar from '@/Components/PostNavbar'
import { Post } from '@/Provider/Posts';
import { useGetAllPosts, useGetByIdPost } from '@/hooks/post';
import { QueryCache } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import SimpleImageSlider from "react-simple-image-slider";
import { json } from 'stream/consumers';


type Props = {}




const Details = (props: Props) => {

  const params = useParams();
  const id = params.postid[0];

  const { post } = useGetByIdPost(parseInt(id))
  if (!post) {
    return <div className='flex justify-center items-center h-[100vh]'>Loading ...</div>
  }



  return (
    <>
    <PostNavbar title={post?.title} />
    <div className=' mx-auto max-w-[700px] mt-1 padding-container'>
      <div className=' lg:grid-cols-2 gap-5  '>
        <div className=' relative '>
          <SimpleImageSlider
            width={'100%'}
            height={'60vh'}
            images={post.images}
            showBullets={true}
            showNavs={true}
            // autoPlay={true}
            autoPlayDelay={3}
            style={{ margin: 'auto', fill:'1' }}
          />
        </div>

        <div className=' border p-5 flex flex-col justify-between'>
          <div>
            <h1 className=' text-black font-bold text-2xl'>Details</h1>
            <h1 className=' text-3xl'>{"₹" + post.price}</h1>
            <div className=' text-xl '>{post.title}</div>
            <p className='mt-2 text-black text-sm'>{post.description}</p>

            <div className='mt-2 font-bold'>Address</div>
            <div>{post.Address}</div>
          </div>
          <div className='flex justify-end mt-3'>
            <div>{new Date(post.createdAt).toLocaleString()}</div>
          </div>
        </div>

      </div>
      <div className=''>
        <h1 className=' text-black font-bold my-2'>Seller Details</h1>
        <div className=' border flex justify-between items-center p-3'>
          <div className=' border rounded-full p-1'>{
            post.author.image ? <Image src={post.author.image} width={400} height={400} className='w-20 h-20 rounded-full' alt='seller image' /> : <FaUser size={40} />
          }</div>

          <div>{post.author.name}<span>{" @"+post.author.username}</span></div>

          <button className=' bg-green-800 w-32 h-10 rounded-md flex justify-center items-center gap-2'>
            <FaMessage size={20} color='white'/>
            <div className=' text-sm text-white'>Chat</div>
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Details