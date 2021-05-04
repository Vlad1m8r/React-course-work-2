import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import "./DriverDash.css"
import DriverTable from "../../Tables/DriverTable/DriverTable";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import TableCell from "@material-ui/core/TableCell";
import Container from "@material-ui/core/Container";

const DriverDash = () => {
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

    return (
        <div className="driverTable">
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                {/*<Grid container spacing={3}>*/}
                <Container maxWidth="lg" className={classes.container} xs={12} md={12} lg={12}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <DriverTable/>
                        </Paper>
                    </Grid>
                </Container>
                {/*</Grid>*/}
            </main>
        </div>
    );
};

export default DriverDash;