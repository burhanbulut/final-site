import React from 'react'
import {AiOutlineSave} from 'react-icons/ai'
import Logo from '../style/logo.jpg'
import '../style/Navbar.style.css'
function Navbar() {
    return (
        <nav >
            <div className='flex justify-between border-b-2 h-[65px] bg-green-600 '>
                <div className='flex items-center justify-center '>
                    <img src={Logo} alt='logo' className='h-[50px] w-[50px] ml-6 rounded-full'/>
                    <span className='ml-2 font-bold'>Company Name</span>
                </div>
                <div className='mr-10 flex align-middle items-center save-hover'>
                    <div className='flex border-2 items-center h-[40px]  justify-center text-2xl  bg-white text-green-600 p-2 border-r '>
                        <button className=' flex items-center'> <AiOutlineSave className=' mr-2 '/>Save & Submit</button>
                    </div>

                </div>
            </div>

        </nav>
    )
}

export default Navbar
