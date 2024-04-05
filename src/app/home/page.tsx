import React from 'react'
import Navbar from '../../Components/Navbar';
import CategoryBroswer from '../../Components/CategoryBroswer';
import PostList from '../../Components/PostList';
import Footter from '../../Components/Footter';

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div className=' bg-slate-50'>
    <Navbar />
    <CategoryBroswer />
    <PostList />
    <Footter />
    </div>
    )
}

export default HomePage;