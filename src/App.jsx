
import './App.css'
import ImageUploader from "./components/ImageUploader.jsx";
import {useState} from "react";

import Canvas from "./components/Canvas.jsx";
import Navbar from "./components/Navbar.jsx";
import EditPage from "./components/EditPage.jsx";


function App() {
const [images,setImages] = useState([]);

  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div>
            <EditPage/>
        </div>
        <div  className='main'>
     <ImageUploader setImage={setImages} />
       <Canvas images={images}/>
        </div>
    </div>
  )
}

export default App
