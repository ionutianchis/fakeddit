import { createSlice } from "@reduxjs/toolkit"

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: 0,
    },
    reducers: {
        setIndex: (state, action) => {
            state.post = action.payload
        }
    }
})

export const { setIndex } = postSlice.actions

export default postSlice.reducer