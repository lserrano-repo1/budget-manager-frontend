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
import{ handleInputValue,
    setMode,} from './accountSlice'



const Account = (props: AccountProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const usrToken = useAppSelector(usr_token);
    const [displaySuccess, setDisplaySuccess] = React.useState(false);

    {
        /** Security */
    }
    useEffect(() => {
        if (usrToken === '') {
            navigate('/', { replace: true });
        }
    }, [usrToken]);

    return (
        <React.Fragment>
            <BaseLayout>
                <Grid
                    container
                    id="login-form-container-grid"
                    className="login-form-container">
                    {/** PAGE TITLE */}
                    <Typography variant="h2">Account Management</Typography>
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