import React , { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Link, Typography, FormControl, Box, Alert } from '@mui/material';
import {handleInputValue, setMode} from './transferenceSlice';
import { TransferenceData, TransferenceProps, CurrencyByAccountData} from './transference.d';
import { getAllAccountsList
    , getCurrencyByAccount
    , getAccountSummary} from './transferenceSlice';
import BaseLayout from '../../component/Layout/BaseLayout';
import ActionButton from '../../component/Buttons/Button';
import InputField from '../../component/InputField/InputField';
import { usr_token } from '../../features/Person/personSlice';
import InputSelectField from '../../component/SelectField/InputSelectField';
import './transference.scss';

const AccTransference =(props: TransferenceProps)=>{


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const usrToken = useAppSelector(usr_token);
    const [displaySuccess, setDisplaySuccess] = React.useState(false);

    {/** Security */}
    useEffect(() => {
        if(usrToken===""){
            navigate('/', { replace: true });
        }
    }, [usrToken]);


    /** If source accId changes then all fields needs to be refreshed */
    useEffect(()=>{


        dispatch(getAllAccountsList(null)); //source account list

        dispatch(getCurrencyByAccount( {accId:props.transfer.srcAccountData.accId, transfAccType: "SRC"} ));
        dispatch(getAccountSummary({accId:props.transfer.srcAccountData.accId, transfAccType: "SRC"}));


        dispatch(getCurrencyByAccount( {accId:props.transfer.dstAccountData.accId, transfAccType: "DST"} )); 

    },[props.transfer.srcAccountData.accId, props.transfer.dstAccountData.accId]);



    return (

        <React.Fragment>
        <BaseLayout>
            <Grid id="transference-form-container-grid"
                container className="login-form-container">
                {/** PAGE TITLE */}
                <Typography variant="h2">Internal Account Transferences</Typography>

                <Grid container item id='transfer-main-grid' 
                    xs={12} sm={12} md={6} lg={6} xl={6} 
                    className="transfer-main-grid">
                
                    <Grid item id="transfer-source-account-container-grid"
                        /*style={{backgroundColor:'cyan'}}*/ >
                        
                       
                        <div id="source-account-input-div" className="field-item"> 
                             {/** Source banck account */}                                      
                            <InputSelectField id="src-account-number"
                                name="src-account-number"
                                label="Source account"
                                value={props.transfer.srcAccountData.accId}
                                style={{ width: '250px' }}
                                onChange={(e: any) =>
                                    props.handleInputValue({
                                        value: e.target.value,
                                        field: e.target.name,
                                    })
                                }
                                itemsList={props.transfer.ddlAccounts}
                            />  
                        </div>

                        { props.transfer.srcAccountData.accId!=='' && (
                            <React.Fragment>
                            <div id="currency-input-div" className="field-item">
                                {/** Source Currency Id field */}
                                <InputSelectField id="src-currency"
                                    name="src-currency"
                                    label="Source currency"
                                    value={props.transfer.srcAccountData.curId}
                                    style={{ width: '250px' }}
                                    onChange={(e: any) =>
                                        props.handleInputValue({
                                            value: e.target.value,
                                            field: e.target.name,
                                            })
                                        }
                                    itemsList={props.transfer.ddlSrcCurrencies}
                                /> 
                            </div>

                            <div id="src-acc-balance-input-div" className="field-item">
                                {/** Source account current balance */}
                                <InputField
                                    id="src-account-balance"
                                    name="src-account-balance"
                                    type="text"
                                    label="Current balance"
                                    value={props.transfer.srcAccountBalance}
                                    inputFieldContainerStyle={{ width: '150px' }}
                                />
                            </div>


                            <div id="src-amount-input-div" className="field-item">
                                {/** Source account current balance */}
                                <InputField
                                    id="src-amount-to-transfer"
                                    name="src-amount-to-transfer"
                                    type="text"
                                    label="Current balance"
                                    value={props.transfer.srcAccountData.trnAmount}
                                    inputFieldContainerStyle={{ width: '150px' }}
                                    onChange={(e: any) =>
                                        props.handleInputValue({
                                            value: e.target.value,
                                            field: e.target.name,
                                        })
                                    }
                                />
                            </div>

                            </React.Fragment>
                        )}

                    </Grid>

                    <Grid item id="transfer-destination-account-container-grid">
                        <img id='transfer-img' 
                            src={`${process.env.PUBLIC_URL}/img/money-transfer.png`}
                            width='100px'
                            height='100px'
                            style={{padding:'25px 5px 25px 5px'}}/>
                    </Grid>

                    <Grid item id="transfer-destination-account-container-grid">
                        
                        { props.transfer.srcAccountData.accId!=='' && (
                            <React.Fragment>
                                
                                {/** Source bank account */}
                                <div id="destination-account-input-div" className="field-item">                                       
                                    <InputSelectField id="dst-account-number"
                                        name="dst-account-number"
                                        label="Destination account"
                                        value={props.transfer.dstAccountData.accId}
                                        style={{ width: '250px' }}
                                        onChange={(e: any) =>
                                            props.handleInputValue({
                                                value: e.target.value,
                                                field: e.target.name,
                                            })
                                        }
                                        itemsList={props.transfer.ddlAccounts.filter(
                                            data => data.value !== props.transfer.srcAccountData.accId
                                        )}
                                    />  
                                </div>

                                <div id="currency-input-div" className="field-item">
                                    {/** Source Currency Id field */}
                                    <InputSelectField id="dst-currency"
                                        name="dst-currency"
                                        label="Destination currency"
                                        value={props.transfer.dstAccountData.curId}
                                        style={{ width: '250px' }}
                                        onChange={(e: any) =>
                                            props.handleInputValue({
                                                value: e.target.value,
                                                field: e.target.name,
                                                })
                                            }
                                        itemsList={props.transfer.ddlDstCurrencies}
                                    /> 
                                </div>

                              
                                
                            </React.Fragment>
                        )}

                        {/** ACTION BUTTONS */}
                        { props.transfer.srcAccountData.trnAmount!=='' 
                        && props.transfer.dstAccountData.accId!==''
                        && parseInt(props.transfer.srcAccountBalance)>0
                        && ( 
                            <Box id="buttons-box" className="transfer-action-buttons-box">
                                <ActionButton
                                    id="cancel-button"
                                    name="cancel-button"
                                    renderBtnCancel={true}
                                    label="Cancel"
                                    /*onClickAction={goToLandingPage}*/
                                />

                                <ActionButton
                                    id="create-new-user-btn"
                                    name="create-new-user-btn"
                                    renderBtnOkSubmitNext={true}
                                    label="Proceed"
                                    /*onClickAction={goToCreateNewUser}*/
                                />
                            </Box>
                        )}

                    </Grid> {/** END of destination account - column 2 */}

                </Grid>

            </Grid>
        </BaseLayout>
    </React.Fragment>

    );


};




const mapStateToProps =(state: RootState) =>({
    transfer : state.transferReducer,
});

export default connect(mapStateToProps,{
    handleInputValue,
    setMode,
})(AccTransference);