import React from 'react';
import { ErrorField, InputChange } from "../../app/App.d";


export interface LoginData {
    email:string;
    password:string;
}

export interface UserLoginDT {
    email:string;
    password:string;
    salutation:string;
    firstName:string;
    lastName:string;
    isAuthenticated:boolean|null;
    token:string;
}

export interface UserLoginState extends UserLoginDT {
    errorField : ErrorField[];
}

export interface UserLoginProps {
    login:UserLoginState;
    handleInputValue: (payload:InputChange) => ActionCreatorWithPayload<InputChange,string>;

}



