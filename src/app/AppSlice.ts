import { createSlice } from "@reduxjs/toolkit";
import { appState } from './App.d';


const initialState: appState = {
    usrLoggedToken: '',
};

/** Create redux slice */
export const AppSlice = createSlice({
    name: 'appGeneralStore',
    initialState,
    reducers: {},
    extraReducers: {},
});


export default AppSlice.reducer;