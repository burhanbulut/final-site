import * as React from "react";
import Moveable from "react-moveable";
import {useRef, useState} from "react";
import "../style/Draggable.style.css";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedImageIndex, selectedImageScale} from "../store/UploadPageSlice.js";
import canvas from '../assets/canvas-bg.png'


export default function Draggable({images}) {
    const moveableRef = useRef(null);
    const targetRef = useRef(null);
    const selectedImageId = useSelector(state => state.uploadPage.selectedImageIndex);
    const dispatch = useDispatch();
    const [activeClass, setActiveClass] = React.useState(true);
    let changeClass = () => {
        setActiveClass(!activeClass)
    }
    let toggleActive = activeClass ? "active" : '';



    function extractScaleValues(transformString) {
        // Define a regular expression to match the scale values
        const scaleRegex = /scale\(([^,]+), ([^)]+)\)/;

        // Use the regex to match and extract the scale values
        const match = transformString.match(scaleRegex);

        if (match) {
            // match[1] contains the X scale value, and match[2] contains the Y scale value
            const scaleX = parseFloat(match[1]);
            const scaleY = parseFloat(match[2]);

            return { scaleX, scaleY };
        } else {
            // Return default values if no scale is found
            return { scaleX: 1, scaleY: 1 };
        }
    }


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
                {(rect.width.toFixed(2) / 96).toFixed(2)} x {(rect.height.toFixed(2) / 96).toFixed(2)}
            </div>;
        },
    }

    return (

            <div className="App ml-[50px] mt-[50px]" style={{
                width: "1200px",
                height: "700px",
                border: "1px solid #ccc",
                 backgroundImage: `url(${canvas})`,
            }}>

                {images.map((image,i) =>(
                    <div className='' key={i} >
                        <div className={`target${i} `} ref={targetRef} style={{
                            position: 'absolute',
                            width: '100px',
                            height: '100px',
                            lineHeight: '100px',
                            textAlign: 'center',
                            color: '#333',
                            border: '1px solid #333',
                            boxSizing: 'border-box',
                            transform: "translate(0px, 0px) rotate(0deg) scale(" +
                                (image.scale ? image.scale:'1') + "," +
                                (image.scale ? image.scale:'1') + ")",
                            cursor:'pointer',
                        }}>
                            <img  src={image.url} alt="image"  style={{width:'100%',height:'100%'}}/>
                        </div>
                        <Moveable
                            className={`moveable`}
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
                            rotationPosition={'top'}
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
                                dispatch(setSelectedImageIndex(i));
                                dispatch(selectedImageScale(extractScaleValues(e.target.style.transform).scaleX))
                                console.log(extractScaleValues(e.target.style.transform).scaleX * 100);

                            }}
                            onClick={e => {
                                e.target.style.transform = e.transform;
                                dispatch(setSelectedImageIndex(i));
                                dispatch(selectedImageScale(extractScaleValues(e.target.style.transform).scaleX))


                            }}
                        />

                    </div>
                ))}



            </div>

    );
}