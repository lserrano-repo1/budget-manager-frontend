import React, { useEffect } from 'react';
import { AccountProps, AccountData, AccountListData } from './account.d';
import { Grid, Link, Typography, FormControl, Box, Alert } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '../../component/Layout/BaseLayout';
import ActionButton from '../../component/Buttons/Button';
import InputField from '../../component/InputField/InputField';
import { RootState } from '../../app/store';
import { connect } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { usr_token } from '../../features/Person/personSlice';
import{ handleInputValue, setMode,} from './accountSlice'
import InputSelectField from '../../component/SelectField/InputSelectField';
import {loadDDLValues} from './accountSlice';



const Account = (props: AccountProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const usrToken = useAppSelector(usr_token);
    const [displaySuccess, setDisplaySuccess] = React.useState(false);

    {/** Security */}
    useEffect(() => {
        if (usrToken === '') {
            navigate('/', { replace: true });
        }
    }, [usrToken]);

    useEffect(() => {
      dispatch(loadDDLValues({list: "USERS"}));
      dispatch(loadDDLValues({list: "BANKS"}));
      dispatch(loadDDLValues({list: "CURRENCIES"}));
    }, [])
    

    const hideAddAccountForm = () => {
        setDisplaySuccess(false);
        dispatch(setMode('Display')); //Form to be set in DISPLAY mode
    };


    const handleNewAccount = () => {
        console.log('Attempting to create a new account');
       //TODO: redefine this function
        /*
        const data: BankData = {
            bankName: props.bank.bankData.bankName,
            bankAddress: props.bank.bankData.bankAddress,
            bankContact: props.bank.bankData.bankContact,
            bankEmail: props.bank.bankData.bankEmail,
            bankId: '',
        };
        
        dispatch(handleBankCreation(data));
        */
        setDisplaySuccess(true);
    };

    const displayAddAccountForm = () => {
        setDisplaySuccess(false);
        dispatch(setMode('Create')); //Form to be set in CREATE mode
    };


     /**
     * UPDATE
     * @param props
     */
     const handleAccountDataUpdate = () => {
        console.log('Updating data...');
        console.log(props);
/*
        const data: BankData = {
            bankId: props.bank.bankData.bankId,
            bankName: props.bank.bankData.bankName,
            bankAddress: props.bank.bankData.bankAddress,
            bankContact: props.bank.bankData.bankContact,
            bankEmail: props.bank.bankData.bankEmail,
        };
        dispatch(handleBankUpdate(data));
        if (props.bank.bankData.bankId !== '') {
            setDisplaySuccess(true);
        }
        */
    };

    return (
        <React.Fragment>
            <BaseLayout>
                <Grid
                    container
                    id="account-form-container-grid"
                    className="login-form-container">
                    {/** PAGE TITLE */}
                    <Typography variant="h2">Account Management</Typography>

                    <FormControl>
                        {
                            /*addAccount*/ (props.account.mode === 'Create' ||
                                props.account.mode === 'Update') && (
                                <React.Fragment>
                                    
                                    <div id="account-owner-input-div" className="field-item"> 
                                        {/** Account owner */}                                      
                                        <InputSelectField id="account-owner"
                                            name="account-owner"
                                            label="Owners Name"
                                            value={props.account.accountData.usrId}
                                            style={{ width: '250px' }}
                                            onChange={(e: any) =>
                                                props.handleInputValue({
                                                    value: e.target.value,
                                                    field: e.target.name,
                                                })
                                            }
                                            error={props.account.errorField}
                                            itemsList={props.account.ddlUsers}
                                        />  
                                    </div>

                                    <div id="bank-name-input-div" className="field-item"> 
                                        {/** Bank */}                                      
                                        <InputSelectField id="bank-name"
                                            name="bank-name"
                                            label="Bank Name"
                                            value={props.account.accountData.bnkId}
                                            style={{ width: '250px' }}
                                            onChange={(e: any) =>
                                                props.handleInputValue({
                                                    value: e.target.value,
                                                    field: e.target.name,
                                                })
                                            }
                                            error={props.account.errorField}
                                            itemsList={props.account.ddlBanks}
                                        />  
                                    </div>

                                    <div id="currency-input-div" className="field-item">
                                        {/** Currency */}
                                        <InputSelectField id="currency"
                                            name="currency"
                                            label="Currency"
                                            value={props.account.accountData.curId}
                                            style={{ width: '250px' }}
                                            onChange={(e: any) =>
                                                props.handleInputValue({
                                                    value: e.target.value,
                                                    field: e.target.name,
                                                    })
                                                }
                                            error={props.account.errorField}
                                            itemsList={props.account.ddlCurrencies}
                                        /> 
                                    </div>
                                    
                                    
                                    <div id="account-number-input-div" className="field-item">
                                        {/** Account number */} 
                                        <InputField
                                            id="account-number"
                                            name="account-number"
                                            type="text"
                                            label="Account Number"
                                            style={{ width: '250px' }}
                                            value={props.account.accountData.accNumber}
                                            onChange={(e: any) =>
                                                props.handleInputValue({
                                                    value: e.target.value,
                                                    field: e.target.name,
                                                })
                                            }
                                            error={props.account.errorField}
                                        />
                                    </div>


                                    <div id="account-balance-input-div" className="field-item">
                                        {/** Account balance */} 
                                        <InputField
                                            id="account-balance"
                                            name="account-balance"
                                            type="text"
                                            label="Account balance"
                                            style={{ width: '250px' }}
                                            value={props.account.accountData.accBalance}
                                            onChange={(e: any) =>
                                                props.handleInputValue({
                                                    value: e.target.value,
                                                    field: e.target.name,
                                                })
                                            }
                                            error={props.account.errorField}
                                        />
                                    </div>



                                </React.Fragment>
                            )
                        }
                    </FormControl>

                    {/** DISPLAY MESSAGES */}
                    <Box id="messages-display" style={{ paddingTop: '10px' }}>
                        {displaySuccess && (
                            <Alert severity="success">
                                Action performed successfully.
                            </Alert>
                        )}
                    </Box>

                     {/** ACTION BUTTONS */}
                     <Box id="buttons-box" className="buttons-box">
                        <ActionButton
                            id="cancel-adding-bank-button"
                            name="cancel-adding-bank-button"
                            renderBtnCancel={true}
                            label="Cancel"
                            onClickAction={hideAddAccountForm}
                        />

                        {
                            /*addBank*/ props.account.mode === 'Create' && (
                                <ActionButton
                                    id="save-bank-button"
                                    name="save-bank-button"
                                    renderBtnOkSubmitNext2={true}
                                    label="Save new account"
                                    onClickAction={handleNewAccount}
                                />
                            )
                        }

                        {
                            props.account.mode === 'Display' && (
                                <ActionButton
                                    id="add-bank-button"
                                    name="add-bank-button"
                                    renderBtnOkSubmitNext={true}
                                    label="Add new account"
                                    onClickAction={displayAddAccountForm}
                                />
                            )
                        }

                        {props.account.mode === 'Update' && (
                            <ActionButton
                                id="update-bank-button"
                                name="update-bank-button"
                                renderBtnOkSubmitNext2={true}
                                label="Update information"
                                onClickAction={handleAccountDataUpdate}
                            />
                        )}
                    </Box>





                </Grid>
            </BaseLayout>
        </React.Fragment>
    );
};



const mapStateToProps = (state: RootState) => ({
    account: state.accountReducer,
});

export default connect(mapStateToProps, {
    handleInputValue,
    setMode,
})(Account);