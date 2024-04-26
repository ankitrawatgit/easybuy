"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Listitem from './Listitem'
import { Post, usePostContext } from '@/Provider/Posts'
import { useGetAllPosts } from '@/hooks/post'
import toast from 'react-hot-toast'

interface props {
}

const PostList = (props: props) => {

  const { posts, isFetching, isError } = useGetAllPosts();

  const handleondeleteclick=()=>{

  }



  return (
    <div className='padding-container max-container min-h-[65vh]'>
      <h1 className='lg:text-2xl text-xl mb-4'>Fresh Recommendation</h1>
      {isError && <div className='h-[65vh] flex justify-center items-center font-bold'>An Error Occured</div>}
      {
      !isFetching?<div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2'>
        {
          posts && posts.map((e: Post) => (
            <Listitem title={e.title} description={e.description} id={e.id} categoryId={e.categoryId} price={e.price} images={e.images} createdAt={e.createdAt} address={e.Address} key={e.id} showoptionmenu={false} onoptionclick={()=>{}}/>
          )) 
        }
      </div>: <div className="flex h-[65vh] items-center justify-center bg-transparent">
            <div className="relative bg-transparent">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default PostList