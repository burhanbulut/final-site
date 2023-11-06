import React from 'react'
import '../style/EditPage.style.css'
import {MdOutlineDeleteOutline} from 'react-icons/md'
import {setImageMargin} from '../store/UploadPageSlice.js'
import {useDispatch} from "react-redux";

function EditPage({setImages}) {

    const [inputValue, setInputValue] = React.useState(0.5)
    const dispatch = useDispatch();
    const deleteAll = () => {
        setImages([])

    }

    const selectMargin = () => {
        dispatch(setImageMargin(inputValue))
    }

    return (
        <div className='border-b-2 mb-2'>
            <div className='h-[45px]  w-[77%] flex my-2 items-center '>
                <div className='delete-button ml-8 '>
                <button type="button" className='border-2 p-1.5  flex items-center border-none text-xl' onClick={deleteAll} ><MdOutlineDeleteOutline /> Delete All</button>
                </div>
                <div className={'ml-3 border-2 p-2'}>
                    <div >
                        <span className='text-black font-bold border-r-2 px-2'>Margin</span>
                    <input type={"number"} min={0.5} max={10} className={'text-black text-center '} value={inputValue} onChange={(e) =>setInputValue(e.target.value)} step={0.5}  />
                    <button type={"submit"} className={'text-black mx-2 font-bold border-l-2 px-2'} onClick={selectMargin}>Set Margin</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPage
