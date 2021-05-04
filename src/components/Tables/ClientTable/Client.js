import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const Client = ({client, key, onEdit, onDelete}) => {
    return (

        <TableRow key={client.id}>
            <TableCell>{client.id}</TableCell>
            <TableCell>{client.firstName}</TableCell>
            <TableCell>{client.lastName}</TableCell>
            <TableCell>{client.phoneNumber}</TableCell>
            <TableCell align="right">
                <IconButton aria-label="delete" onClick={() => onDelete(client.id)} color="secondary">
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => onEdit(client)} color="warning">
                    <EditIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default Client;