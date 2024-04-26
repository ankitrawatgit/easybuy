import React from 'react'
import { FaBold, FaBox, FaCar, FaFemale, FaLeaf, FaMobile, FaUser } from 'react-icons/fa'
import { FaComputer } from 'react-icons/fa6'
// import {,}  from 'react-icons/fa6'

type Props = {}

export const category=[
  { id:0,
    title:"Car",
    icon:<FaUser size={40} />
  },
  {
    id:1,
    title:"Electronic",
    icon:<FaComputer size={40}/>
  },
  {
    id:2,
    title:"Mobile",
    icon:<FaMobile size={40}/>
  },
  {
    id:3,
    title:"Humans",
    icon:<FaFemale size={40}/>
  },
  {
    id:4,
    title:"Ganga Heroin",
    icon:<FaLeaf size={40}/>
  },
  {
    id:5,
    title:"Other",
    icon:<FaBox size={40}/>
  },
]


function CategoryBroswer({}: Props) {
  return (
    <div className='padding-container lg:max-container mx-2  bg-slate-300 rounded-md'>
      <h1 className='lg:text-1xl text-xl'>Browse Categories</h1>
      <div className='flex overflow-scroll p-5 space-x-16 hide-scrollbar'>
        {
          category.map((e)=>(
            <div className='' key={e.id}>
              <div className='mb-1'>{e.icon}</div>
              <div className=' text-xs'>{e.title}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CategoryBroswer