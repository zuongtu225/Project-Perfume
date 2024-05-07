import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import userSlice from "./slices/userSlice";
import brandSlice from "./slices/brandSlice";
import { useDispatch } from "react-redux";
import bankSlice from "./slices/bankSlice";
import orderSlice from "./slices/orderSlice";
import categorySlice from "./slices/categorySlice";
import sizesSlice from "./slices/sizesSlice";
import productSizeSlice from "./slices/productSizeSlice";
import cartSlice from "./slices/cartSlice";
import paymentSlice from "./slices/payment";
import orderItemSlice from "./slices/orderItemSlice";
import roleSlice from "./slices/roleSlice";

const store = configureStore({
  reducer: {
    productReducer: productSlice,
    brandReducer: brandSlice,
    categoryReducer: categorySlice,
    sizeReducer: sizesSlice,
    orderItemReducer: orderItemSlice,
    productSizeReducer: productSizeSlice,
    cartReducer: cartSlice,
    userReducer: userSlice,
    bankReducer: bankSlice,
    paymentReducer: paymentSlice,
    orderReducer: orderSlice,
    roleReducer: roleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
