import React from 'react';
import { connect } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import {
    Button,
    Grid,
    Link,
    Typography,
    FormControl,
    Box,
} from '@mui/material';
import InputField from '../../component/InputField/InputField';
import BaseLayout from '../../component/Layout/BaseLayout';
import { handleInputValue, handleUserLogin } from './userLoginSlice';
import { RootState } from '../../app/store';
//import { UserLoginProps, LoginData } from './userLogin.d';
import './userLogin.scss';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../../component/Buttons/Button';
import { PersonLoginData, UserLoginProps } from '../../app/App';

const UserLoginForm = (props: UserLoginProps) => {
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
            email: props.login.loginData.email,
            password: props.login.loginData.password,
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
                            value={props.login.loginData.email}
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
                            value={props.login.loginData.password}
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
    login: state.userLoginReducer,
});

export default connect(mapStateToProps, {
    handleInputValue,
})(UserLoginForm);
