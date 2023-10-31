import React, {useRef, useState} from 'react'
import '../style/ImageUploader.style.css'
import {useSelector} from "react-redux";

function ImageUploader({setImage,image}) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef();
    const imageRef = useRef(null);
    const [imageCount,setImageCount] = useState(1);
    const imageIndex = useSelector(state => state.uploadPage.selectedImageIndex);
    const imageScale = useSelector(state => state.uploadPage.selectedImageScale);


    function selectFiles(){
        fileInputRef.current.click();
    }


    function onFileSelect(e) {
        const files = e.target.files;
        setImageCount(imageCount + 1);
        if (!files || files.length === 0) return;
        const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));


        setImage(prevImages => [
            ...prevImages,
            ...imageFiles.map((file, i) => ({
                name: file.name,
                url: URL.createObjectURL(file),
                id: imageCount,

            })),
        ]);

    }
    function deleteImage(i){

        setImage((prevImages) => prevImages.filter((_,index) => index !== i))
    }

    function onDragOver(e){
        e.preventDefault();
        setIsDragging(true);
        e.dataTransfer.dropEffect = 'copy';
    }
    function onDragLeave(e){
        e.preventDefault();
        setIsDragging(false);
    }

    function onDrop(e){
        e.preventDefault();
        setImageCount(imageCount + 1);
        setIsDragging(false);
        const files = e.dataTransfer.files;
        for (let i=0;i <files.length;i++){
            if(files[i].type.split('/')[0] !== 'image') continue;
            // if (!images.some((e) =>e.name == files[i].name)){


            setImage((prevImages) => [
                ...prevImages,
                {
                    name: files[i].name,
                    url:  URL.createObjectURL(files[i]),
                    id:   imageCount,

                },

            ]);
        }

    }

    function addImageList(e){
        setImageCount(imageCount + 1);
        const files = e.target;
        console.log(e.target);
        setImage((prevImages) => [
            ...prevImages,
            {
                name: files.name,
                url:  files.src,
                id:    imageCount,

            }])

    }
    function removeImages(){
        setImageCount(0)
        setImage([]);

    }




    return (
        <>
            <div className='card '>
                <div className='top'>
                    <p>Drag & Drop image uploading</p>
                </div>
                <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                    {isDragging ? (
                            <span className='select'>
                    Drop images here
                </span>
                        ):
                        (
                            <>
                                Drag & Drop images here {" "}
                                <span className='select' role="button" onClick={selectFiles}>
                Browse
                     </span>
                            </>
                        )     }


                    <input name='file' type='file'  className='file' multiple ref={fileInputRef}  onChange={onFileSelect} />
                </div>
                <div className='container'>
                    {
                        image.map((image,i) =>(
                                <div className='image' key={i}>
                                    <span className='delete' onClick={() =>deleteImage(i)} >&times;</span>
                                    <img id={image.id} onClick={addImageList}  src={image.url} alt={image.name} ref={imageRef} />
                                </div>
                            )

                        )
                    }

                </div>
                <div>
                    <button className='btn ' onClick={ () =>{
                        let temp = image[imageIndex];
                        setImageCount(imageCount + 1);
                        temp.id = imageCount +1;
                        setImage((prevImages) => [
                            ...prevImages,
                            {
                                name: temp.name,
                                url:  temp.url,
                                id:  imageCount  + 1,
                                scale: imageScale,

                            }])
                    }
                    }>Duplicate</button>
                </div>

            </div>

        </>
    )
}


export default ImageUploader;
