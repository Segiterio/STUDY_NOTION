import React from 'react'
import { Navbar } from './components/cors/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/cors/Footer'

const Contain = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Contain