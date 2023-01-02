import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { InputChange, DDLData } from "../../app/App";
import { TransferenceState, TransferenceData, CurrencyByAccountData } from './transference.d';
import queryString from 'query-string';


const initialState: TransferenceState={
    srcAccountData: {
        accId:'',
        catId:'',
        curId:'',
        trnAmount:'',
        trnDescription:'',
        typId:'',
        trnId:''
    },
    dstAccountData: {
        accId:'',
        catId:'',
        curId:'',
        trnAmount:'',
        trnDescription:'',
        typId:'',
        trnId:''
    },
    errorField: [],
    mode: 'Update',
    ddlAccounts: [], 
    ddlSrcCurrencies: [],
    ddlDstCurrencies: [],
    srcAccountBalance:'',
    dstAccountBalance:'',
};


export const getAllAccountsList = createAsyncThunk<any, any, any>(
    "transfer/srcAccounts",
     async (data: DDLData ) => {
        try {
            console.info(`GET All Source (SRC) bank acounts`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_DDL_ACCOUNTS!);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            console.info(`DDLData`);
            console.info(data);

            const response = await fetch(urlToFetch.url,
                {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                });

            const jsonResp = await response.json();

            console.log(`GET ALL Accounts json response`);
            console.log(jsonResp);
    
            return {
                data: jsonResp.rows,
            }
            
        } catch (error) {
            console.error('Error ocurred while trying to get all registered source accounts: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get all registered source accounts" };
        }
     }
);


export const getCurrencyByAccount = createAsyncThunk<any, any, any>(
    "transfer/currencyByAccount",
     async (dataIn: CurrencyByAccountData) => {
        try{
            console.info(`GET All curencies ralted to the given account`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_DDL_CURRENCY_BY_ACCOUNT!+`/${dataIn.accId}`);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            console.info(`dataIn:{accId, transfAccType}`);
            console.info(dataIn.accId);
            console.info(dataIn.transfAccType);

            const response = await fetch(urlToFetch.url,
                {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                });

            const jsonResp = await response.json();

            console.log(`GET ALL currencies given an account id, JSON response`);
            console.log(jsonResp);

            return {
                data: jsonResp.rows,
                transfAccType: dataIn.transfAccType
            }
        } catch (error) {
            console.error('Error ocurred while trying to get all currencies filtered by account: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get all currencies filtered by account" };
        }
 
});




export const getAccountSummary = createAsyncThunk<any, any, any>(
    "transfer/accountSummary",
     async (dataIn: CurrencyByAccountData) => {
        try{
            console.info(`GET account summary (balance) given its ID`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_ACCOUNT_SUMMARY!+`/${dataIn.accId}`);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            console.info(`dataIn:{accId, transfAccType}`);
            console.info(dataIn.accId);
            console.info(dataIn.transfAccType);

            const response = await fetch(urlToFetch.url,
                {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                });

            const jsonResp = await response.json();

            console.log(`GET account summary (balance) given its ID, JSON response`);
            console.log(jsonResp);

            return {
                data: jsonResp.rows,
                transfAccType: dataIn.transfAccType
            }
        } catch (error) {
            console.error('Error ocurred while trying to get account summary given its ID: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get account summary given its ID" };
        }
 
});





export const transferenceSlice = createSlice({
    name:'transferenceSlc',
    initialState,
    reducers:{
        handleInputValue: (state: TransferenceState, action: PayloadAction<InputChange>) => {
            const { value, field } = action.payload;

            getNewValues(field, state, value);
        },
        setMode: (state: TransferenceState, action: PayloadAction<any>) => {
            const { mode } = action.payload;
            console.log("Setting Transaction Mode");
            console.log(action.payload);
            state.mode = action.payload;
        }
    },
    
    extraReducers:(builder)=>{
        builder
            .addCase(getAllAccountsList.fulfilled, (state:TransferenceState, action:PayloadAction<any>) =>{
                const {data} = action.payload;
                console.log("getAllAccountsList -> action.payload");
                console.log(action.payload);
                state.ddlAccounts = data;
            })

            .addCase(getCurrencyByAccount.fulfilled, (state: TransferenceState, action: PayloadAction<any>) => {
                const { data, transfAccType } = action.payload;
                console.log("getCurrencyByAccount -> action.payload");
                console.log(action.payload);

                if (data !== undefined && data.length > 0) {
                    if (transfAccType === 'SRC') {
                        state.ddlSrcCurrencies = data;
                        state.srcAccountData.curId = data[0].value;
                    } else if (transfAccType === 'DST') {
                        state.ddlDstCurrencies = data;
                        state.dstAccountData.curId = data[0].value;
                    } else {
                        state.ddlDstCurrencies = [];
                        state.dstAccountData.curId = "";
                        state.ddlSrcCurrencies = [];
                        state.srcAccountData.curId = "";
                    }
                }

            })


            .addCase(getAccountSummary.fulfilled, (state: TransferenceState, action: PayloadAction<any>) => {
                const { data, transfAccType } = action.payload;
                console.log("getAccountSummary -> action.payload");
                console.log(action.payload);

                if (data !== undefined && data.length > 0) {
                    if (transfAccType === 'SRC') {
                        state.srcAccountBalance = data[0].accBalance;

                    } else if (transfAccType === 'DST') {
                        state.dstAccountBalance = data[0].accBalance;
                    } else {
                        state.srcAccountBalance = '';
                        state.dstAccountBalance = '';
                    }
                }

            })     
    },
});



function getNewValues(field: string, state: TransferenceState, value: string) {
    switch (field) {
        case 'src-account-number-text-field':
            state.srcAccountData.accId = value;
            state.dstAccountData.accId='';
            state.dstAccountData.curId='';
            break;
        case 'dst-account-number-text-field':
            state.dstAccountData.accId = value;
            break;
        case 'src-amount-to-transfer-text-field':
            state.srcAccountData.trnAmount=value;
            break;
    }
};

export const {handleInputValue, setMode} = transferenceSlice.actions;

export default transferenceSlice.reducer;
