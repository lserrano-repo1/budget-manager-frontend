import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { InputChange } from "../../app/App";
import { AccountProps, AccountData, AccountListData, AccountState } from './account.d';


const initialState:AccountState ={
    accountData: {
        usrId: '',
        bnkId: '',
        curId: '',
        accBalance: ''
    },
    errorField: [],
    accountList: [],
    mode: 'Display'
};




export const accountSlice = createSlice({
    name: 'accountSlc',
    initialState,
    reducers: {
        handleInputValue: (state: AccountState, action: PayloadAction<InputChange>) => {
            const { value, field } = action.payload;

            //getNewValues(field, state, value);
        },

        setMode: (state: AccountState, action: PayloadAction<any>) => {
            const { mode } = action.payload;
            console.log("Setting Formulary Mode");
            console.log(action.payload);
            state.mode = action.payload;
        }
    },
    
});



export const { handleInputValue, setMode } = accountSlice.actions;

export default accountSlice.reducer;
