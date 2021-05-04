import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DirectionsCarRoundedIcon from '@material-ui/icons/DirectionsCarRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import LocalTaxiRoundedIcon from '@material-ui/icons/LocalTaxiRounded';
import AdjustRoundedIcon from '@material-ui/icons/AdjustRounded';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import {history} from "../../index";

export const mainListItems = (



    <div>
        <ListItem button onClick={() => {history.push('/')}}>
            <ListItemIcon>
                <LocalTaxiRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Заказы" />
        </ListItem>
        <ListItem button onClick={() => {history.push('/client')}}>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Клиенты" />
        </ListItem>
        <ListItem button onClick={() => {history.push('/driver')}}>
            <ListItemIcon>
                <AdjustRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Водители" />
        </ListItem>
        <ListItem button onClick={() => {history.push('/dispatcher')}}>
            <ListItemIcon>
                <AssignmentIndRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Диспетчеры" />
        </ListItem>
        <ListItem button onClick={() => {history.push('/car')}}>
            <ListItemIcon>
                <DirectionsCarRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Машины" />
        </ListItem>

        <ListItem button onClick={() => {history.push('/author')}}>
            <ListItemIcon>
                <FaceRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Об авторе" />
        </ListItem>
    </div>
);