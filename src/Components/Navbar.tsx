"use client"
import { useGetLogedinUser } from '@/hooks/User'
import Image from 'next/image'
import Link from 'next/link'
import React, { KeyboardEventHandler, useEffect, useRef, useState } from 'react'
import { FaMagnifyingGlass, FaUser, FaX } from 'react-icons/fa6'
import ProfileDropdown from './ProfileDropdown'
import { redirect, useRouter } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { DeleteCookie } from '@/serverActions/DeleteCookies'
import { FaWhatsapp } from 'react-icons/fa'
import ChatModal from './ChatModal'
type Props = {}

const Navbar = ({ }: Props) => {

  const [isDropdownopened, setisDropdownopened] = useState(false);
  const [searchvalue, setsearchvalue] = useState("");
  const { data, error,refetch } = useGetLogedinUser();
  const router = useRouter();
  
  const onProfileclick = () => {
    router.push(`profile/${data?.data.user.id}`)
  }

  const onLogoutClick = () => {
    DeleteCookie('token')
    router.push('/login')
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchvalue == "") {
        return;
      }
      router.push(`/search/${searchvalue}`)
    }

  }


  const UserProfileAndChat = (props: { image: string | undefined }) => {

 
    const [ischatmodalopen, setischatmodalopen] = useState(false);

    return (
      <div className='flex justify-center items-center gap-x-3'>
        {
          data?.data?.user?.chatrooms.length > 0 && <div className='border rounded-full p-1'>
            <FaWhatsapp size={30} color={ischatmodalopen ? 'green' : 'black'} onClick={() => setischatmodalopen(!ischatmodalopen)} />
            {
              ischatmodalopen && (
                <ChatModal setischatmodalopen={setischatmodalopen} chatrooms={data?.data?.user?.chatrooms} loggedInUserId={data?.data.user.id}/>
              )
            }
          </div>
        }
        <div className=' border rounded-full p-1 relative overflow-hidden  max-h-[50px] max-w-[50px] z-0' onClick={() => { setisDropdownopened(!isDropdownopened) }}>
          {
            props.image ? <Image src={props.image} width={100} height={100} className='w-20 h-20 rounded-full max-w-[40px] max-h-[40px] bg-slate-400' alt='seller image' /> : <FaUser size={30} />

          }
        </div>
      </div>
    )
  }

  return (
    <div className='padding-container bg-slate-100 sticky top-0 z-20'>
      <div className='flex justify-between mb-2 mx-2 items-center'>
        <h1 className=' text-2xl text-black font-bold p-1'>E B</h1>

        <div className='lg:w-[800px] xl:w-[1000px] md:w-[500px] items-center hidden md:flex rounded-md xl:translate-x-12'>
          <input type="text" className='border rounded-md p-2 border-black bg-slate-100 w-full focus:outline-none ml-2' placeholder='Find car, Mobile phone & other..'
            name='search'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setsearchvalue(e.target.value)
            }}
            value={searchvalue}
            onKeyDown={handleKeyPress}
          />

          <div className='w-10 h-[2.6rem] flex justify-center items-center bg-black -translate-x-1 rounded-r-lg rounded-br-lg hover:scale-105 cursor-pointer' onClick={() => {
            router.push(`/search/${searchvalue}`)
          }}>
            <FaMagnifyingGlass className='w-5 h-5 bg-black relative ' color='white' />
          </div>
        </div>

        <div className='flex space-x-3 cursor-pointer'>
          {
            !data ?
              <Link href={'/login'} className=' rounded-md p-1 inline text-green-800 underline text-xl'>Login</Link> : <div >
                <UserProfileAndChat image={data.data?.user?.image} />
                {
                  isDropdownopened && <ProfileDropdown handleLogoutClick={() => { onLogoutClick() }} handleProfileClick={() => { onProfileclick() }} />
                }
              </div>
          }
          <Link href={"/post"} className=' border border-black rounded-md p-1 bg-gradient-to-r from-green-400 to-yellow-300 text-center font-bold'>Sell Now</Link>
        </div>
      </div>
      <div className='w-full flex items-center border border-black p-2 md:hidden rounded-lg'>
        <FaMagnifyingGlass className='w-5 h-5' />
        <input type="text" className=' bg-slate-100 w-full focus:outline-none ml-2' placeholder='Find car, Mobile phone & other..'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setsearchvalue(e.target.value)
          }}
          value={searchvalue}
          onKeyDown={handleKeyPress} />

      </div>

    </div>
  )
}

export default Navbar
