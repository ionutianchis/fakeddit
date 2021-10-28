import { configureStore } from '@reduxjs/toolkit'
import postSliceReducer from './referencePost'

export default configureStore({
    reducer: {
        post: postSliceReducer,
        
    }
})