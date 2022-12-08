
import {
    AppBar, Toolbar, Box, styled, AppBarProps, Grid
} from '@mui/material';
import React from 'react';
import './style.scss';

const Header = () => {

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
                src={ `${process.env.PUBLIC_URL}/img/LogoWithImage.png`
                   }
            />
        </Grid>

        <Grid id='header-logged-profile-grid' item xs={6} sm={6} md={6} lg={6} xl={6}
            style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box id='header-profile' className='header-profile'>
                here will go an icon
            </Box>
        </Grid>

    </Grid>

</Toolbar>

</AppBarStyled>
        </React.Fragment>
    );
};

export default Header;
