"use client"
import PostNavbar from '@/Components/PostNavbar'
import { Post } from '@/Provider/Posts';
import { useGetAllPosts, useGetByIdPost } from '@/hooks/post';
import CustomCarousel from '@/slider/custom.slider';
import { QueryCache } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import SimpleImageSlider from "react-simple-image-slider";


type Props = {}


const Details = (props: Props) => {
  const router = useRouter()
  const params:any = useParams();
  const id  = parseInt(params.postid)
  

  const { post,isLoading} = useGetByIdPost(id)
  if (isLoading) {
    return <div className='flex justify-center items-center h-[100vh]'>Loading ...</div>
  }

  if(!post){
    return <div className='flex justify-center items-center h-[100vh]'>404 Post not found</div>
  }

  return (
    <>
    <PostNavbar title={post?.title} />
    <div className='mx-auto max-w-[900px] mt-1 padding-container'>
      <div className='lg:flex-row flex lg:items-stretch flex-col items-center'>
        <div className='relative'>
          {/* <SimpleImageSlider
            width={'100%'}
            height={'60vh'}
            images={post.images}
            showBullets={true}
            showNavs={true}
            // autoPlay={true}
            autoPlayDelay={3}
            style={{ margin: 'auto', fill:'1' }}
          /> */}
        <CustomCarousel>
        {post.images.map((image, index) => {
          return <img key={index} src={image} alt={"item"} />;
        })}
        </CustomCarousel>

        </div>

        <div className=' border p-5 flex flex-col justify-between flex-1 min-w-[100%] lg:min-w-[auto]'>
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
        <div className=' border flex justify-between items-center p-3 min-w-[]' >
          <div className=' border rounded-full p-1  cursor-pointer' onClick={()=>{
          router.push(`/profile/${post.author.id}`)
        }}>{
            post.author.image ? <Image src={post.author.image} width={100} height={100} className='w-20 h-20 rounded-full max-w-[50px] max-h-[50px]' alt='seller image' /> : <FaUser size={40} />
          }</div>
          <div className=' cursor-pointer' onClick={()=>{
          router.push(`/profile/${post.author.id}`)
        }}> 
          <div>{post.author.name}<span>{" @"+post.author.username}</span></div>

          </div>

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