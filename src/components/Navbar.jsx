import React from 'react'
import {AiOutlineSave} from 'react-icons/ai'

import '../style/Navbar.style.css'
import {useSelector} from "react-redux";

function Navbar() {

    const imagesList = useSelector(state => state.uploadPage.imageList)
    const canvas = useSelector(state => state.uploadPage.imageCanvas);
    const handleDownload = () => {
        if (canvas) {
            const dataURL = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = 'canvas_image.png';
            a.click();
        }
    };

    return (
        <nav >
            <div className='flex justify-between border-b-2 h-[65px] navbar'>
                <div className='flex items-center justify-center '>
                   <div className='h-[50px] w-[50px] ml-6 rounded-full border-black border-2'>

                   </div>
                    <span className='ml-2 font-bold text-black'>Company Name</span>
                </div>
                <div className='mr-10 flex align-middle items-center save-hover '>
                    <div className='flex border-2 items-center h-[40px]  justify-center text-2xl bg-black p-2 border-r '>

                        <button className=' flex items-center ' onClick={handleDownload}> <AiOutlineSave className=' mr-2 '/>Save & Submit</button>

                    </div>

                </div>
            </div>

        </nav>
    )
}

export default Navbar


