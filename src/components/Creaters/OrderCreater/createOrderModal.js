import React, {useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import "./orderModal.scss"
import {connect, useDispatch, useSelector} from "react-redux";
import TextField from '@material-ui/core/TextField';
import EditIcon from "@material-ui/icons/Edit";
import {createOrder} from "../../../actions/orderAction";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import CloseIcon from '@material-ui/icons/Close';

const CreateOrderModal = ({order, active, setActive}) => {
    const error = useSelector(state => state.ordersData.error);
    const clients = useSelector(state => state.clientsData.clients);
    const drivers = useSelector(state => state.driversData.drivers);
    const dispatchers = useSelector(state => state.dispatchersData.dispatchers);
    const dispatch = useDispatch()

    const [orderData, setOrderData] = useState(
        {
            id: order?.id,
            date: order?.date,
            time: order?.time,
            roadTime: order?.roadTime,
            distance: order?.distance,
            cost: order?.cost,
            addressTo: order?.addressTo,
            addressFrom: order?.addressFrom,
            driver: order?.driver,
            client: order?.client,
            dispatcher: order?.dispatcher
        }
    )

    function handleOnValueChange(e) {
        console.log(orderData)
        // debugger
        setOrderData({...orderData, [e.target.id]: e.target.value}
        )
        console.log(orderData)
    }

    function handleReset(e) {
        e.preventDefault()
        setActive(false)
        setOrderData({
            id: null,
            date: null,
            time: null,
            roadTime: null,
            distance: null,
            cost: null,
            addressTo: null,
            addressFrom: null,
            driver: null,
            client: null,
            dispatcher: null
        })
    }


    function handleSubmit(e) {
        e.preventDefault();
        console.log(orderData);
        dispatch(createOrder(orderData))
    }

    function reloadDataOrder() {
        setOrderData({
            id: orderData?.id ? orderData?.id : order?.id,
            date: orderData?.date ? orderData?.date : order?.date,
            time: orderData?.time ? orderData?.time : order?.time,
            roadTime: orderData?.roadTime ? orderData?.roadTime : order?.roadTime,
            distance: orderData?.distance ? orderData?.distance : order?.distance,
            cost: orderData?.cost ? orderData.cost : order?.cost,
            addressTo: orderData?.addressTo ? orderData?.addressTo : order?.addressTo,
            addressFrom: orderData?.addressFrom ? orderData?.addressFrom : order?.addressFrom,
            driver: orderData?.driver ? orderData?.driver : order?.driver,
            client: orderData?.client ? orderData?.client : order?.client,
            dispatcher: orderData?.dispatcher ? orderData?.dispatcher : order?.dispatcher

        })
    }

    return (
        <div id="modal" className={active ? "create-modal active" : "create-modal"} onClick={(e) => handleReset(e)}>


            <div className="create-modal__content" onClick={e => e.stopPropagation()}>
                {error ?
                    <div className="alter-danger" role='alert'>
                        {error}
                    </div> : ""
                }

                <form className="create-modal__form" onSubmit={(e) => handleSubmit(e)} onMouseOver={reloadDataOrder}>

                    <Grid container spacing={2} justify={"center"}>

                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Дата"
                                variant="outlined"
                                id="date"
                                value={orderData?.date ? orderData?.date : order?.date}
                                type="date"
                                name="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Время"
                                variant="outlined"
                                id="time"
                                value={orderData?.time ? orderData?.time : order?.time}
                                type="time"
                                name="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} md={4} lg={4}>
                            <TextField
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Время в пути"
                                variant="outlined"
                                id="roadTime"
                                value={orderData?.roadTime ? orderData?.roadTime : order?.roadTime}
                                type="number"
                                name="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} md={4} lg={4}>
                            <TextField
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Расстояние"
                                variant="outlined"
                                id="distance"
                                value={orderData?.distance ? orderData?.distance : order?.distance}
                                type="number"
                                fullWidth
                                name="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} md={4} lg={4}>
                            <TextField
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Цена"
                                variant="outlined"
                                id="cost"
                                value={orderData?.cost ? orderData?.cost : order?.cost}
                                type="number"
                                fullWidth
                                name="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Пункт назначения"
                                variant="outlined"
                                id="addressTo"
                                value={orderData?.addressTo ? orderData?.addressTo : order?.addressTo}
                                type="text"
                                name="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={(e) => handleOnValueChange(e)}
                                className="smth"
                                label="Пункт отправки"
                                variant="outlined"
                                id="addressFrom"
                                value={orderData?.addressFrom ? orderData?.addressFrom : order?.addressFrom}
                                type="text"
                                name="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>
                            <select onChange={(e) => handleOnValueChange(e)} id="driver">
                                <option disabled selected value> -- Выберите водителя --</option>
                                {drivers.map((driver) => {
                                    return (
                                        <option
                                            id="driver"
                                            value={driver.id}
                                            selected={(driver?.id === driver.id) ? "selected" : false}>
                                            {driver.id} - {driver.firstName} {driver.lastName}</option>
                                    )
                                })
                                }
                            </select>
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>
                            <select onChange={(e) => handleOnValueChange(e)} id="dispatcher">
                                <option disabled selected value> -- Выберите диспетчера --</option>
                                {dispatchers.map((dispatcher) => {
                                    return (
                                        <option
                                            id="dispatcher"
                                            value={dispatcher.id}
                                            selected={(dispatcher?.id === dispatcher.id) ? "selected" : false}>
                                            {dispatcher.id} - {dispatcher.firstName} {dispatcher.lastName}</option>
                                    )
                                })
                                }
                            </select>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <select onChange={(e) => handleOnValueChange(e)} id="client">
                                <option disabled selected value> -- Выберите клиента --</option>
                                {clients.map((client) => {
                                    return (
                                        <option
                                            id="client"
                                            value={client.id}
                                            selected={(client?.id === client.id) ? "selected" : false}>
                                            {client.id} - {client.firstName} {client.lastName}</option>
                                    )
                                })
                                }
                            </select>
                        </Grid>


                        <Grid item xs={6} md={6} lg={6}>
                            <Button variant="contained" color="primary"
                                    size="large" className="btn-save"
                                    startIcon={<SaveIcon/>}
                                    type="submit"
                                    fullWidth
                            >
                                Сохранить изменения
                            </Button>
                        </Grid>
                        {/*<button type="submit">Создать</button>*/}

                        <Grid item xs={6} md={6} lg={6}>

                            <Button
                                onClick={(e) => handleReset(e)}
                                size="large"
                                variant="contained"
                                color="secondary"
                                className="btn-close"
                                fullWidth
                                startIcon={<CloseIcon/>}
                            >
                                Закрыть
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        error: state.ordersData.error,
        cars: state.carsData.cars,
        clients: state.clientsData.clients,
        dispatchers: state.dispatchersData.dispatchers,
    };
}

export default connect(mapStateToProps, null)(CreateOrderModal);