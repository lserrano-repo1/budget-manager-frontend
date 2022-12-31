import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {TranHistoryData, TranHistoryState} from "./tranHistory.d";
import { InputChange } from "../../app/App";
import queryString from 'query-string';



const initialState:TranHistoryState={
    tranHistoryFilters: {
        filterBankAccount:null,
        filterCategory:null,
        filterDate:null
    },
    errorField: [],
    tranHistoryList: [],
    
};

 

export const getAllTransactionsForFilter = createAsyncThunk<any, any, any>(
    "transaction/getAll",
    async (data: TranHistoryData) => {
        try {
            console.info(`GET All accounts`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_TRANS_HISTORY_FILTER!);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            console.info(`TranHistoryData`);
            console.info(data);

            const response = await fetch(urlToFetch.url,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" }
                });

            const jsonResp = await response.json();

            console.log(`GET ALL Transactions for filter json response`);
            console.log(jsonResp);

            return {
                data: jsonResp.rows,
            }

        } catch (error) {
            console.error('Error ocurred while trying to get all transactions history: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get all transactions history" };
        }

    }
);


export const tranHistorySlice = createSlice({
    name:'tranHistorySlc',
    initialState,
    reducers:{
        handleInputValue: (state: TranHistoryState, action: PayloadAction<InputChange>) => {
            const { value, field } = action.payload;

           // getNewValues(field, state, value);
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllTransactionsForFilter.fulfilled, (state:TranHistoryState, action:PayloadAction<any>) =>{
                const {data} = action.payload;
                console.log("getAllTransactionsForFilter -> action.payload");
                console.log(action.payload);
                state.tranHistoryList = data;
            })
    },
});


export const {handleInputValue} = tranHistorySlice.actions;

export default tranHistorySlice.reducer;