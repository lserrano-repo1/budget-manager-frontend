import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../app/store';
import { useAppDispatch } from '../../app/hooks';
import { NewUserProps } from './newUser.d';
import BaseLayout from '../../component/Layout/BaseLayout';
import { Button, Grid, Box, Typography, FormControl } from '@mui/material';
import { handleInputValue } from './newUserSlice';
import InputField from '../../component/InputField/InputField';
import SalutationList from '../../component/Common/salutation';
import InputSelectField from '../../component/SelectField/InputSelectField';
import ActionButton from '../../component/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import './newUser.scss';

const NewUserForm = (props: NewUserProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goToLandingPage = () => {
        navigate('/', { replace: true });
    };

    const goToCreateNewUser = () => {
        console.log('creating new user');
    };

    return (
        <BaseLayout>
            <Grid
                container
                id="login-form-container-grid"
                className="login-form-container">
                <Typography variant="h2">Create New User</Typography>

                <FormControl>
                    <div id="salutation-input-div" className="field-item">
                        <InputSelectField
                            id="salutation"
                            name="salutation"
                            label="Salutation"
                            value={props.newUser.salutation}
                            style={{ width: '200px' }}
                            onChange={(e: any) =>
                                props.handleInputValue({
                                    value: e.target.value,
                                    field: e.target.name,
                                })
                            }
                            itemsList={SalutationList}
                        />
                    </div>

                    <div id="firstName-input-div" className="field-item">
                        <InputField
                            id="firstName"
                            name="firstName"
                            type="text"
                            label="First Name"
                            value={props.newUser.firstName}
                            inputFieldContainerStyle={{ width: '400px' }}
                            onChange={(e: any) =>
                                props.handleInputValue({
                                    value: e.target.value,
                                    field: e.target.name,
                                })
                            }
                        />
                    </div>

                    <div id="lastName-input-div" className="field-item">
                        <InputField
                            id="lastName"
                            name="lastName"
                            type="text"
                            label="Last Name"
                            value={props.newUser.lastName}
                            inputFieldContainerStyle={{ width: '400px' }}
                            onChange={(e: any) =>
                                props.handleInputValue({
                                    value: e.target.value,
                                    field: e.target.name,
                                })
                            }
                        />
                    </div>

                    <div id="email-input-div" className="field-item">
                        <InputField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            value={props.newUser.email}
                            inputFieldContainerStyle={{ width: '400px' }}
                            onChange={(e: any) =>
                                props.handleInputValue({
                                    value: e.target.value,
                                    field: e.target.name,
                                })
                            }
                        />
                    </div>

                    <div id="password-input-div" className="field-item">
                        <InputField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            value={props.newUser.password}
                            inputFieldContainerStyle={{ width: '400px' }}
                            onChange={(e: any) =>
                                props.handleInputValue({
                                    value: e.target.value,
                                    field: e.target.name,
                                })
                            }
                        />
                    </div>
                </FormControl>

                <Box id="buttons-box" className="buttons-box">
                    <ActionButton
                        id="cancel-button"
                        name="cancel-button"
                        renderBtnCancel={true}
                        label="Cancel"
                        onClickAction={goToLandingPage}
                    />

                    <ActionButton
                        id="create-new-user-btn"
                        name="create-new-user-btn"
                        renderBtnOkSubmitNext={true}
                        label="Sign Up"
                        onClickAction={goToCreateNewUser}
                    />
                </Box>

              
            </Grid>
        </BaseLayout>
    );
};

const mapStateToProps = (state: RootState) => ({
    newUser: state.newUserReducer,
});

export default connect(mapStateToProps, {
    handleInputValue,
})(NewUserForm);
