import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
// import { SvgIcon } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import {history} from "../../../index";

const Driver = ({driver, key, onEdit, onDelete}) => {


    const handleSetDriver = (driver) => {
        history.push({
            pathname: `/editDriver/${driver.id}`,
            state: {
                driver: driver,
            }
        })
    }

    return (

        <TableRow key={driver.id}>
            <TableCell>{driver.id}</TableCell>
            <TableCell>{driver.firstName}</TableCell>
            <TableCell>{driver.lastName}</TableCell>
            <TableCell>{driver.email}</TableCell>
            <TableCell>{driver.phoneNumber}</TableCell>
            <TableCell>{driver.gender}</TableCell>
            <TableCell>{driver.address}</TableCell>
            <TableCell>{driver.driverLicenseIssueDate}</TableCell>
            <TableCell align="right">
                <IconButton aria-label="delete" onClick={() => onDelete(driver.id)} color="secondary">
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleSetDriver(driver)} color="warning">
                    <EditIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default Driver;