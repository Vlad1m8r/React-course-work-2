import React, {useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import axios from "axios";

function preventDefault(event) {
    event.preventDefault();
}


export default function Deposits() {
    const [chartInfo, setchartInfo] = useState({
        min:0,
        max:0,
        sum:0,
    })


    axios.get(`http://localhost:8080/api/v1/orders/deposit`)
        .then(response => {
            const chartInfo = response.data;
            setchartInfo(chartInfo)
        })

    // const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Статистика</Title>
            <Typography component="p" variant="h6">
                Всего заработано
            </Typography>
            <Typography component="p" color="textSecondary" variant="h7">
                {chartInfo.sum}
            </Typography>
            <Typography variant="h6">
                Мин цена поездки
            </Typography>
            <Typography color="textSecondary" variant="h7">
                {chartInfo.min}
            </Typography>
            <Typography variant="h6">
                Макс цена поездки
            </Typography>
            <Typography color="textSecondary" variant="h7">
                {chartInfo.max}
            </Typography>

        </React.Fragment>
    );
}