"use client"
import { category } from '@/Components/CategoryBroswer'
import Categoryitem from '@/Components/Categoryitem'
import PostNavbar from '@/Components/PostNavbar'
import { usePostContext } from '@/Provider/Posts'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

type Props = {}

const Post = (props: Props) => {
    
    const rounter = useRouter();
    const postcontext = usePostContext();

    const handleonclick =(item:number)=>{
        postcontext?.setcategoryid(item);
        rounter.push(`/post/createpost`)
    }

    
    
    return (
        <div className=''>
            <PostNavbar title='Create your post' />
            <h1 className='flex justify-center text-xl font-bold'>CHOOSE YOUR CATEGORY</h1>
            <div className='padding-container m-auto max-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                {
                    category.map((e,i)=>(
                        <Categoryitem title={e.title} icon={e.icon} classname=' flex flex-col justify-center items-center p-8 border hover:bg-slate-200' onclick={()=>{handleonclick(e.id)}} key={i}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Post