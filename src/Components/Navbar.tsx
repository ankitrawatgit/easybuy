"use client"
import { useGetLogedinUser } from '@/hooks/User'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaMagnifyingGlass, FaUser } from 'react-icons/fa6'
import ProfileDropdown from './ProfileDropdown'
import { redirect, useRouter } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { DeleteCookie } from '@/serverActions/DeleteCookies'
type Props = {}

function Navbar({ }: Props) {

  const [isDropdownopened, setisDropdownopened] = useState(false);

  const { data, error } = useGetLogedinUser();

  const router = useRouter();

  const onProfileclick=()=>{
    router.push(`profile/${data?.data.user.id}`)
  }

  const onLogoutClick=()=>{
    DeleteCookie('token')
    router.push('/login')  
  }




  const UserProfile = (props: { image: string | undefined }) => {
    return (
      <div className='flex justify-center items-center relative overflow-hidden rounded-full max-h-[50px] max-w-[50px]'>
        <div className=' border rounded-full p-1'>
          {
            props.image ? <Image src={props.image} alt='' width={30} height={30} className=' rounded-full' /> : <FaUser size={30} />

          }
        </div>
      </div>
    )
  }

  return (
    <div className='padding-container bg-slate-100 sticky top-0 z-20'>
      <div className='flex justify-between mb-2 mx-2'>
        <h1 className=' text-2xl text-black font-bold p-1' onClick={onLogoutClick}>E B</h1>

        <div className='lg:w-[800px] xl:w-[1080px] md:w-[500px] items-center hidden md:flex rounded-md'>

          <input type="text" className='border  rounded-md p-2 border-black bg-slate-100 w-full focus:outline-none ml-2' placeholder='Find car, Mobile phone & other..' />
          <div className='w-10 h-[2.6rem] flex justify-center items-center bg-black -translate-x-1 rounded-r-lg rounded-br-lg'>
            <FaMagnifyingGlass className='w-5 h-5 bg-black relative ' color='white' />
          </div>
        </div>

        <div className='flex space-x-3 cursor-pointer'>
          {
            !data ?
              <Link href={'/login'} className=' rounded-md p-1 inline text-green-800 underline text-xl'>Login</Link> : <div onClick={()=>{setisDropdownopened(!isDropdownopened)}}>
                <UserProfile image={data.data.user.image} />
                {
                  isDropdownopened && <ProfileDropdown handleLogoutClick={()=>{onLogoutClick()}} handleProfileClick={()=>{onProfileclick()}} />
                }
              </div>
          }
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
