import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { InputChange, DDLData } from "../../app/App";
import { AccountProps
    , AccountData
    , AccountListData
    , AccountState
    , LoadDDLValuesData } from './account.d';
import queryString from 'query-string';

const initialState:AccountState ={
    accountData: {
        usrId: '',
        bnkId: '',
        curId: '',
        accNumber:'',
        accBalance: ''
    },
    errorField: [],
    accountList: [],
    mode: 'Display',
    ddlUsers:[],
    ddlBanks:[],
    ddlCurrencies: []
};


export const loadDDLValues = createAsyncThunk<any, any, any>(
    'account/loadDDLValues',
    async (dataIn: LoadDDLValuesData) => {
        try {
            let urlToFetch:any='';
            switch(dataIn.list){
                case 'USERS':
                    console.info(`GET All Users`);
                    urlToFetch = queryString.parseUrl(process.env.REACT_APP_DDL_USERS!);
                    break;
                case 'BANKS':
                    console.info(`GET All Banks`);
                    urlToFetch = queryString.parseUrl(process.env.REACT_APP_DDL_BANKS!);
                    break;
                case 'CURRENCIES':
                    console.info(`GET All Currencies`);
                    urlToFetch = queryString.parseUrl(process.env.REACT_APP_DDL_CURRENCIES!);
                    break;
            }

            console.info('{list, urlToFetch.url}');
            console.info(dataIn.list);
            console.info(urlToFetch.url);
        
            const response = await fetch(urlToFetch.url,
                {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                });

            const jsonResp = await response.json();

            console.log(`GET ALL ${dataIn.list}, JSON response`);
            console.log(jsonResp);
    
            return {
                data: jsonResp.rows,
                ddlName: dataIn
            }
        } catch (error) {
            console.error('Error ocurred while trying to get all registered banks: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get all registered banks" };
        }
    }
);




export const accountSlice = createSlice({
    name: 'accountSlc',
    initialState,
    reducers: {
        handleInputValue: (state: AccountState, action: PayloadAction<InputChange>) => {
            const { value, field } = action.payload;

            getNewValues(field, state, value);
        },

        setMode: (state: AccountState, action: PayloadAction<any>) => {
            const { mode } = action.payload;
            console.log("Setting Formulary Mode");
            console.log(action.payload);
            state.mode = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(loadDDLValues.fulfilled,(state:AccountState, action:PayloadAction<any>)=>{
                const {data, ddlName} = action.payload;
                console.log("loadDDLValues -> action.payload");
                console.log(action.payload);
                if(ddlName!==undefined && ddlName.list!=="" ){
                     switch(ddlName.list){
                        case 'USERS':
                            state.ddlUsers = data;
                            break;
                        case 'BANKS':
                            state.ddlBanks = data;
                            break;
                        case 'CURRENCIES':
                            state.ddlCurrencies = data;
                            break;
                     }
                }
            })


    },
    
});





function getNewValues(field: string, state: AccountState, value: string) {
    switch (field) {
        case 'account-owner-text-field':
            state.accountData.usrId = value;
            break;
        case 'bank-name-text-field':
            state.accountData.bnkId = value;
            break;
        case 'currency-text-field':
            state.accountData.curId = value;
            break;
        case 'account-number-text-field':
            state.accountData.accNumber = value;
            break;
        case 'account-balance-text-field':
            state.accountData.accBalance = value;
            break;
    }
}



export const { handleInputValue, setMode } = accountSlice.actions;

export default accountSlice.reducer;
