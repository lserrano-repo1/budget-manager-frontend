import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Root } from "react-dom/client";
import { InputChange } from "../../app/App.d";

import { UserLoginState, LoginData } from "./userLogin.d";


 const initialState: UserLoginState = {
    email: "",
    password:"",
    salutation:"",
    firstName:"",
    lastName:"",
    token: "",
    isAuthenticated:null,
    errorField: [],
    
};

export const handleUserLogin = createAsyncThunk<any,any,any>(
    "auth/login",
    async(data:LoginData)=>{
        try {
         //TODO: remove this log
            console.info(`data:`);
            console.info(data);
            
            const response = await fetch("http://localhost:8500/login",
            {
                method:'POST',
                body:JSON.stringify(data), 
                headers:{"Content-Type":"application/json"}
            });

            const jsonResp = await response.json();
            
            //TODO: remove this log
            console.log(`jsonResp:`);
            console.log(jsonResp);
            
            localStorage.setItem('usr_token', jsonResp.usr_token);

            return {
                email: jsonResp.email,
                usr_token: jsonResp.usr_token,
                isAuthenticated:true,
            }
            
        } catch (error) {
            console.log(error);
            localStorage.removeItem('budman_user_token');
            return {email:null, password:null, token:null, isAuthenticated:false }; 
        }
    });



export const userLoginSlice = createSlice({
    name: 'userLoginSlc',
    initialState,
    reducers: {
        handleInputValue: (state: UserLoginState, action: PayloadAction<InputChange>) => {
            const { value, field } = action.payload;

            getNewValues(field, state, value);

        },
    },
    extraReducers:(builder)=> {
        builder
            .addCase(handleUserLogin.fulfilled, (state:UserLoginState, action:PayloadAction<any>) =>{
                const {email, usr_token, isAuthenticated} = action.payload;
                console.log("Response for handleUserLogin..." + action.payload);
        })



    },
});


function getNewValues(field: string, state: UserLoginState, value: string) {
    switch (field) {
        case 'email-text-field':
            state.email = value;
            break;
        case 'pswrd-text-field':
            state.password = value;
            break;
    }
};


/** Exporting actions */
export const { handleInputValue } = userLoginSlice.actions;

/** Exporting reduced */
export default userLoginSlice.reducer;