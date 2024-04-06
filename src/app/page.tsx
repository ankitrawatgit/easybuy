import CategoryBroswer from '@/Components/CategoryBroswer';
import Footter from '@/Components/Footter';
import Navbar from '@/Components/Navbar';
import PostList from '@/Components/PostList';
import React from 'react'


export default function App() {
  return (
    <div className=' bg-slate-50'>
    <Navbar />
    <CategoryBroswer />
    <PostList />
    <Footter />
    </div>
  );
}
