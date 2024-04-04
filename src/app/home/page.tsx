import React from 'react'
import Navbar from '../Components/Navbar';
import CategoryBroswer from '../Components/CategoryBroswer';

type Props = {}

const HomePage = (props: Props) => {
  return (
    <>
    <Navbar />
    <CategoryBroswer />
    </>
    )
}

export default HomePage;