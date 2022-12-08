
import React from 'react';
import { connect } from "react-redux";
import { Button, Grid, Link, Typography, FormControl} from '@mui/material';
import InputField from '../../component/InputField/InputField';
import BaseLayout from '../../component/Layout/BaseLayout';
import {handleInputValue} from './userLoginSlice';
import { RootState } from '../../app/store';
import { UserLoginProps } from './userLogin.d';
import './userLogin.scss';



const UserLoginForm = (props: UserLoginProps) => {

    return (
     <BaseLayout>
                <Grid container id="login-form-container-grid" className='login-form-container'>
                <Typography variant="h2">User Login</Typography>
                     <FormControl>
                    
                        <div id='email-input-div' className='field-item'>
                            <InputField 
                                id="email" 
                                name="email" 
                                type="email" 
                                label="Email" 
                                value={props.login.email}
                                onChange={ 
                                    (e:any)=> props.handleInputValue({
                                        value:e.target.value,
                                        field:e.target.name })
                                }
                               /* error={props.}*/
                            />
                        </div>

                        <div id='pswrd-input-div' className='field-item'>
                            <InputField 
                                id="pswrd" 
                                name="pswrd" 
                                type="password" 
                                label="Password"
                                value={props.login.pswrd}
                                onChange={ 
                                    (e:any)=> props.handleInputValue({
                                        value:e.target.value,
                                        field:e.target.name })
                                }
                                />
                        </div>

                    
                        

                   </FormControl> 
                   <div id='submit-button-div' className='field-item'>
                            <Button type="submit" className="login-button">
                            <Typography variant="h4">Submit</Typography>
                            </Button>
                        </div>

                        <div className='field-item'>
                            <Link>
                                <Typography variant="h4">
                                    Not registered yet? click here.
                                </Typography>
                            </Link>
                        </div>

                </Grid>   
           
    </BaseLayout>
    );
};


const mapStateToProps = (state:RootState) =>({
    login:state.userLoginReducer,
});

export default  connect(mapStateToProps, {
    handleInputValue,
})(UserLoginForm);
