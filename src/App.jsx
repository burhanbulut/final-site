
import './App.css'
import ImageUploader from "./components/ImageUploader.jsx";
import {useState} from "react";

import Canvas from "./components/Canvas.jsx";
import Navbar from "./components/Navbar.jsx";
import EditPage from "./components/EditPage.jsx";




function App() {
const [images,setImages] = useState([]);

  return (
    <>
        <div>
            <Navbar/>
        </div>
        <div className='flex h-full bg-green-100'>
            <div className='inline w-[400px] '>
                <ImageUploader  setImage={setImages} image={images}/>

            </div>
            <div className='w-full flex-1 ml-2'>
                <EditPage  setImages={setImages}  />
                <Canvas images={images}/>
            </div>
        </div>

    </>
  )
}

export default App
