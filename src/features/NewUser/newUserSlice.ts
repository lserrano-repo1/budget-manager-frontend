import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {InputChange} from '../../app/App.d';
import { NewUserState } from './newUser.d';

const initialState:NewUserState ={
    salutation: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    usr_token: '',
    errorField: []
};

export const newUserSlice = createSlice({
    name:'newUserSlc',
    initialState,
    reducers:{
        handleInputValue:(state:NewUserState, action:PayloadAction<InputChange>)=>{
            const {value,field}=action.payload;
            getNewValues(field,state,value);
        }
    },
});


function getNewValues(field:string, state:NewUserState, value:string){
    switch(field){
        case 'salutation-text-field':
            state.salutation = value;
            break;
        case 'firstName-text-field':
            state.firstName=value;
            break;
        case 'lastName-text-field':
            state.lastName = value;
            break;
        case 'email-text-field':
            state.email = value;
            break;
        case 'password-text-field':
            state.password=value;
            break;
        case 'token-text-field':
            state.usr_token=value;
            break;
    }
};


export const {handleInputValue} = newUserSlice.actions;

export default newUserSlice.reducer;