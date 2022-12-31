



export interface TranHistoryProps{
    tranHistory:TranHistoryState;
    handleInputValue: (payload:InputChange) => ActionCreatorWithPayload<InputChange,string>;
}


export interface TranHistoryState{
    tranHistoryFilters:TranHistoryFilters;
    tranHistoryList: TranHistoryData[];

    errorField : ErrorField[];
}

export interface TranHistoryFilters {
    filterDate: string|null;
    filterCategory: string|null;
    filterBankAccount:string|null;
}

export interface TranHistoryData{
    trnId:string|null;
    curName: string|null;
    accNumber: string|null;
    bankName: string|null;
    catName: string|null;
    tranType: string|null;
    tranAmount:string|null;
    tranDescription: string|null;
    tranDate: string|null;
}