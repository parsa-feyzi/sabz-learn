import { createSlice } from "@reduxjs/toolkit";

const isShowSidebarSlice = createSlice({
    name: 'isShowSidebarSlice',
    initialState: { isShow: false },
    reducers: {
        showSidebarTagle: state => {
            state.isShow = !state.isShow
        }
    }
})

export const { showSidebarTagle } = isShowSidebarSlice.actions

export default isShowSidebarSlice.reducer