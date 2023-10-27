import React, {useRef, useState} from 'react'
import '../style/ImageUploader.style.css'

function ImageUploader({setImage}) {
    const [images,setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef();
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const imageRef = useRef(null);
    const [imageCount,setImageCount] = useState(1);


    function selectFiles(){
        fileInputRef.current.click();
    }
    const handleImageLoad = () => {
        const { naturalHeight, naturalWidth } = imageRef.current;
        setImageDimensions({ width: naturalWidth, height: naturalHeight });
        console.log(imageDimensions)
    };

    function onFileSelect(e) {
        const files = e.target.files;
        setImageCount(imageCount + 1);
        if (!files || files.length === 0) return;
        const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        setImages(prevImages => [
            ...prevImages,
            ...imageFiles.map((file, i) => ({
                name: file.name,
                url: URL.createObjectURL(file),
                id: imageCount
            })),
        ]);

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
        setImages((prevImages) => prevImages.filter((_,index) => index !== i))
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
            setImages((prevImages) => [
                ...prevImages,
                {
                    name: files[i].name,
                    url:  URL.createObjectURL(files[i]),
                    id:   imageCount
                },

            ]);

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
        console.log(files)
        setImages((prevImages) => [
            ...prevImages,
            {
                name: files.name,
                url:  files.src,
                id:   imageCount
            }])


        setImage((prevImages) => [
            ...prevImages,
            {
                name: files.name,
                url:  files.src,
                id:    imageCount,

            }])

    }
    function removeImages(){
        setImages([]);
        setImageCount(0)
        setImage([]);
    }




    return (
        <>
            <div className='card w-1/4 mt-24'>
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
                        images.map((images,i) =>(
                                <div className='image' key={i}>
                                    <span className='delete' onClick={() =>deleteImage(i)} >&times;</span>
                                    <img id={images.id} onClick={addImageList}  src={images.url} alt={images.name} ref={imageRef} onLoad={handleImageLoad} />

                                </div>

                            )

                        )
                    }

                </div>
                <div className='flex justify-center align-middle'>
                    <button type='button' onClick={removeImages}  >
                        Remove All
                    </button>

                </div>
            </div>

        </>
    )
}


export default ImageUploader;
