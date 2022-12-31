import React, {useEffect} from 'react';
import { TranHistoryProps } from './tranHistory.d';
import { getAllTransactionsForFilter, handleInputValue} from './tranHistorySlice';
import { Box, Grid, Link, Paper, Table, TableBody
    , TableCell, TableContainer, TableHead
    , TableRow, Typography } from '@mui/material';
import BaseLayout from '../../component/Layout/BaseLayout';
import { RootState } from '../../app/store';
import {connect } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import './tranHistory.scss';



const TranHistory =(props:TranHistoryProps)=>{

    const dispatch = useAppDispatch();
    useEffect(()=>{
        const param = props.tranHistory.tranHistoryFilters;
        console.log("TranHistory: param");
        console.log(param);
        dispatch(getAllTransactionsForFilter(param));
   },[]);


    return(

        <BaseLayout>
            <React.Fragment>

            <Grid
                container
                id="app-main-dashboard-grid"
                className="login-form-container">
                    <Typography variant="h2">
                        Transactions History
                    </Typography>

                    <Grid
                        container
                        item
                        md={10}
                        lg={10}
                        id="filters-container"
                        style={{backgroundColor:'yellow'}}
                        className="login-form-container"
                    >
                        <Box>Filters Component</Box>
                    </Grid>


                    <Grid container item
                        md={10}
                        lg={10}
                        id="data-container"
                        /*style={{backgroundColor:'lime'}}*/
                        className="data-container">
                        <Box id="data-container-box">
                        <TableContainer id="data-table-container" component={Paper}>

                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">
                                                 No.
                                            </TableCell>
                                            <TableCell align="center">
                                                Bank Name
                                            </TableCell>
                                            <TableCell align="center">
                                                Account Number
                                            </TableCell>
                                            <TableCell align="center">
                                                Currency
                                            </TableCell>
                                            <TableCell align="center">
                                                Type
                                            </TableCell>

                                            <TableCell align="center">
                                                Category
                                            </TableCell>

                                            <TableCell align="center">
                                                Description
                                            </TableCell>

                                            <TableCell align="center">
                                                Amount
                                            </TableCell>
                                            
                                            <TableCell align="center">
                                                Date
                                            </TableCell>
                                           
                                        </TableRow>
                                    </TableHead>


                                    <TableBody>
                                        {props.tranHistory.tranHistoryList.length > 0 &&
                                            props.tranHistory.tranHistoryList.map(
                                                (item, index) => {
                                                    return (
                                                        <TableRow
                                                            key={`data-row-${index}`}
                                                            sx={{'&:last-child td, &:last-child th':{border: 0,},}}>
                                                            <TableCell component="th" scope="row">
                                                                <Typography variant='subtitle2'>{ item.trnId}</Typography>
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Typography variant='subtitle2'>{ item.bankName }</Typography>
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Typography variant='subtitle2'>{ item.accNumber }</Typography>
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Typography variant='subtitle2'>{ item.curName }</Typography>    
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Typography variant='subtitle2'>{ item.tranType }</Typography> 
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Typography variant='subtitle2'>{ item.catName }</Typography> 
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Typography variant='subtitle2'>{ item.tranDescription }</Typography> 
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Typography variant='subtitle2'>{ item.tranAmount }</Typography> 
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Typography variant='subtitle2'>{ item.tranDate }</Typography>
                                                            </TableCell>
                                        
                                                        </TableRow>
                                                    );
                                                }
                                            )}
                                    </TableBody>



                        </Table>

                            </TableContainer>


                        </Box>


                    </Grid>




            </Grid>
            </React.Fragment>
        </BaseLayout>
    );

};

const mapStateToProps = (state:RootState)=>({
    tranHistory: state.tranHistoryReducer,
});

export default connect(mapStateToProps,{
    handleInputValue,
})(TranHistory);

