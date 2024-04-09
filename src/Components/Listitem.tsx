"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  id: number;
  title: string;
  description: string;
  // category: Category;
  categoryId: number;
  images: string[];
  price: number;
  address:string;
  createdAt: Date;
}

const Listitem = (props: Props) => {
  const router = useRouter();

  return (
    <div className=' border border-slate-800 p-2 rounded-md hover:bg-slate-200 cursor-pointer ' onClick={()=>{
      router.push(`/details/${props.id}`)
    }}>
      <div className='max-h-72 mb-3'>
        <Image src={props.images[0]} height={400} width={400} alt='itemimage' className='w-50 h-60 lg:h-60 rounded-md' />
        {/* <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818" alt="item image" className=' w-52 h-70 ' /> */}
      </div>

      <div className='flex flex-col'>
        <div className=' text-xl font-bold text-black'>
          {props.title.slice(0,15)+"..."}
        </div>
        <div className=' text-xs mb-2 text-gray-600'>
         {props.description.slice(0,26)+"..."}
        </div>
        <div className='text-xs flex justify-between text-gray-600'>
          <div>          {props.address}
          </div>
          <div>{new Date(props.createdAt).toDateString()}</div>
        </div>
      </div>


    </div>
  )
}

export default Listitem