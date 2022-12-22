import React from 'react';
import {ErrorField, InputChange} from "../../app/App.d";

export interface NewUserDT{
    salutation:string,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    usr_token:string,
}

export interface NewUserState extends NewUserDT{
    errorField : ErrorField[];
}


export interface NewUserProps {
    newUser: NewUserState;
    handleInputValue: (payload:InputChange) => ActionCreatorWithPayload<InputChange,string>;
}