import React from 'react'
import logo from "../../public/logo.png"
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


const Navbar = () => {
  const location = useLocation()
  
  return (
    <div className='px-16 py-6 flex w-full justify-between items-center bg-black/15  backdrop-blur-sm' >
      <div>
        <Link to={"/"}>-
        <img src={logo} alt="" />
        </Link>
      </div>
      <div className='flex gap-20 text-lg pr-10'>
        <Link className={`uppercase`}><button class="smky-btn3 relative hover:text-[#ffffff] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#000000] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-[black]">Home</button></Link>
        <Link className='uppercase'><button class="smky-btn3 relative hover:text-[#ffffff] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#000000] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-[black]">About Us </button></Link>
        <Link className='uppercase'><button class="smky-btn3 relative hover:text-[#ffffff] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#000000] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-[black]">Validate</button></Link>
        <Link to="/userchoice" className='uppercase '> <button className='loginBut w-[120px]'><span>Login</span></button> </Link>
      </div>

      

    </div>
  )
}
export default Navbar
