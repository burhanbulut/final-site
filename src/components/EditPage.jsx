import React from 'react'

function EditPage({setImages}) {
    const deleteAll = () => {
        setImages([])

    }
    return (
        <div >
            <div className='h-[40px]  w-[77%] flex m-2'>
                <button type="button" className='border-2 p-1.5 bg-amber-200' onClick={deleteAll} >Delete All</button>

            </div>
        </div>
    )
}

export default EditPage
