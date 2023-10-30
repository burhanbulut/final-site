import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    selectedImageIndex: 0,
    selectedImageScale: 1,
    imagecount: 1,
}

export const UploadPageSlice = createSlice({
    name: 'uploadPage',
    initialState,
    reducers: {
        setSelectedImageIndex: (state, action) => {
            state.selectedImageIndex = action.payload
        },
        selectedImageScale : (state, action) => {
            state.selectedImageScale = action.payload
        },
        setImageCount: (state, action) => {
            state.imagecount = action.payload
        }

    }
})

export const {setSelectedImageIndex,selectedImageScale,setImageCount} = UploadPageSlice.actions
export default UploadPageSlice.reducer