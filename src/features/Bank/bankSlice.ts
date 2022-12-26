import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { InputChange } from "../../app/App";
import {BankState, BankData, BankProps} from './bank.d';

const initialState:BankState={
    bankData: {
        bankName:'',
        bankAddress:'',
        bankContact:'',
        bankEmail:''
    },
    errorField: []
};

/*
export const handleBankCreation = createAsyncThunk<any,any,any>(
    'bank/crate',
    async(data:BankData)
);

*/

export const bankSlice = createSlice({
    name:'bankSlc',
    initialState,
    reducers:{
        handleInputValue:(state:BankState, action: PayloadAction<InputChange>)=>{
            const { value, field } = action.payload;

            getNewValues(field, state, value);
        }
    }
});


function getNewValues(field:string, state:BankState, value:string){
    switch(field){
        case 'bank-name-text-field':
            state.bankData.bankName = value;
            break;
        case 'bank-address-text-field':
            state.bankData.bankAddress = value;
            break;
        case 'bank-contact-text-field':
            state.bankData.bankContact = value;
            break;
        case 'bank-contact-email-text-field':
            state.bankData.bankEmail = value;
            break;
    }
}


export const{handleInputValue} = bankSlice.actions;

export default bankSlice.reducer;



