import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/cors/Footer'

const Contain = () => {
  return (
    <div>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Contain