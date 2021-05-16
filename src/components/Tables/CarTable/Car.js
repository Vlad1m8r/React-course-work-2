import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
// import { SvgIcon } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from '@material-ui/core/IconButton';
import {hslToRgb} from "@material-ui/core";
import {history} from "../../../index";

const Car = ({car, key, onEdit, onDelete}) => {

    const handleSetCar = (car) => {
        history.push({
            pathname: `/editCar/${car.id}`,
            state: {
                car: car,
            }
        })
    }


    return (
        <TableRow key={car.id}>
            <TableCell>{car.id}</TableCell>
            <TableCell>{car.carVIN}</TableCell>
            <TableCell>{car.carNumber}</TableCell>
            <TableCell>{car.carModel}</TableCell>
            <TableCell>{car.carCategory}</TableCell>
            <TableCell ><font color={car.carColor}>{car.carColor}</font></TableCell>
            <TableCell align="right">{car.carModelYear}</TableCell>
            <TableCell align="right">

                <IconButton aria-label="delete" onClick={() => onDelete(car.id)} color="secondary">
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleSetCar(car)} color="warning">
                    <EditIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default Car;