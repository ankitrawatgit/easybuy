"use client"
import { useUpdateUser } from '@/hooks/User';
import { useUploadImage } from '@/hooks/image';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useCallback, useState, } from 'react'
import toast from 'react-hot-toast';
import { FaUpload, FaUser } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

type Props = {
  userdata: UserProfile,
  setshoweditmodal: Dispatch<SetStateAction<boolean>>;
}

interface UserProfile {
  name: string;
  image: string;
  // Add other fields as needed
}


const EditProfileModal = (props: Props) => {

  const [isuploadig, setisuploadig] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: props.userdata.name,
    image: props.userdata.image,
    // Initialize other fields
  });
  const [issomethingchage, setissomethingchage] = useState(false);
  const {mutateAsync:updateUser} = useUpdateUser()


  const closeModal = () => props.setshoweditmodal(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setissomethingchage(true);
    setUserProfile(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, e.g., update user profile
    console.log('Updated user profile:', userProfile);
    if(userProfile.image == ""){
      updateUser({name:userProfile.name,image:undefined})
    }else{
      updateUser({name:userProfile.name,image:userProfile.image})
    }


    closeModal();
  };



  const { mutateAsync } = useUploadImage()

  const handleimgupload = async (imagefile: File) => {
    const formData = new FormData();
    formData.append('key', '8b2a62b54cb531329049e7f01262b70f');
    formData.append('image', imagefile);
    try {
      const res = await mutateAsync(formData);
      if (res.status == 200) {
        //console.log(isuploading);
        setissomethingchage(true);
        setUserProfile((prev) => ({ ...prev, image: res.data.data.url }))
      }


    } catch (error) {
      //console.log("error");

    } finally {
      setisuploadig(false);
    }

  }


  const handleInputChangeFile = (event: React.ChangeEvent<HTMLInputElement> | Event) => {
    const files = (event as React.ChangeEvent<HTMLInputElement>).target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setisuploadig(true);
          handleimgupload(file);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setisuploadig(false);
    }
  };

  const handleSelectImage = useCallback(() => {

    if (isuploadig) {
      toast("Wait until photo is uploading...", { id: '2', position: 'top-center' })
      return;
    }

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.addEventListener('change', (e) => {
      handleInputChangeFile(e);
    });
    input.click();
  }, [handleInputChangeFile]);



  return (
    <div><div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
        </div>

        {/* Modal Content */}
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <FaX size={18} className=' absolute top-2 right-2 bg-blue-400 rounded-full  cursor-pointer' onClick={closeModal} />
          <form onSubmit={handleSubmit}>
            <div className="p-6">

              <div className='flex justify-center'>
                <div className=' w-24 h-24 bg-gray-400 rounded-full flex justify-center items-center relative overflow-hidden'>
                  <div className=' absolute flex  justify-center items-center w-full h-full rounded-full'>
                    <FaUpload size={24} color='white' onClick={handleSelectImage} className='cursor-pointer' />
                  </div>
                  {
                    userProfile.image != "" ? <Image src={userProfile.image} alt='userimage' width={50} height={50} /> : <FaUser size={50} />
                  }

                </div>
              </div>


              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  minLength={4}
                  maxLength={15}
                  required
                  value={userProfile.name}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>


              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none disabled:hover:bg-gray-300 disabled:bg-slate-400"
                  disabled={(!issomethingchage || isuploadig)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default EditProfileModal