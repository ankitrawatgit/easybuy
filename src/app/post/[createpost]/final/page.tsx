"use client"
import PostNavbar from '@/Components/PostNavbar'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { FaCamera, FaPlus } from 'react-icons/fa'
import { FaCircleXmark, FaX } from 'react-icons/fa6'

type Props = {}

const Finalpage = (props: Props) => {

    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const handleInputChangeFile = (event: React.ChangeEvent<HTMLInputElement> | Event) => {
        const files = (event as React.ChangeEvent<HTMLInputElement>).target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setUploadedImages(prevImages => [...prevImages, reader.result as string]);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectImage = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.addEventListener('change', (e) => {
            handleInputChangeFile(e);
        });
        input.click();
    }, []);

    const removeImage = (index: number) => {
        setUploadedImages(prevImages => prevImages.filter((_, i) => i !== index));
    };


    const Showimage = (props: { url: string, index: number }) => {
        return (
            <div className=' relative p-3 mb-2 border border-black flex justify-center items-center flex-col animate-fade' key={props.index}>
                <div className=' absolute top-0 right-0 cursor-pointer' onClick={() => {
                    removeImage(props.index)
                }}>
                    <FaCircleXmark className='w-5 h-5' color='red'/>
                </div>
                <Image src={props.url} height={400} width={400} alt='itemimage' className='w-50 h-70 rounded-md' />
            </div>
        )
    }


    return (
        <div>
            <PostNavbar title='Create your post'/>
            <div className='padding-container max-container flex flex-col min-h-[90vh] '>
                <h1 className='text-xl flex justify-center mb-5'>
                    Let's upload some images
                </h1>

                <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 mb-2'>
                    {
                        uploadedImages.map((e, i) => (
                            <Showimage url={e} index={i} />
                        ))
                    }

                    <div className='p-3 mb-1 border border-black flex justify-center items-center flex-col space-y-3' onClick={handleSelectImage}>
                        <FaCamera className='w-10 h-10' />
                        <h1>Add image</h1>
                        <FaPlus className='w-5 h-5' />
                    </div>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-auto sticky bottom-0">Done</button>
            </div>
        </div>
    )
}




export default Finalpage

