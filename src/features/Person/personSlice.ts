import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { PersonState, PersonLoginData} from "./person.d";
import { InputChange } from "../../app/App";

const initialState:PersonState = {
    personData: {
        salutation:'',
        firstName:'',
        lastName:'',
        loginData:{
            email:'',
            password:'',
        },
        authentication: {
            usr_token : '',
            isAuthenticated:null,
        },
    },
    errorField: []
};

export const handleUserLogin = createAsyncThunk<any,any,any>(
    "auth/login",
    async(data:PersonLoginData)=>{
        try {
         //TODO: remove this log
            console.info(`data:`);
            console.info(data);
            
            const response = await fetch("http://localhost:8500/login",
            {
                method:'POST',
                body:JSON.stringify(data), 
                headers:{"Content-Type":"application/json"}
            })/*.then(response => {
                if(response.ok) return response.json();
                return response.json().then(response=>{throw new Error(response.error)})
            })*/;

            const jsonResp = await response.json();
            
            //TODO: remove this log
            console.log(`jsonResp:`);
            console.log(jsonResp);
            
            localStorage.setItem('usr_token', jsonResp.usr_token);

            return {
                email: jsonResp.email,
                usr_token: jsonResp.token,
                isAuthenticated:true,
            }
            
        } catch (error) {
            console.error('Error ocurred while trying to login: '+error);
            console.log(error);
            localStorage.removeItem('budman_user_token');
            return {email:null, password:null, usr_token:null, isAuthenticated:false }; 
        }
    });



export const personSlice = createSlice({
    name: 'userLoginSlc',
    initialState,
    reducers: {
        handleInputValue: (state: PersonState, action: PayloadAction<InputChange>) => {
            const { value, field } = action.payload;

            getNewValues(field, state, value);

        },
    },
    extraReducers:(builder)=> {
        builder
            .addCase(handleUserLogin.fulfilled, (state:PersonState, action:PayloadAction<any>) =>{
                const {email, usr_token, isAuthenticated} = action.payload;
                console.log("FULFILLED Response for handleUserLogin..." + action.payload);
                console.log(action.payload);
                
                state.personData.loginData.email = email;
                state.personData.authentication.usr_token = usr_token;
                state.personData.authentication.isAuthenticated = isAuthenticated;
        })
        .addCase(handleUserLogin.rejected, (state:PersonState, action:PayloadAction<any>) =>{
            const {email, usr_token, isAuthenticated} = action.payload;
            console.log("REJECTED Response for handleUserLogin..." + action.payload);
            console.log(action.payload);
            state.personData.loginData.email=email;
            state.personData.authentication.usr_token='';
            state.personData.authentication.isAuthenticated=false;
        })



    },
});


function getNewValues(field: string, state: PersonState, value: string) {
    switch (field) {
        case 'email-text-field':
            state.personData.loginData.email = value;
            break;
        case 'pswrd-text-field':
            state.personData.loginData.password = value;
            break;
        case 'salutation-text-field':
            state.personData.salutation    = value;
            break;
        case 'firstName-text-field':
            state.personData.firstName=value;
            break;
        case 'lastName-text-field':
            state.personData.lastName = value;
            break;
        case 'token-text-field':
            state.personData.authentication.usr_token   =value;
            break;
    }
};


/** Exporting actions */
export const { handleInputValue } = personSlice.actions;

/** Exporting reduced */
export default personSlice.reducer;

export const usr_token = (state:RootState) => state.personReducer.personData.authentication.usr_token;
export const isAuthenticated = (state:RootState) => state.personReducer.personData.authentication.isAuthenticated;
export const salutation = (state:RootState) => state.personReducer.personData.salutation;
export const lastName = (state:RootState) => state.personReducer.personData.lastName;