import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    selectedImageIndex: 0,
    selectedImageScale: 1,
    imagecount: 1,
    imageList: [],
    imageMargin: 0.5,
    imagePositions: {},
    imageCanvas: null,
    copyFunction: null,
    pasteFunction: null
}

export const UploadPageSlice = createSlice({
    name: 'uploadPage',
    initialState,
    reducers: {
        setSelectedImageIndex: (state, action) => {
            state.selectedImageIndex = action.payload
        },
        selectedImageScale: (state, action) => {
            state.selectedImageScale = action.payload
        },
        setImageCount: (state, action) => {
            state.imagecount = action.payload
        },
        setImageList: (state, action) => {
            state.imageList = [action.payload, ...state.imageList]
        },
        addElement: (state, action) => {
            state.imageList = [...state.imageList, action.payload]
        },
        changeScaleByImageId: (state, action) => {
            for (let i = 0; i < state.imageList.length; i++) {
                if (state.imageList[i].id === action.payload.id) {
                    state.imageList[i].scale = action.payload.scale
                }
            }
        },
        setImageMargin: (state, action) => {
            state.imageMargin = action.payload
        },

        setImageCanvas: (state, action) => {
            state.imageCanvas = action.payload
        },
        setImagePositions: (state, action) => {
            state.imagePositions = action.payload
        },
        setCopyFunction: (state, action) => {
            state.copyFunction = action.payload
        },
        setPasteFunction: (state, action) => {
            state.pasteFunction = action.payload
        }
    }
})

export const {
    setPasteFunction,
    setCopyFunction,
    setImagePositions,
    setImageCanvas,
    setImageMargin,
    addElement,
    setSelectedImageIndex,
    selectedImageScale,
    setImageCount,
    setImageList
} = UploadPageSlice.actions

export default UploadPageSlice.reducer