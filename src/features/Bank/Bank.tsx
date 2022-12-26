import React from 'react';
import { BankProps } from './bank.d';
import { Grid, Link, Typography, FormControl, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserLoginForm from '../Person/UserLoginForm';
import BaseLayout from '../../component/Layout/BaseLayout';
import ActionButton from '../../component/Buttons/Button';
import InputField from '../../component/InputField/InputField';
import { RootState } from '../../app/store';
import { connect } from 'react-redux';
import { handleInputValue } from './bankSlice';

const Bank = (props: BankProps) => {
    const [addBank, setAddBank] = React.useState(false);

    const displayAddBankForm = () => {
        setAddBank(true);
    };

    const hideAddBankForm = () => {
        setAddBank(false);
    };

    return (
        <React.Fragment>
            <BaseLayout>
                <Grid
                    container
                    id="login-form-container-grid"
                    className="login-form-container">
                    <Typography variant="h2">Bank Management</Typography>

                    <FormControl>
                        {addBank && (
                            <React.Fragment>
                                <div
                                    id="bank-name-input-div"
                                    className="field-item">
                                    <InputField
                                        id="bank-name"
                                        name="bank-name"
                                        type="text"
                                        label="Name"
                                        value={props.bank.bankData.bankName}
                                        onChange={(e: any) =>
                                            props.handleInputValue({
                                                value: e.target.value,
                                                field: e.target.name,
                                            })
                                        }
                                        error={props.bank.errorField}
                                    />
                                </div>

                                <div
                                    id="bank-address-input-div"
                                    className="field-item">
                                    <InputField
                                        id="bank-address"
                                        name="bank-address"
                                        type="text"
                                        label="Address"
                                        value={props.bank.bankData.bankAddress}
                                        onChange={(e: any) =>
                                            props.handleInputValue({
                                                value: e.target.value,
                                                field: e.target.name,
                                            })
                                        }
                                        error={props.bank.errorField}
                                    />
                                </div>

                                <div
                                    id="bank-contact-input-div"
                                    className="field-item">
                                    <InputField
                                        id="bank-contact"
                                        name="bank-contact"
                                        type="text"
                                        label="Contact name"
                                        value={props.bank.bankData.bankContact}
                                        onChange={(e: any) =>
                                            props.handleInputValue({
                                                value: e.target.value,
                                                field: e.target.name,
                                            })
                                        }
                                        error={props.bank.errorField}
                                    />
                                </div>

                                <div
                                    id="bank-contact-email-input-div"
                                    className="field-item">
                                    <InputField
                                        id="bank-contact-email"
                                        name="bank-contact-email"
                                        type="email"
                                        label="Contact email"
                                        value={props.bank.bankData.bankEmail}
                                        onChange={(e: any) =>
                                            props.handleInputValue({
                                                value: e.target.value,
                                                field: e.target.name,
                                            })
                                        }
                                        error={props.bank.errorField}
                                    />
                                </div>
                            </React.Fragment>
                        )}
                    </FormControl>

                    <Box id="buttons-box" className="buttons-box">
                        <ActionButton
                            id="cancel-adding-bank-button"
                            name="cancel-adding-bank-button"
                            renderBtnCancel={true}
                            label="Cancel"
                            onClickAction={hideAddBankForm}
                        />

                        {addBank && (
                            <ActionButton
                                id="save-bank-button"
                                name="save-bank-button"
                                renderBtnOkSubmitNext2={true}
                                label="Save"
                                onClickAction={displayAddBankForm}
                            />
                        )}

                        {!addBank && (
                            <ActionButton
                                id="add-bank-button"
                                name="add-bank-button"
                                renderBtnOkSubmitNext={true}
                                label="New Bank"
                                onClickAction={displayAddBankForm}
                            />
                        )}
                    </Box>
                </Grid>
            </BaseLayout>
        </React.Fragment>
    );
};


const mapStateToProps = (state:RootState)=>({
    bank:state.bankReducer,
});

export default  connect(mapStateToProps,{
    handleInputValue,
})(Bank);
