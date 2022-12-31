import React, {useEffect, useState} from 'react';
import { TranHistoryProps } from './tranHistory.d';
import { getAllTransactionsForFilter
    , handleInputValue
    , getAllCategoriesList} from './tranHistorySlice';
import { Box, Grid, Link, Paper, Table, TableBody
    , TableCell, TableContainer, TableHead
    , TableRow, Typography , Button} from '@mui/material';
import BaseLayout from '../../component/Layout/BaseLayout';
import { RootState } from '../../app/store';
import {connect } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format} from 'date-fns';
import InputSelectField from '../../component/SelectField/InputSelectField';
import './tranHistory.scss';




const TranHistory =(props:TranHistoryProps)=>{

    const dispatch = useAppDispatch();
    const [startDate, setStartDate] = useState(new Date());

    useEffect(()=>{
        const param = props.tranHistory.tranHistoryFilters;
        console.log("TranHistory: param");
        console.log(param);
        dispatch(getAllTransactionsForFilter(param));

        dispatch(getAllCategoriesList(null));

   },[ props.tranHistory.tranHistoryFilters]);

  



   const handleSelectDate=(selDate:any)=>{
       
        setStartDate(selDate);
   }


    return(

        <BaseLayout>
            <React.Fragment>

            <Grid
                container
                id="app-main-dashboard-grid"
                className="data-form-container">
                    <Typography variant="h2">
                        Transactions History
                    </Typography>

                    <Grid id="filters-container"
                        container item
                        style={{backgroundColor:'yellow'}}
                        className="filters-form-container"
                        md={10}
                        lg={10} 
                    >
                        <Grid item md={12} lg={12} id="filters-container-main-box">
                            Select date: 
                             <DatePicker 
                                id="datefilter-text-field"
                                selected={startDate} 
                                dateFormat="yyyy-MM-dd"
                                onChange={(date:Date) => {
                                    props.handleInputValue({
                                      value: date===null?(new Date()).toString():format(date,"yyyy-MM-dd"), 
                                      field: 'datefilter-text-field',
                                    })
                                    handleSelectDate(date);
                                }
                                }
                                /*isClearable
                                placeholderText="click here"*/
                                />
                        </Grid>
                        <Grid item md={12} lg={12} id="filters-container-main-box">
                            
                            <InputSelectField
                            id="filter-category"
                            name="filter-category"
                            label="Select Category:"
                            value={props.tranHistory.tranHistoryFilters.catId}
                            style={{ width: '200px' }}
                            onChange={(e: any) =>
                                props.handleInputValue({
                                    value: e.target.value,
                                    field: e.target.name,
                                })
                            }
                            itemsList={props.tranHistory.ddlCategories}
                        />
                        </Grid>
                        <Grid item md={12} lg={12} id="filters-container-main-box">
                            <InputSelectField
                            id="filter-account-number"
                            name="filter-account-number"
                            label="Select Account Number: "
                            /*value={props.person.personData.salutation}*/
                            style={{ width: '200px' }}
                            onChange={(e: any) =>
                                props.handleInputValue({
                                    value: e.target.value,
                                    field: e.target.name,
                                })
                            }
                           /* itemsList={SalutationList}*/
                        />
                        </Grid>
                        <Grid item md={12} lg={12} id="filters-container-main-box">
                            <Link id="reset-filters-button"
                               /* onClick={() => handleBankDataDelete(item)} */  >
                                Clear
                                </Link>
                        </Grid>
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

