"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { FaDeleteLeft } from 'react-icons/fa6'

type Props = {
  id: number;
  title: string;
  description: string;
  // category: Category;
  categoryId: number;
  images: string[];
  price: number;
  address: string;
  createdAt: Date;
  showoptionmenu:boolean,
  onoptionclick:CallableFunction
}

const Listitem = (props: Props) => {
  const router = useRouter();

  return (
<div className="border border-gray-800 p-2 rounded-md hover:bg-gray-200 cursor-pointer flex flex-col relative " onClick={() => {
  router.push(`/details/${props.id}`)
}}>
  {
    props.showoptionmenu && <div className=' absolute top-0 right-0 bg-red-500 p-1 rounded-l-xl cursor-pointer hover:bg-red-600' onClick={(e)=>{
      e.stopPropagation();
      props.onoptionclick(props.id);
    }}><FaTrash size={20}/></div>
  }
  <div className="max-h-72 lg:ma mb-3">
    <Image src={props.images[0]} height={400} width={400} alt="itemimage" className="w-50 h-52 lg:h-70 rounded-md" />
  </div>
  
  <div className="flex flex-col justify-between flex-grow">
    <div>
      <h1 className="text-xl font-bold text-black">
      {"₹ "+props.price.toLocaleString()}
      </h1>
      <h1 className="text-xs mb-2 text-gray-600">
        {props.title.slice(0, 26) + "..."}
      </h1>
    </div>
    <div className="mt-auto"> 
      <div className="flex justify-between">
        <div className=' text-xs'>{props.address}</div>
        <div className='text-[0.60rem]'>{new Date(props.createdAt).toDateString()}</div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Listitem