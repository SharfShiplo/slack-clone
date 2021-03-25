import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    roomId: null,
    sidebarIsOpen: false,
    sideOptionsVisible: false,
  },
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
    openSidebar: (state) => {
      state.sidebarIsOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebarIsOpen = false;
    },
    showOptions: (state) => {
      state.sideOptionsVisible = true;
    },
    hideOptions: (state) => {
      state.sideOptionsVisible = false;
    }
  },
});

export const { enterRoom, openSidebar, closeSidebar, hideOptions, showOptions } = appSlice.actions;
export const selectApp = state => state.app.roomId;
export const selectSidebar = state => state.app.sidebarIsOpen;
export const selectOptions = state => state.app.sideOptionsVisible;

export default appSlice.reducer;
