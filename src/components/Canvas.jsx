import React from 'react'
import Draggable from "./Draggable.jsx";

function Canvas({images}) {
    return (
        <div >
            <Draggable images={images} />
        </div>
    )
}

export default Canvas
