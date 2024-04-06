"use client"
import PostNavbar from '@/Components/PostNavbar'
import React, { useEffect, useState } from 'react'
import SimpleImageSlider from "react-simple-image-slider";


type Props = {}

const images = [
  { url: "https://media.wired.com/photos/6332360740fe1e8870aa3bc0/master/pass/iPhone-14-Review-Gear.jpg" },
  { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-model-unselect-gallery-1-202209_FMT_WHH?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1660745142376" },
  { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818" },
  { url: "https://www.splashlearn.com/math-vocabulary/wp-content/uploads/2022/05/image5-888x1024.jpg" },
];



const Details = (props: Props) => {

  return (
    <div>
      <PostNavbar title='Iphone 13 pro max' />
      <div className='grid lg:grid-cols-2 gap-5 max-container '>
        <div className=' relative'>
          <SimpleImageSlider
            width={'100%'}
            height={'50vh'}
            images={images}
            showBullets={true}
            showNavs={true}
            // autoPlay={true}
            autoPlayDelay={3}
            style={{ margin: 'auto' }}
          />
        </div>

        <div className=' border p-5 flex flex-col justify-between'>
          <div>
            <h1 className=' text-black font-bold text-2xl'>Details</h1>
            <h1 className=' text-3xl'>RS. 14999</h1>
            <div className=' text-xl '>Iphone 13 pro max in garbase rate</div>
            <h2 className='mt-2 text-black font-bold'>Discription</h2>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, atque accusamus sed ex unde</div>
            <div className='mt-2 font-bold'>Address</div>
            <div>India(UK) - Satan gali samsan ka samne</div>
          </div>
          <div className='flex justify-end mt-3'>
            <div>Created At. 6 April</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Details