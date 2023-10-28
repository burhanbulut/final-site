import * as React from "react";
import Moveable from "react-moveable";
import {useRef} from "react";
import "../style/Draggable.style.css";
import ImageDrag from "./ImageDrag.jsx";

export default function Draggable({images}) {
    const moveableRef = useRef(null);
    const targetRef = useRef(null);
    return (
        <>
            <div className="container ml-10" style={{
                width: "1000px",
                height: "600px",
                border: "1px solid #ccc",
            }}>
                {images.map((image,i) =>(
                    <div key={i}>
                        <div className={"target" + i} ref={targetRef} style={{
                            position: 'absolute',
                            width: '100px',
                            height: '100px',
                            top: '150px',
                            left: '100px',
                            lineHeight: '100px',
                            textAlign: 'center',
                            color: '#333',
                            border: '1px solid #333',
                            boxSizing: 'border-box',
                            transform: "translate(0px, 0px) rotate(0deg) scale(1, 1)",
                            cursor:'pointer'
                        }}>
                            <img src={image.url} alt="image"  style={{width:'100%',height:'100%'}}/>
                        </div>
                        <Moveable
                            target={'.target' + i}
                            draggable={true}
                            throttleDrag={1}
                            edgeDraggable={false}
                            startDragRotate={0}
                            throttleDragRotate={0}
                            scalable={true}
                            keepRatio={false}
                            throttleScale={0}
                            renderDirections={["nw","n","ne","w","e","sw","s","se"]}
                            rotatable={true}
                            throttleRotate={0}
                            rotationPosition={"top"}
                            originRelative={true}
                            snappable={true}
                            edge={[]}
                            bounds={{"left":0,"top":0,"right":0,"bottom":0,"position":"css"}}

                            onRender={e => {
                                e.target.style.transform = e.transform;
                            }}
                        />
                    </div>
                ))}


                <Moveable
                    ref={moveableRef}
                    target={'.target'}
                    individualGroupable={true}
                    draggable={true}
                    throttleDrag={1}
                    edgeDraggable={false}
                    startDragRotate={0}
                    throttleDragRotate={0}
                    scalable={true}
                    keepRatio={false}
                    throttleScale={0}
                    snappable={true}
                    renderDirections={["nw","n","ne","w","e","sw","s","se"]}
                    bounds={{"left":0,"top":0,"right":0,"bottom":0,"position":"css"}}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                    onScale={e => {
                        e.target.style.transform = e.drag.transform;
                    }}
                    onRotate={e => {
                         e.target.style.transform = e.drag.transform;
                    }}

                />
            </div>
        </>
    );
}