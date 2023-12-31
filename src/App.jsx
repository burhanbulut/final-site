
import './App.css'
import ImageUploader from "./components/ImageUploader.jsx";
import {useState} from "react";

import Canvas from "./components/Canvas.jsx";
import Navbar from "./components/Navbar.jsx";
import EditPage from "./components/EditPage.jsx";




function App() {
const [images,setImages] = useState([]);
const [copyFunction,setCopyFunction] = useState(null);
const [pasteFunction,setPasteFunction] = useState(null);
  return (
    <>
        <div>
            <Navbar />
        </div>
        <div className='flex h-full bg-white'>
            <div className='inline w-[400px] border-r-2'>
                <ImageUploader copyFunction={copyFunction}  pasteFunction={pasteFunction} setImage={setImages} image={images}/>

            </div>
            <div className='w-full flex-1'>
                <EditPage  setImages={setImages}  />
                <Canvas setCopyFunction={setCopyFunction} setPasteFunction={setPasteFunction} images={images}/>
            </div>
        </div>

    </>
  )
}

export default App
