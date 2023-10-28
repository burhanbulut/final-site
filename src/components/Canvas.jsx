import React from 'react'
import Draggable from "./Draggable.jsx";
import GuideLine from "./GuideLine.jsx";
function Canvas({images}) {
    return (
        <div className='canvas'>
            <GuideLine />
            <Draggable images={images} />
        </div>
    )
}

export default Canvas
