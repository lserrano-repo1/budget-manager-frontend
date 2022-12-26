import React from 'react';
import { RootState } from '../../app/store';
import { connect } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {Grid,Link,Typography,FormControl,Box} from '@mui/material';
import InputField from '../../component/InputField/InputField';
import BaseLayout from '../../component/Layout/BaseLayout';
import { handleInputValue, handleUserLogin } from './personSlice';
import { PersonProps, PersonLoginData } from './person.d';
import ActionButton from '../../component/Buttons/Button';

import './person.scss';


const UserLoginForm = (props: PersonProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goToLandingPage = () => {
        navigate('/', { replace: true });
    };

    const goToCreateNewUser = () => {
        console.log('Redirecting to register a new user...');
        navigate('/newuser', { replace: true });
    };

    const goToLogin = (/*e: any*/) => {
        console.log('Attempting to login...');
        /*e.preventDefault();*/
        console.info('Submitting login information');
       

        const data: PersonLoginData = {
            email: props.person.personData.loginData.email,
            password: props.person.personData.loginData.password,
        };

        dispatch(handleUserLogin(data));
    };

    return (
        <BaseLayout>
            <Grid
                container
                id="login-form-container-grid"
                className="login-form-container">
                <Typography variant="h2">User Login</Typography>
                <FormControl>
                    <div id="email-input-div" className="field-item">
                        <InputField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            value={props.person.personData.loginData.email}
                            onChange={(e: any) =>
                                props.handleInputValue({
                                    value: e.target.value,
                                    field: e.target.name,
                                })
                            }
                            /* error={props.}*/
                        />
                    </div>

                    <div id="pswrd-input-div" className="field-item">
                        <InputField
                            id="pswrd"
                            name="pswrd"
                            type="password"
                            label="Password"
                            value={props.person.personData.loginData.password}
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
                        id="login-user-btn"
                        name="login-user-btn"
                        renderBtnOkSubmitNext={true}
                        label="Login"
                        onClickAction={goToLogin}
                    />
                </Box>

                <div className="field-item">
                    <Link id="create-new-user-link" onClick={goToCreateNewUser}>
                        <Typography variant="body2">
                            Not registered yet? click here.
                        </Typography>
                    </Link>
                </div>
            </Grid>
        </BaseLayout>
    );
};

const mapStateToProps = (state: RootState) => ({
    person: state.personReducer,
});

export default connect(mapStateToProps, {
    handleInputValue,
})(UserLoginForm);
