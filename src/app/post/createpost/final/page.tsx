"use client"
import PostNavbar from '@/Components/PostNavbar'
import { imageuploadeddata, usePostContext } from '@/Provider/Posts'
import { useUploadImage } from '@/hooks/image'
import { useCreatePost } from '@/hooks/post'
import { useMutationState, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCamera, FaPlus } from 'react-icons/fa'
import { FaCircleXmark } from 'react-icons/fa6'

type Props = {}

interface localselectedimagedata {
  filename: string,
  localimgurl: string
}

const Finalpage = (props: Props) => {

  const [selectedImage, setselectedImage] = useState<localselectedimagedata[]>([]);
  const [isuploading, setisuploading] = useState(false);
  const postcontext = usePostContext();
  const router = useRouter();
  const { mutateAsync } = useUploadImage();
  const { mutateAsync: createpost } = useCreatePost();
  const checkpostdetailsvalidated = () => {
    if (!postcontext?.postDetails.isvalidated) {
      toast.error("Details Not validated Yet");
      router.back();
      return;
    }
  }


  useEffect(() => {
    checkpostdetailsvalidated();
  }, [])




  const handleimgupload = async (filename: string, imagefile: File) => {

    const formData = new FormData();
    formData.append('key', '8b2a62b54cb531329049e7f01262b70f');
    formData.append('image', imagefile);
    try {
      const res = await mutateAsync(formData);
      if (res.status == 200) {
        //console.log(res.data);
        addimgurltostate(filename, res.data.data.url)
      }
    } catch (error) {
      setselectedImage(prev => prev.filter((e) => e.filename != filename));
      console.log("error");
      return;
    } finally {
      setisuploading(false);
    }

  }

  const addimgurltostate = (filename: string, url: string) => {
    console.log("From addimagetostate", filename, url);
    postcontext?.setuploadedimages((prev) => [...prev, { filename: filename, filedisplayurl: url }])
  }



  const handleInputChangeFile = (event: React.ChangeEvent<HTMLInputElement> | Event) => {
    const files = (event as React.ChangeEvent<HTMLInputElement>).target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const timestamp = new Date().getTime(); // Get current timestamp
          const uniqueFilename = `${timestamp}_${file.name}`; // Combine timestamp and filename
          const uploadedImage: localselectedimagedata = {
            filename: uniqueFilename,
            localimgurl: reader.result as string
          };
          setisuploading(true);
          setselectedImage(prevImages => {
            return [...prevImages, uploadedImage]
          });
          handleimgupload(uniqueFilename, file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectImage = useCallback(() => {

    if (isuploading) {
      toast("Wait until photo is uploading...", { position: 'top-center' })
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

  const removeImage = (index: number) => {
    const imagedetails = selectedImage.at(index);
    postcontext?.setuploadedimages((prev) => prev.filter((e) => e.filename !== imagedetails?.filename));
    setselectedImage(prevImages => prevImages.filter((_, i) => i !== index));
    setisuploading(false);
  };


  const finalUpload = async () => {
    if (postcontext?.uploadedimages.length == 0) {
      toast.error("Please Upload some photos first")
      return;
    }
    if (!postcontext?.postDetails.isvalidated) {
      router.back();
      return;
    }
    const images = postcontext.uploadedimages.map((e) => e.filedisplayurl)

    const categoryid = postcontext.categoryid;

    const { title, description, Address, price } = postcontext.postDetails;

    const createpostdata = {
      title, description, Address, price, images, categoryid
    }
    console.log(createpostdata);

    try {
      const res = await createpost(createpostdata);
      console.log(res);

      postcontext.postDetails.Address = "";
      postcontext.postDetails.title = "";
      postcontext.postDetails.description = "";
      postcontext.postDetails.price = 0;
      postcontext.postDetails.isvalidated = false;

      postcontext.categoryid = 0;
      postcontext.uploadedimages = [];

      router.push('/');

    } catch (error) {

    }


  }


  const Showimage = (props: { url: string, index: number }) => {
    return (
      <div className=' relative p-3 mb-2 border border-black flex justify-center items-center flex-col animate-fade min-h-72 ' key={props.url}>
        <div className=' absolute top-0 right-0 cursor-pointer' onClick={() => {
          removeImage(props.index)
        }}>
          <FaCircleXmark className='w-5 h-5' color='red' />
        </div>
        <Image src={props.url} height={400} width={400} alt='itemimage' className='w-50 h-70 rounded-md' />
      </div>
    )
  }




  return (
    <div>
      <PostNavbar title='Create your post' />
      <div className='padding-container max-container flex flex-col min-h-[90vh] '>
        <h1 className='text-xl flex justify-center mb-5'>
          Let's upload some images
        </h1>

        <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 mb-2'>
          {
            selectedImage.map((e, i) => (
              <Showimage url={e.localimgurl} index={i} />
            ))
          }

          <div className='p-3 mb-1 border border-black flex justify-center items-center flex-col space-y-3' onClick={handleSelectImage} key={'addimage'}>
            <FaCamera className='w-10 h-10' />
            <h1>Add image</h1>
            <FaPlus className='w-5 h-5' />
          </div>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-auto sticky bottom-0" onClick={finalUpload}>Done</button>
      </div>
    </div>
  )
}




export default Finalpage

