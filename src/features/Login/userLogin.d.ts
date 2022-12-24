import React from 'react';
import { ErrorField, InputChange } from "../../app/App.d";


export interface LoginData_ {
    email:string;
    password:string;
}

export interface UserLoginDT_ {
    email:string;
    password:string;
    salutation:string;
    firstName:string;
    lastName:string;
    isAuthenticated:boolean|null;
    usr_token:string;
}

export interface UserLoginState_ extends UserLoginDT {
    errorField : ErrorField[];
}

export interface UserLoginProps_ {
    login:UserLoginState;
    handleInputValue: (payload:InputChange) => ActionCreatorWithPayload<InputChange,string>;

}



