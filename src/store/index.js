import {configureStore} from "@reduxjs/toolkit";
import UploadPageSlice from "./UploadPageSlice.js";

export default configureStore({
    reducer: {
        uploadPage: UploadPageSlice
    }
});