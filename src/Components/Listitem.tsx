import Image from 'next/image'
import React from 'react'

type Props = {}

const Listitem = (props: Props) => {
  return (
    <div className=' border border-slate-800 p-2 rounded-md hover:bg-slate-200 cursor-pointer transition hover:scale-105'>
      <div className=' mb-3'>
        <Image src={"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818"} height={400} width={400} alt='itemimage' className='w-50 h-70 lg:h-48 rounded-md' />
        {/* <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818" alt="item image" className=' w-52 h-70 ' /> */}
      </div>

      <div className=''>
        <div className=' text-xl font-bold text-black'>
          1000$
        </div>
        <div className=' text-xs mb-2 text-gray-600'>
          Iphone 13 pro max ultra legends
        </div>
        <div className='text-xs flex justify-between text-gray-600'>
          <div>          Kashipur(Uk)
          </div>
          <div>5 March</div>
        </div>
      </div>


    </div>
  )
}

export default Listitem