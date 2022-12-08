import React from 'react';
import { ErrorField, InputChange } from "../../app/App.d";


export interface UserLoginDT {
    email:string;
    pswrd:string;
    token:string;
}

export interface UserLoginState extends UserLoginDT {
    errorField : ErrorField[];
}

export interface UserLoginProps {
    login:UserLoginState;
    handleInputValue: (payload:InputChange) => ActionCreatorWithPayload<InputChange,string>;

}



