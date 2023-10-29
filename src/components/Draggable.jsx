import * as React from "react";
import Moveable from "react-moveable";
import {useRef, useState} from "react";
import "../style/Draggable.style.css";
import Selecto from "react-selecto";



export default function Draggable({images}) {
    const moveableRef = useRef(null);
    const targetRef = useRef(null);

    const DimensionViewable = {
        name: "dimensionViewable",
        props: [],
        events: [],
        render(moveable, React) {
            const rect = moveable.getRect();

            return <div key={"dimension-viewer"} className={"moveable-dimension"} style={{
                position: "absolute",
                left: `${rect.width / 2}px`,
                top: `${rect.height + 20}px`,
                background: "#4af",
                borderRadius: "2px",
                padding: "2px 4px",
                color: "white",
                fontSize: "13px",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                willChange: "transform",
                transform: `translate(-50%, 0px)`,
            }}>
                {Math.round(rect.width)} x {Math.round(rect.height)}
            </div>;
        },
    }

    return (
        <>
            <div className="container ml-10" style={{
                width: "1000px",
                height: "600px",
                border: "1px solid #ccc",
            }}>

                {images.map((image,i) =>(
                    <div key={i}>
                        <div className={"target" + i } ref={targetRef} style={{
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
                            ables={[DimensionViewable]}
                            throttleDrag={1}
                            pinchable={true}
                            edgeDraggable={false}
                            startDragRotate={0}
                            throttleDragRotate={0}
                            scalable={true}
                            keepRatio={true}
                            throttleScale={0}
                            renderDirections={["nw","n","ne","w","e","sw","s","se"]}
                            rotatable={true}
                            throttleRotate={0}
                            rotationPosition={"top"}
                            snappable={true}
                            edge={[]}
                            bounds={{"left":0,"top":0,"right":0,"bottom":0,"position":"css"}}
                            snapDirections={{"top":true,"left":true,"bottom":true,"right":true}}
                            snapThreshold={5}
                            verticalGuidelines={[50,150,250,450,550]}
                            horizontalGuidelines={[0,100,200,400,500]}
                            props={{
                                dimensionViewable: true,
                            }}
                            onResize={e => {
                                 e.target.style.width = `${e.width}px`;
                                 e.target.style.height = `${e.height}px`;
                                 e.target.style.transform = e.drag.transform;
                             }}
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