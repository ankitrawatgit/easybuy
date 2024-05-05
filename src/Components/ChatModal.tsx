"use client"
import { useUpdateUser } from '@/hooks/User';
import { useUploadImage } from '@/hooks/image';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useCallback, useState, } from 'react'
import toast from 'react-hot-toast';
import { FaTrash, FaUpload, FaUser } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import Alert from './Alert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type Props = {
  chatrooms: Array<object>;
  setischatmodalopen: Dispatch<SetStateAction<boolean>>;
  loggedInUserId: number
}


const ChatModal = (props: Props) => {

  const closeModal = () => props.setischatmodalopen(false);
  const router = useRouter()
  
  const queryClient = useQueryClient();
  const {mutateAsync} = useMutation({
    mutationKey: ['delete-post'],
    mutationFn: (payload: {id:string}) => {
      return axios.post(`${process.env.NEXT_PUBLIC_HOST_API_URL}/chat/deletechat`, {id:payload.id}, { withCredentials: true });
    },
    onMutate: (payload) => toast.loading("Deleting Chat", { id: "1" }),
    onSuccess: async (payload) => {
      await queryClient.invalidateQueries({ queryKey: ["getlogedin-user"] })
      toast.success("Deleted", { id: "1" });
    },
    onError: (e) => {
      //console.log(e);

      toast.error("Error", { id: '1' })

    }
  });



  const Chatroomitem = (data: { participants: any[],roomid:string }) => {
    // console.log(data);
    const otherParticipant = data.participants.find(participant => participant.id !== props.loggedInUserId);
    const [showAlert, setShowAlert] = useState(false)
    const handleRoomclick=()=>{
      router.push(`chat/${otherParticipant.id}`)
    }

    const handleImageclick=(e: React.MouseEvent<HTMLElement>)=>{
      e.stopPropagation()
      router.push(`profile/${otherParticipant.id}`)
    }

    const handledeleteClick=(e: React.MouseEvent<SVGAElement>)=>{
      e.stopPropagation()
      setShowAlert(true)
    }

    const onYesclick=async()=>{
      console.log(data.roomid);
     

      await mutateAsync({id:data.roomid});
     }

    return <>
      <div className='w-full border-b hover:bg-blue-200 cursor-pointer' onClick={handleRoomclick}>
        {otherParticipant &&
          <div className='flex flex-shrink-0 justify-center items-center p-2 md:p-4 '>
            <div onClick={handleImageclick}>
            {
              otherParticipant.image ? <Image src={otherParticipant.image} width={100} height={100} className='w-20 h-20 rounded-full max-w-[40px] max-h-[40px] bg-slate-400' alt='seller image' />
                : <FaUser size={40} className='border rounded-full p-1  overflow-hidden  max-h-[50px] max-w-[50px] z-0'/>
              }
              </div>
            
            <h1 className=' flex-grow text-center text-xl select-none'>{otherParticipant.name}</h1>
            <FaTrash size={20} color='red' className=' rounded-full bg-red-300 p-1' onClick={handledeleteClick}/>
          </div>

        }
      </div>
      {
        showAlert && <Alert message='Are you sure?' onYesClick={onYesclick} onCancelClick={()=>{setShowAlert(!showAlert)}} />
      }
    </>
  }



  return (
    <div className='fixed top-0 left-0 justify-end w-full flex h-[100vh] items-start' >

      <div className="flex items-center justify-center min-h-screen z-10 cursor-default">
        <div className="fixed inset-0 transition-opacitys" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
        </div>
      </div>

      <div className='z-10 w-60 md:w-80 bg-white border border-gray-200 rounded-md shadow-lg m-2 transform  translate-y-14 lg:-translate-x-14 cursor-default'>
        <div className='flex justify-between items-center p-3 border-b'>
          <h2 className='text-lg font-semibold'>Chats</h2>
          <FaX size={18} className=' bg-blue-400 rounded-full cursor-pointer' onClick={closeModal} />
        </div>
        <div className='max-h-40 md:max-h-52 overflow-scroll md:overflow-auto'>
          {props.chatrooms.map((chat: any, index: number) => (
            <Chatroomitem key={index} {...chat} />
          ))}
        </div>
      </div>
     
    </div>
  )
}

export default ChatModal