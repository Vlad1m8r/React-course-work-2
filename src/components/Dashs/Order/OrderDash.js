import React, {useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "../../Main/Chart";
import Deposits from "../../Main/Deposits";
import Orders from "../../Main/Orders";
import Box from "@material-ui/core/Box";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import OrderTable from "../../Tables/OrderTable/OrderTable";
import CreateOrderModal from "../../Creaters/OrderCreater/createOrderModal";

const OrderDash = () => {


    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        menuButtonHidden: {
            display: 'none',
        },
        title: {
            flexGrow: 1,
        },

        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        },
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        fixedHeight: {
            height: 240,
        },
    }));

    const classes = useStyles();
    // const [open, setOpen] = React.useState(true);
    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // };
    // const handleDrawerClose = () => {
    //     setOpen(false);
    // };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        // <div>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container} xs={12} md={12} lg={12}>
                    <Grid container spacing={3} >
                        {/* Chart */}
                        {/*<Grid item xs={12}>*/}
                            <Grid item xs={12} md={12} lg={9}>
                                <Paper className={fixedHeightPaper}>
                                    <Chart/>
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={12} lg={3}>
                                <Paper className={fixedHeightPaper}>
                                    <Deposits/>
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <OrderTable/>
                                </Paper>
                            </Grid>
                        {/*</Grid>*/}
                    </Grid>
                </Container>
            </main>

        // </div>
    );
};

export default OrderDash;