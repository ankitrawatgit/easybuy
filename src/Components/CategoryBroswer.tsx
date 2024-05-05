"use client"
import React from 'react'
import { IconBase } from 'react-icons'
import { FaBold, FaBox, FaCar, FaFemale, FaLeaf, FaMobile, FaUser } from 'react-icons/fa'
import { FaComputer } from 'react-icons/fa6'
import DynamicIcon from './DynamicFaicon'
import { useGetAllCategory } from '@/hooks/categorys'
import { useRouter } from 'next/navigation'


type Props = {}


const CategoryBroswer = (props: Props) => {
  const {categorys,isError,isFetching,isLoading} = useGetAllCategory()
  const router = useRouter();
  // console.log(categorys);
  const handleonclick=(e:any)=>{
      router.push(`/search/${e.tag}`)
  }
  return (
    <div className='padding-container lg:max-container mx-2  bg-slate-300 rounded-md'>
    <h1 className='lg:text-1xl text-xl'>Browse Categories</h1>
    <div className='flex overflow-scroll p-5 space-x-16 hide-scrollbar'>
      {

        categorys && !isLoading? categorys.map((e:any)=>(
          <div className='flex flex-col items-center cursor-pointer' key={e.id} onClick={()=>{
            handleonclick(e);
          }}>
            <div className='mb-1'>{ <DynamicIcon icon={e.icon} iconFamily={e.iconFamily}/>}</div>
            <div className=' text-xs font-bold'>{e.tag}</div>
          </div>
        )): !isError?<div>Loading...</div>:<div>Error...</div>
      }
    </div>
  </div>
  )
}
export default CategoryBroswer