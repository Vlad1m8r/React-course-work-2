import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import {history} from "../../../index";

const Order = ({order, key, onEdit, onDelete}) => {

    const handleSetOrder = (order) => {
        history.push({
            pathname: `/editOrder/${order.id}`,
            state: {
                order: order,
            }
        })
    }


    return (
        <TableRow key={order.id}>
            <TableCell align={"center"}>{order.id}</TableCell>
            <TableCell align={"center"}>{order.date}</TableCell>
            <TableCell align={"center"}>{order.time}</TableCell>
            <TableCell align={"center"}>{order.roadTime}</TableCell>
            <TableCell align={"center"}>{order.distance}</TableCell>
            <TableCell align={"center"}>{order.cost}</TableCell>
            <TableCell align={"center"}>{order.addressFrom}</TableCell>
            <TableCell align={"center"}>{order.addressTo}</TableCell>
            <TableCell align={"center"}>
                <IconButton aria-label="delete" onClick={() => onDelete(order.id)} color="secondary">
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => handleSetOrder(order)} color="warning">
                    <EditIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default Order;