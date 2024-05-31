"use client"
import Alert from '@/Components/Alert'
import EditProfileModal from '@/Components/EditProfileModal'
import Listitem from '@/Components/Listitem'
import PostNavbar from '@/Components/PostNavbar'
import { Post } from '@/Provider/CreatePostsData'
import Loading from '@/app/loading'
import {  useGetLogedinUser, useGetUserByid } from '@/hooks/User'
import { useDeletePost, useGetUserPosts } from '@/hooks/post'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillProfile } from 'react-icons/ai'
import { FaAt, FaCalendar, FaEdit, FaQuestion, FaUser, FaVoicemail, FaWhatsapp } from 'react-icons/fa'
import { FaA, FaMessage } from 'react-icons/fa6'

type Props = {}

const Page = (props: Props) => {



  const params: any = useParams();

  const { data:loginuserdata, isError:getloginusererror,isFetching:loinuserfetching } = useGetLogedinUser();
  const { data, isFetching, isError,refetch } = useGetUserByid(parseInt(params.id));
  const userdetails = data?.data.user;
  const logedinuserdetails = loginuserdata?.data.user;
  const [showalert, setshowalert] = useState(false);
  const [showeditmodal, setshoweditmodal] = useState(false);
  const {mutateAsync} = useDeletePost();
  const [deletepostid, setdeletepostid] = useState<number | undefined>(undefined);
  const router = useRouter()
  const handledelete=async(id:number)=>{ 
    setdeletepostid(id);
    setshowalert(true)
  }

  const handleyesclick=async()=>{
    const id = deletepostid;
    setshowalert(false)
    await mutateAsync({id})
  }

  const handlecancel=()=>{
    setshowalert(false);
  }

  const handlechatclick=()=>{
    if(userdetails.id == logedinuserdetails?.id ){
      return;
    }

    router.push(`/chat/${userdetails.id}`)
  }

  

  const Postlist = (props: { name: string }) => {
    const { posts, isError, isFetching } = useGetUserPosts(parseInt(params.id))
 
    if (isError) {
      return <div>Error Occured.</div>
    }
    return (
      <div>
      <h1 className='mb-1 text-xl font-bold block'>Posts by {props.name}</h1>
      {!isFetching && posts ? (
        posts.length !== 0 ? (
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-2'>
            {logedinuserdetails?.id !== userdetails?.id ? (
              posts.map((e: Post) => (
                <Listitem
                  title={e.title}
                  description={e.description}
                  id={e.id}
                  categoryId={e.categoryId}
                  price={e.price}
                  images={e.images}
                  createdAt={e.createdAt}
                  address={e.Address}
                  key={e.id}
                  showoptionmenu={false}
                  onoptionclick={() => {}}
                />
              ))
            ) : (
              posts.map((e: Post) => (
                <Listitem
                  title={e.title}
                  description={e.description}
                  id={e.id}
                  categoryId={e.categoryId}
                  price={e.price}
                  images={e.images}
                  createdAt={e.createdAt}
                  address={e.Address}
                  key={e.id}
                  showoptionmenu={logedinuserdetails?.id === userdetails?.id}
                  onoptionclick={handledelete}
                />
              ))
            )}
          </div>
        ) : (
          <div className='flex justify-center items-center w-full h-[40vh]'>
            <h1>No Post Found</h1>
          </div>
        )
      ) : (
        <div className='flex justify-center items-center w-full h-[40vh]'>Loading...</div>
      )}
    </div>
    )
  }

  return (
    <>
    <PostNavbar title='Profile' />
    <div className='max-container padding-container'>
      <div className='h-[30vh] lg:flex lg:justify-center lg:items-center'>
        {isError ? (
          <div>Error: Failed to load user details.</div>
        ) : userdetails ? (
          <div className=''>
            <div className='flex items-center gap-x-2'>
              {userdetails.image ? (
                <Image src={userdetails.image} width={60} height={60} alt={userdetails.name} className='rounded-full border max-w-[60px] max-h-[60px] overflow-hidden' />
              ) : (
                <div>
                  <FaUser size={60} className='rounded-full bg-gray-300 p-2' />
                </div>
              )}
              <h1 className='font-bold text-[18px]'>{userdetails.name}</h1>
            </div>
            <div className='flex items-center gap-x-1 mt-2'>
              <FaCalendar size={12} />Member Since {new Date(userdetails.createdAt).toDateString()}
            </div>
            <div className='flex items-center gap-x-1'>
              <FaAt size={12}/>username: {userdetails.username}
            </div>
            <div className='flex items-center gap-x-1'>
              <FaMessage size={12}/>Email: {userdetails.email}
            </div>
              {
                logedinuserdetails?.id === userdetails?.id? <div className='gap-2 bg-green-600 border-black flex items-center justify-center rounded-md h-12 mt-2 cursor-pointer' onClick={()=>{
                  setshoweditmodal(true);
                }}>
                <FaEdit size={14}/>Edit Your Profile
              </div>:  <div className=' gap-2 bg-green-600 border-black flex items-center justify-center rounded-md h-12 mt-2 cursor-pointer' onClick={handlechatclick}>
              <FaWhatsapp size={14}/>Chat With User
            </div>
              }

           
          
          </div>
        ) : (
          <div className='flex justify-center items-center'>Loading...</div> 
        )}
      </div>
  
      <div className='my-2 flex w-full bg-black h-0.5'>
      </div>
        <Postlist name={userdetails?.name ? userdetails.name : "....."} />
    </div>
    
    {
      showalert &&<Alert message='Are you sure to delete?' onYesClick={handleyesclick} onCancelClick={handlecancel}/>
    }

    {
     showeditmodal && <EditProfileModal userdata={{name:userdetails?.name,image:userdetails?.image?userdetails.image:""}} setshoweditmodal={setshoweditmodal} refetch={refetch}/>
    }
  </>
  )
}



export default Page
