import React from 'react'
import {AiOutlineSave} from 'react-icons/ai'
import Logo from '../style/logo.jpg'
import '../style/Navbar.style.css'
import axios from "axios";
import fs from "fs";
import {useSelector} from "react-redux";

function Navbar({images}) {

    const imagesList = useSelector(state => state.uploadPage.imageList)

    return (
        <nav >
            <div className='flex justify-between border-b-2 h-[65px] navbar'>
                <div className='flex items-center justify-center '>
                    <img src={Logo} alt='logo' className='h-[50px] w-[50px] ml-6 rounded-full'/>
                    <span className='ml-2 font-bold text-black'>Company Name</span>
                </div>
                <div className='mr-10 flex align-middle items-center save-hover '>
                    <div className='flex border-2 items-center h-[40px]  justify-center text-2xl bg-black p-2 border-r '>

                        <button className=' flex items-center ' onClick={() =>{
                            console.log(imagesList)
                        }}> <AiOutlineSave className=' mr-2 '/>Save & Submit</button>

                    </div>

                </div>
            </div>

        </nav>
    )
}

export default Navbar


