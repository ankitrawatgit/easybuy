"use client"
// import { category } from '@/Components/CategoryBroswer'
import Categoryitem from '@/Components/Categoryitem'
import PostNavbar from '@/Components/PostNavbar'
import { usePostContext } from '@/Provider/CreatePostsData'
import { useGetLogedinUser } from '@/hooks/User'
import { redirect, useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Loading } from '../loading'
import { useGetAllCategory } from '@/hooks/categorys'
type Props = {}

const Post = (props: Props) => {
    
    const rounter = useRouter();
    const postcontext = usePostContext();
    const {categorys,isError} = useGetAllCategory()

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
                    isError && <div>Error</div>
                }
              { categorys?
                    categorys.map((e:any,i:any)=>(
                        <Categoryitem title={e.tag} icon={e.icon} iconFamily={e.iconFamily} classname=' flex flex-col justify-center items-center p-8 border hover:bg-slate-200 hover:scale-110 transition-all ' onclick={()=>{handleonclick(e.id)}} key={i}/>
                    )):<div>Loading ...</div>
                }
            </div>
        </div>
    )
}

export default Post