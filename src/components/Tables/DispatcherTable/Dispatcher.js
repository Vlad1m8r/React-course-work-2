import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
// import { SvgIcon } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";

const Dispatcher = ({dispatcher, key, onEdit, onDelete}) => {
    return (

        <TableRow key={dispatcher.id}>
            <TableCell>{dispatcher.id}</TableCell>
            <TableCell>{dispatcher.firstName}</TableCell>
            <TableCell>{dispatcher.lastName}</TableCell>
            <TableCell>{dispatcher.email}</TableCell>
            <TableCell>{dispatcher.phoneNumber}</TableCell>
            <TableCell>{dispatcher.gender}</TableCell>
            <TableCell>{dispatcher.address}</TableCell>
            <TableCell>{dispatcher.salary}</TableCell>
            <TableCell>{dispatcher.ssn}</TableCell>
            <TableCell align="right">
                <IconButton aria-label="delete" onClick={() => onDelete(dispatcher.id)} color="secondary">
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => onEdit(dispatcher)} color="warning">
                    <EditIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default Dispatcher;