import React, {useState} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import {useDispatch, useSelector} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import TableCell from "@material-ui/core/TableCell";
import {keys} from "@material-ui/core/styles/createBreakpoints";
import axios from "axios";

// Generate Sales Data
function createData(date, cost) {
    return { date, cost };
}

function updateData () {

    var dateNow = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    var year = dateNow.getFullYear()
    var month = dateNow.getMonth()
    for (let i=1;i<31;i++)
    {
        var date = (new Date(year, month, i)).toISOString().split('T')[0];

    }


    return [

        createData('2021-04-01', 59.46),
        createData('2021-04-03', 2),
        createData('2021-04-13', 100),
        createData('2021-04-18', 20.46),
        createData('2021-04-19', 200),
        createData('2021-04-25', 20)

    ]
}

export default function Chart() {
    const ordersData = useSelector(state => state.ordersData.orders)
    const [data, setData] = useState(updateData)
    // debugger


    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>За месяц
                <IconButton aria-label="delete" color="warning" onClick={() => setData(updateData())}>
                    <EditIcon />
                </IconButton></Title>

            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Стоимость (Р)
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="cost" stroke={theme.palette.primary.main} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}