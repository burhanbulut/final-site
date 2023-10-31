import React from 'react'
import '../style/EditPage.style.css'
import {MdOutlineDeleteOutline} from 'react-icons/md'
function EditPage({setImages}) {
    const deleteAll = () => {
        setImages([])

    }
    return (
        <div >
            <div className='h-[45px]  w-[77%] flex mb-2 items-center '>
                <div className='delete-button ml-8 '>
                <button type="button" className='border-2 p-1.5  flex items-center border-none text-xl' onClick={deleteAll} ><MdOutlineDeleteOutline /> Delete All</button>
                </div>
            </div>
        </div>
    )
}

export default EditPage
