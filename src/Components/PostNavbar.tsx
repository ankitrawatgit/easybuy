import React from 'react'
import { BiLeftArrow, BiLeftArrowAlt } from 'react-icons/bi'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'

type Props = {}

function PostNavbar({}: Props) {
  return (
    <div className='flex bg-slate-100 mb-2 padding-container items-center justify-center'>
        <BiLeftArrowAlt className='w-8 h-8 mr-auto'/>
        <h1 className='text-2xl mr-auto'>Create your post</h1>
    </div>
  )
}

export default PostNavbar