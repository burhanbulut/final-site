
import './App.css'
import ImageUploader from "./components/ImageUploader.jsx";
import {useState} from "react";

import Canvas from "./components/Canvas.jsx";


function App() {
const [images,setImages] = useState([]);

  return (
    <div className='main'>
     <ImageUploader setImage={setImages} />
       <Canvas images={images}/>
    </div>
  )
}

export default App
