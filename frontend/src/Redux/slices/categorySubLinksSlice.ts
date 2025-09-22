import { createSlice } from "@reduxjs/toolkit";
import type { T_menu, T_submenu } from "../../Types/type";

const initialState: { subLinks: null | T_submenu[] | T_menu } = { subLinks: null } 

const categorySubLinksSlice = createSlice({
    name: 'categorySubLinks',
    initialState: initialState,
    reducers: {
        setCategorySubLinks: (state, action: { payload: null | T_submenu[] | T_menu } ) => {
            state.subLinks = action.payload
        }
    }
})

export const { setCategorySubLinks } = categorySubLinksSlice.actions

export default categorySubLinksSlice.reducer