import React from 'react';
import { DashboardProps } from './dashboard.d';
import { Box, Grid, Link, Paper, Table, TableBody
    , TableCell, TableContainer, TableHead
    , TableRow, Typography } from '@mui/material';
import BaseLayout from '../../component/Layout/BaseLayout';

const Dashboard = (props: DashboardProps) => {
    return (
        <BaseLayout>
            <React.Fragment>
                <Grid
                    container
                    id="app-main-dashboard-grid"
                    className="login-form-container">
                    <Typography variant="h2">
                        Budget Manager Dashboard
                    </Typography>

                    <Grid
                        container
                        item
                        md={10}
                        lg={10}
                        id="filters-container"
                        style={{backgroundColor:'yellow'}}
                        /*className="login-form-container"*/>
                        <Box>Filters Component</Box>
                    </Grid>

                    <Grid
                        container
                        item
                        md={10}
                        lg={10}
                        id="data-container"
                        style={{backgroundColor:'lime'}}
                        /*className="login-form-container"*/>
                        <Box id="data-container-box">

                        <Typography variant="subtitle2">
                            <TableContainer id="data-table-container" component={Paper}>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">
                                                Account Owner
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
                                                Last Update
                                            </TableCell>
                                            <TableCell align="center">
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                   {/* <TableBody>
                                        {props.bank.banksList.length > 0 &&
                                            props.bank.banksList.map(
                                                (item, index) => {
                                                    return (
                                                        <TableRow
                                                            key={`data-row-${index}`}
                                                            sx={{
                                                                '&:last-child td, &:last-child th':
                                                                    {
                                                                        border: 0,
                                                                    },
                                                            }}>
                                                            <TableCell
                                                                component="th"
                                                                scope="row">
                                                                {item.bankId}
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                scope="row">
                                                                {item.bankName}
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                scope="row">
                                                                {
                                                                    item.bankAddress
                                                                }
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                scope="row">
                                                                {
                                                                    item.bankContact
                                                                }
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                scope="row">
                                                                {item.bankEmail}
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                scope="row">
                                                                <Link
                                                                    id={`del-data-row-${index}`}
                                                                    onClick={() =>
                                                                        handleBankDataDelete(
                                                                            item
                                                                        )
                                                                    }>
                                                                    Delete
                                                                </Link>
                                                                &nbsp;|&nbsp;
                                                                <Link
                                                                    id={`upd-data-row-${index}`}
                                                                    onClick={() =>
                                                                        retrieveDataToUpdate(
                                                                            item
                                                                        )
                                                                    }>
                                                                    Update
                                                                </Link>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                }
                                            )}
                                    </TableBody>
                                            */}
                                </Table>
                            </TableContainer>
                        </Typography>





                        </Box>
                    </Grid>

                    
                </Grid>
            </React.Fragment>
        </BaseLayout>
    );
};

export default Dashboard;
