import React from 'react'
import Draggable from "./Draggable.jsx";
import GuideLine from "./GuideLine.jsx";
function Canvas({images ,setPasteFunction,setCopyFunction}) {
    return (
        <div className='flex flex-wrap'>
            <GuideLine />
            <Draggable setPasteFunction={setPasteFunction} setCopyFunction={setCopyFunction} images={images} />
        </div>
    )
}

export default Canvas
