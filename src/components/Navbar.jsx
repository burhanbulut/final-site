import React from 'react'
import {AiOutlineShoppingCart,AiOutlineClose} from 'react-icons/ai'
import Logo from '../style/logo.jpg'

function Navbar() {
    return (
        <nav >
            <div className='flex justify-between border-b-2 h-[60px] bg-blue-100'>
                <div className='flex items-center justify-center mt-1'>
                    <img src={Logo} alt='logo' className='h-[50px] w-[50px] ml-6 rounded-full'/>
                    <span className='ml-2 font-bold'>Company Name</span>
                </div>
                <div className='mr-10 flex align-middle'>
                    <div className='flex border-2 items-center h-[40px]  justify-center mt-2 bg-black text-2xl  text-blue-50 p-2'>
                        <button className=' flex items-center'> <AiOutlineShoppingCart className=' mr-2 '/>Save & Add to Cart</button>
                    </div>
                    <div className='flex border-2 items-center  h-[40px]  mt-2 bg-red-700 text-2xl ml-2 text-white p-4'>
                        <button className='flex items-center'><AiOutlineClose className='mx-1' />Close</button>
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default Navbar
