import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../app/store';
import { useAppDispatch } from '../../app/hooks';
import { PersonProps, PersonCreateData } from './person.d';
import BaseLayout from '../../component/Layout/BaseLayout';
import { Button, Grid, Box, Typography, FormControl } from '@mui/material';
import { handleInputValue, handleNewUserCreation } from './personSlice';
import InputField from '../../component/InputField/InputField';
import SalutationList from '../../component/Common/salutation';
import InputSelectField from '../../component/SelectField/InputSelectField';
import ActionButton from '../../component/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import './newUser.scss';

const NewUserForm = (props: PersonProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goToLandingPage = () => {
        navigate('/', { replace: true });
    };

    const goToCreateNewUser = () => {
        console.log('Attempting to creating new user');

        const data:PersonCreateData={
            salutation: props.person.personData.salutation,
            firstName: props.person.personData.firstName,
            lastName: props.person.personData.lastName,
            email: props.person.personData.loginData.email,
            password: props.person.personData.loginData.email,
        };

        dispatch(handleNewUserCreation(data));
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
                            value={props.person.personData.salutation}
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
                            value={props.person.personData.firstName}
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
                            value={props.person.personData.lastName}
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
                            value={props.person.personData.loginData.email}
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
                            id="pswrd"
                            name="pswrd"
                            type="password"
                            label="Password"
                            value={props.person.personData.loginData.password}
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
    person: state.personReducer,
});

export default connect(mapStateToProps, {
    handleInputValue,
})(NewUserForm);
