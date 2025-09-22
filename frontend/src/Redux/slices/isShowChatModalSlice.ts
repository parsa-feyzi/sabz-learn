import { createSlice } from "@reduxjs/toolkit";

const isShowChatModalSlice = createSlice({
    name: 'isShowChatModal',
    initialState: { isShow: false },
    reducers: {
        showChatModalTagle: state => {
            state.isShow = !state.isShow
        }
    }
})

export const { showChatModalTagle } = isShowChatModalSlice.actions

export default isShowChatModalSlice.reducer