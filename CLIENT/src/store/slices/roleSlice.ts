import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action";

//create Thunk

const roleSlice = createSlice({
  name: "role",
  initialState: {
    roles: [],
    roleDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getApiRoles.pending, (state: any, action) => {
      state.roles = action.payload;
    });
    builder.addCase(actions.getApiRoles.fulfilled, (state: any, action) => {
      state.roles = action.payload;
    });
    builder.addCase(actions.getDetailRole.fulfilled, (state: any, action) => {
      state.roleDetail = action.payload;
    });
    builder.addCase(actions.getApiRoles.rejected, (state: any, action) => {
      state.roles = action.payload;
    });
  },
});

export default roleSlice.reducer;
