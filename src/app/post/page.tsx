import { category } from '@/Components/CategoryBroswer'
import Categoryitem from '@/Components/Categoryitem'
import PostNavbar from '@/Components/PostNavbar'
import React from 'react'

type Props = {}

const Post = (props: Props) => {
    return (
        <div className=''>
            <PostNavbar />
            <h1 className='flex justify-center text-xl font-bold'>CHOOSE YOUR CATEGORY</h1>
            <div className='padding-container m-auto max-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                {
                    category.map((e)=>(
                        <Categoryitem title={e.title} icon={e.icon} classname=' flex flex-col justify-center items-center p-8 border hover:bg-slate-200'/>
                    ))
                }
            </div>
        </div>
    )
}

export default Post