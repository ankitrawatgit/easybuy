"use client"
import Link from 'next/link'
import React from 'react'
import { FaMagnifyingGlass, FaUser } from 'react-icons/fa6'

type Props = {}

function Navbar({ }: Props) {
  return (
    <div className='padding-container bg-slate-100 sticky top-0'>
      <div className='flex justify-between mb-2 mx-2'>
        <h1 className=' text-2xl text-black font-bold'>E B</h1>

        <div className='lg:w-[800px] xl:w-[1080px] md:w-[500px] items-center hidden md:flex rounded-md'>

          <input type="text" className='border  rounded-md p-2 border-black bg-slate-100 w-full focus:outline-none ml-2' placeholder='Find car, Mobile phone & other..' />
          <div className='w-10 h-[2.6rem] flex justify-center items-center bg-black -translate-x-1 rounded-r-lg rounded-br-lg'>
            <FaMagnifyingGlass className='w-5 h-5 bg-black relative ' color='white' />
          </div>
        </div>

        <div className='flex space-x-3'>
          <Link href={'/login'} className=' rounded-md p-1 inline text-green-800 underline text-xl'>Login</Link>
          <Link href={"/post"} className=' border border-black rounded-md p-1 bg-gradient-to-r from-green-400 to-yellow-300'>Sell Now</Link>
        </div>
      </div>
      <div className='w-full flex items-center border border-black p-2 md:hidden rounded-lg'>
        <FaMagnifyingGlass className='w-5 h-5' />
        <input type="text" className=' bg-slate-100 w-full focus:outline-none ml-2' placeholder='Find car, Mobile phone & other..' />

      </div>

    </div>
  )
}

export default Navbar