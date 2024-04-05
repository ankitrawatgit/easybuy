import React from 'react'
import { FaFemale } from 'react-icons/fa'
import { FaBox, FaCar, FaComputer, FaLeaf, FaMobile, FaX } from 'react-icons/fa6'

type Props = {}

export const category=[
  { id:0,
    title:"Car",
    icon:<FaCar size={40}/>
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
            <div className=''>
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