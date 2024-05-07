import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action";

//create Thunk

const sizeSlice = createSlice({
  name: "sizes",
  initialState: {
    sizes: [],
    sizeDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getApiSizes.pending, (state: any, action) => {
      state.sizes = action.payload;
    });
    builder.addCase(actions.getApiSizes.fulfilled, (state: any, action) => {
      state.sizes = action.payload;
    });
    builder.addCase(actions.getDetailSize.fulfilled, (state: any, action) => {
      state.sizeDetail = action.payload;
    });
    builder.addCase(actions.getApiSizes.rejected, (state: any, action) => {
      state.sizes = action.payload;
    });
  },
});

export default sizeSlice.reducer;
