import * as React from "react";
import {useEffect, useRef, useState} from "react";
import "../style/Draggable.style.css";
import {useDispatch, useSelector,} from "react-redux";
import {
    setImageCanvas, selectedImageScale, setCopyFunction, setPasteFunction
} from "../store/UploadPageSlice.js";
import canvas1 from '../assets/canvas-bg.png'
import {fabric} from "fabric";


export default function Draggable({images}) {

    const canvasRef = useRef(null);
    const selectedImageId = useSelector(state => state.uploadPage.selectedImageIndex);
    const dispatch = useDispatch();
    const imageMargin = useSelector(state => state.uploadPage.imageMargin);
    const imagePositions = useRef({});
    const [currentClipboard, setCurrentClipboard] = useState(null);
    const [currentCanvas, setCurrentCanvas] = useState(null);
    const newCanvas = useRef(null);
    const newClipboard = useRef(null);

    function Copy() {
        if (newCanvas.current === null) {
            return;
        }

        newCanvas.current.getActiveObject().clone(function (cloned) {
            newClipboard.current = cloned
        });
    }

    function Paste() {
        if (newCanvas.current === null) {
            return;
        }


        newCanvas.current.getActiveObject().clone(function (cloned) {
            newClipboard.current = cloned
        });


        newClipboard.current.clone(function (clonedObj) {
            newCanvas.current.discardActiveObject();
            console.log(clonedObj)
            clonedObj.set({
                left: clonedObj.left + 10,
                top: clonedObj.top + 10,
                evented: true,
            });
            if (clonedObj.type === 'activeSelection') {

                clonedObj.canvas =  newCanvas.current;
                clonedObj.forEachObject(function (obj) {
                    newCanvas.current.add(obj);
                });

                clonedObj.setCoords();
            } else {
                newCanvas.current.add(clonedObj);
            }
            newClipboard.current.top += 10;
            newClipboard.current.left += 10;

            newCanvas.current.setActiveObject(clonedObj);
            newCanvas.current.requestRenderAll();
        });
    }


    useEffect(() => {

        const canvas = new fabric.Canvas(canvasRef.current);
        newCanvas.current = canvas;
        dispatch(setPasteFunction(Paste));
        dispatch(setCopyFunction(Copy));
        canvas.setBackgroundImage(canvas1, canvas.renderAll.bind(canvas))

        canvas.clear();
        let currentX = 10;
        let currentY = 10;


        // setImageCounter(images.length)
        //  console.log('useEffect',imageCounter)
        //  let obj = {}
        //  if (images.length === 0) {
        //      return;
        //  }
        //  let options = {
        //              left: 50 * imageCounter * imageMargin *3,
        //              top: 10,
        //              scaleX: 0.5,
        //              scaleY: 0.5,
        //          }
        //  fabric.Image.fromURL(images[imageCounter].url, (img) => {
        //
        //      img.set({...options, borderColor: 'gray',
        //          cornerColor: 'black',
        //          cornerSize: 12,
        //          transparentCorners: false,
        //          objectFit: 'fit'
        //      })
        //
        //      img.on('scaling', function (event) {
        //          // changeScaleAtIndexOnImagePosition(index, img.scaleX);
        //          console.log(imagePositions)
        //          console.log('Image is being scaled');
        //          console.log('New scale factor: ', img.scaleX); // Access the new scale factor
        //
        //      });
        //
        //      img.on('moving', function (event) {
        //          //changePositionAtIndexOnImagePosition(index, img);
        //          console.log(imagePositions);
        //          console.log('Image is being dragged');
        //          console.log('New position: ', img.left); // Access the new position
        //
        //      });
        //
        //      editor?.canvas.add(img);
        //  });
        images.map((image, index) => {
            let obj = null
            if (imagePositions.current.hasOwnProperty(index)) {
                obj = imagePositions.current[index];

            }
            const img = new Image();
            img.src = image.url;
            img.onload = () => {
                let desiredWidth = 100;
                let desiredHeight = 100;


                if (currentX + desiredWidth > canvas.width) {
                    currentX = 10;
                    currentY += desiredHeight + 10;
                }

                if (currentY + desiredHeight <= canvas.height) {
                    const finalImage = new fabric.Image(img, {
                        borderColor: 'gray',
                        cornerColor: 'black',
                        cornerSize: 12,
                        transparentCorners: false,
                        left: obj?.left || currentX,
                        top: obj?.top || currentY,
                    });

                    const scaleX = desiredWidth / finalImage.width;
                    const scaleY = desiredHeight / finalImage.height;
                    console.log(image.scale)
                    finalImage.scaleX = image.scale ? image.scale : (obj?.scaleX || scaleX);
                    finalImage.scaleY = image.scale ? image.scale : (obj?.scaleY || scaleY);

                    imagePositions.current[index] = {
                        left: obj?.left || currentX,
                        top: obj?.top || currentY,
                        scaleX: obj?.scaleX || scaleX,
                        scaleY: obj?.scaleY || scaleY,
                    };


                    canvas.add(finalImage);
                    currentX += desiredWidth + 10;

                    finalImage.on('selected', (event) => {
                        console.log('selected', finalImage.scaleX)
                        dispatch(selectedImageScale(finalImage.scaleX));
                    });
                    finalImage.on('scaling', (event) => {
                        const newScaleY = obj?.scaleY || finalImage.scaleY;
                        imagePositions.current[index].scaleY = newScaleY;
                        const newScaleX = obj?.scaleX || finalImage.scaleX;
                        imagePositions.current[index].scaleX = newScaleX;

                    });

                    finalImage.on('moving', (event) => {
                        const newLeft = finalImage.left;
                        const newTop = finalImage.top;
                        imagePositions.current[index].left = newLeft;
                        imagePositions.current[index].top = newTop;
                        // You can do more with the new position if needed
                    });

                }
            }
        });


        dispatch(setImageCanvas(canvas));
        setCurrentCanvas(canvas)
        return () => {
            canvas.dispose();
        };

    }, [images]);


    return (

        <>

            <canvas ref={canvasRef} width={900} height={700} className='ml-[25px] mt-[25px] flex flex-wrap' style={{
                border: '1px dashed #1f3f8f',
            }}/>


        </>
    );
}

