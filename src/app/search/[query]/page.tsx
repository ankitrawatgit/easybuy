"use client"
import Listitem from '@/Components/Listitem'
import PostNavbar from '@/Components/PostNavbar'
import { Post } from '@/Provider/CreatePostsData'
import { useSearchPost } from '@/hooks/post'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {}

const Page = (props: Props) => {
    const params = useParams();
    const searchvalue = decodeURIComponent(params.query as string)
    const {mutate,data,isError,isPending} = useSearchPost()
    
    // console.log(data);
    const posts = data?.data.posts;
    // const searchpost=async()=>{
    //   await mutateAsync(searchvalue);
    
    // }


    useEffect(() => {
      mutate(searchvalue)
    }, [mutate])
    


    return (
    <div>
        <PostNavbar title="Search"/>
        <div className='max-container padding-container'>
        <h1 className='mb-1'>Search Results for <strong>{searchvalue}</strong></h1>

        {isError && <div className='h-[65vh] flex justify-center items-center font-bold'>An Error Occured</div>}
      {
      !isPending? posts?.length!=0?<div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2'>
        {
          posts && posts.map((e: Post) => (
            <Listitem title={e.title} description={e.description} id={e.id} categoryId={e.categoryId} price={e.price} images={e.images} createdAt={e.createdAt} address={e.Address} key={e.id} showoptionmenu={false} onoptionclick={()=>{}}/>
          )) 
        }
      </div>:<div className='flex justify-center items-center w-full h-[40vh]'>
            <h1>No Post Found</h1>
          </div>: <div className="flex h-[65vh] items-center justify-center bg-transparent">
            <div className="relative bg-transparent">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
              </div>
            </div>
          </div>
      }

        </div>
    </div>
  )
}

export default Page