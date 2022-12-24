
import {
    AppBar, Toolbar, Box, styled, AppBarProps, Grid, Link, Typography
} from '@mui/material';
import React from 'react';
import {usr_token, isAuthenticated} from '../../features/Login/userLoginSlice';
import './style.scss';
import { useAppSelector } from '../../app/hooks';

const Header = () => {


    const usrToken = useAppSelector(usr_token);
    const isUserAuthenticated = useAppSelector(isAuthenticated);

    const AppBarStyled = styled(AppBar)<AppBarProps>(({ theme }) => ({
        boxShadow:'none'
    }));


    return (
        <React.Fragment>
               <AppBarStyled id='header-appbar' 
                role='banner' position='sticky' 
                className='header-app-bar' >

<Toolbar id='header-toolbar' className='header-tool-bar' style={{padding: '0px'}}>

    <Grid container id='header-main-grid' className='header-main-grid'>

        <Grid id='header-logo-grid' item xs={6} sm={6} md={6} lg={6} xl={6} >
            <img id='application-logo'
                className='logo-img'
                alt={'application-logo'}
                src={ `${process.env.PUBLIC_URL}/img/LogoWithImage.png`}
                width='125px' height='75px'
            />
        </Grid>

        <Grid id='header-logged-profile-grid' item xs={6} sm={6} md={6} lg={6} xl={6}
            style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box id='header-profile' className='header-profile'>
                {isUserAuthenticated && (
                    <React.Fragment>
                        <img id='user-logged-in-img' alt='user logged in' width='25px' height='25px'
                        src={`${process.env.PUBLIC_URL}/img/loggedIn.png`} />

                        <Link id="create-new-user-link" /*onClick={goToCreateNewUser}*/>
                            <Typography variant="body2">
                                Click to logout
                            </Typography>
                        </Link>
                    </React.Fragment>
                )}


            </Box>
        </Grid>

    </Grid>

</Toolbar>

</AppBarStyled>
        </React.Fragment>
    );
};

export default Header;
