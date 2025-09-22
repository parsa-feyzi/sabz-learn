import { configureStore } from "@reduxjs/toolkit";
import themSlice from "./slices/themSlice";
import isShowChatModalSlice from "./slices/isShowChatModalSlice";
import isShowSidebarSlice from "./slices/isShowSidebarSlice";
import isShowCartModalSlice from "./slices/isShowCartModalSlice";
import isShowProfileModalSlice from "./slices/isShowProfileModalSlice";
import categorySubLinksSlice from "./slices/categorySubLinksSlice";
import isShowSearchModalSlice from "./slices/isShowSearchModalSlice";
import authInfosSlice from "./slices/authInfosSlice";
import globalSearchSlice from "./slices/globalSearchSlice";
import cartItemsSlice from "./slices/cartItemsSlice";

const store = configureStore({
    reducer: {
        authInfos: authInfosSlice,
        them: themSlice,
        cartItems: cartItemsSlice,
        globalSearch: globalSearchSlice,
        categorySubLinks: categorySubLinksSlice,
        isShowChatModal: isShowChatModalSlice,
        isShowSidebar: isShowSidebarSlice,
        isShowCartModal: isShowCartModalSlice,
        isShowProfileModal: isShowProfileModalSlice,
        isShowSearchModal: isShowSearchModalSlice,
    }
})

export default store