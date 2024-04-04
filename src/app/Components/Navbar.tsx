"use client"
import React from 'react'
import { FaMagnifyingGlass, FaUser } from 'react-icons/fa6'

type Props = {}

function Navbar({}: Props) {
  return (
    <div className='p-3 bg-slate-100'>
        <div className='flex justify-between mb-2 mx-2'>
        <h1 className=' text-2xl text-black font-bold'>E B</h1>
        <div className='flex space-x-2'>
           
            <div className=' border border-black rounded-md p-1 inline bg-black text-white'>Login</div>
            <div className=' border border-black rounded-md p-1 bg-gradient-to-r from-green-400 to-yellow-300'>Sellnow</div>
        </div>
    </div>
    <div className='w-full flex items-center border border-black p-2 '>
    <FaMagnifyingGlass className='w-5 h-5'/>
            <input type="text" className=' bg-slate-100 w-full focus:outline-none ml-2' placeholder='Find car, Mobile phone & other..'/>
           
        </div>

</div>
  )
}

export default Navbar