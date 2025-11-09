import React from 'react'
import { Outlet } from "react-router";
import Navbar from '../../components/Navbar/Navbar'


const RootLayout = () => {
  return (
    <>
    <Navbar></Navbar>
    <Outlet></Outlet>
    
    </>
  )
}

export default RootLayout