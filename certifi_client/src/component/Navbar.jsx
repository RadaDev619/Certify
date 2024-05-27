import React from 'react'
import logo from "../../public/logo.png"
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  
  return (
    <div className='px-16 py-8 flex w-full justify-between items-center bg-black/15 fixed backdrop-blur-sm' >
      <div>
        <Link to={"/"}>-
        <img src={logo} alt="" />
        </Link>
      </div>
      <div className='flex gap-20 text-lg pr-10'>
        <Link className={`uppercase`}>Home</Link>
        <Link className='uppercase'>About Us</Link>
        <Link className='uppercase'>Validate</Link>
        <Link to="/login" className='uppercase'>Login</Link>
      </div>
    </div>
  )
}
export default Navbar
