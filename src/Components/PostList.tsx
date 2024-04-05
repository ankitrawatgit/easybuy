import React from 'react'
import Listitem from './Listitem'

type Props = {}

const PostList = (props: Props) => {
  return (
    <div className='padding-container max-container'>
        <h1 className='lg:text-2xl text-xl mb-4'>Fresh Recommendation</h1>
        <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2 '>
                <Listitem />
                <Listitem />
                <Listitem />
                <Listitem />
                <Listitem />
                <Listitem />
        </div>
    </div>
  )
}

export default PostList