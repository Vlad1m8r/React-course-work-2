import React from 'react';

import {createOrder} from "../../../actions/orderAction";

import {connect} from "react-redux";
import {history} from "../../../index";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

import "./create.css"

class NewOrderCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        }

    }


    componentWillMount() {
        const props = this.props
        if (props.location && props.location.state) {
            const order = props.location.state.order
            this.setState({
                id: order.id,
                date: order.date,
                time: order.time,
                roadTime: order.roadTime,
                distance: order.distance,
                cost: order.cost,
                addressTo: order.addressTo,
                addressFrom: order.addressFrom,
                driver: order.driver,
                client: order.client,
                dispatcher: order.dispatcher
            })
        }
    }

    handleReset(e) {
        e.preventDefault()
        history.push({pathname: "/"})
        this.setState({
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

    handleOnValueChange(e) {
        this.setState({
                [e.target.id]: e.target.value,
            }
        )
    }

    handleSubmit(e) {
        debugger
        e.preventDefault();
        if (
            this.state.date == null ||
            this.state.time == null ||
            this.state.roadTime == null ||
            this.state.distance == null ||
            this.state.cost == null ||
            this.state.addressTo == null ||
            this.state.addressFrom == null ||
            this.state.driver == null ||
            this.state.client == null ||
            this.state.dispatcher == null
        )
            alert("Не все поля заполнены!!")
        else{
            this.props.onAdd(this.state)}
    }

    render() {
        return (
            <div className="create">

                <form className="create-modal__form" onSubmit={this.handleSubmit.bind(this)}>

                    <Grid container spacing={2} justify={"center"}>
                        <Grid item xs={6} md={6} lg={6}>
                            <TextField
                                onChange={this.handleOnValueChange.bind(this)}
                                className="smth"
                                label="Дата"
                                variant="outlined"
                                id="date"
                                value={this.state.date}
                                type="date"
                                name="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <input
                                onChange={this.handleOnValueChange.bind(this)}
                                className="smth"
                                label="Время вызова"
                                variant="outlined"
                                id="time"
                                value={this.state.time}

                                type="time"
                                step='1'
                                min="00:00:00"
                                max="20:00:00"

                                name="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} md={4} lg={4}>
                            <TextField
                                onChange={this.handleOnValueChange.bind(this)}
                                className="smth"
                                label="Время в пути"
                                variant="outlined"
                                id="roadTime"
                                value={this.state.roadTime}

                                type="number"
                                step='1'
                                min="1"
                                max="9999"

                                name="roadTime"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} md={4} lg={4}>
                            <TextField
                                onChange={this.handleOnValueChange.bind(this)}
                                className="smth"
                                label="Расстояние"
                                variant="outlined"
                                id="distance"
                                value={this.state.distance}
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
                                onChange={this.handleOnValueChange.bind(this)}
                                className="smth"
                                label="Цена"
                                variant="outlined"
                                id="cost"
                                value={this.state.cost}
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
                                onChange={this.handleOnValueChange.bind(this)}
                                className="smth"
                                label="Пункт назначения"
                                variant="outlined"
                                id="addressTo"
                                value={this.state.addressTo}
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
                                onChange={this.handleOnValueChange.bind(this)}
                                className="smth"
                                label="Пункт отправки"
                                variant="outlined"
                                id="addressFrom"
                                value={this.state.addressFrom}
                                type="text"
                                name="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>
                            <select onChange={this.handleOnValueChange.bind(this)} id="driver">
                                <option disabled selected value> -- Выберите водителя --</option>
                                {this.props.drivers.map((driver) => {
                                    return (
                                        <option
                                            id="driver"
                                            value={driver.id}
                                            selected={(this.state.driver?.id === driver.id) ? "selected" : false}>
                                            {driver.id} - {driver.firstName} {driver.lastName}</option>
                                    )
                                })
                                }
                            </select>
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>
                            <select onChange={this.handleOnValueChange.bind(this)} id="dispatcher">
                                <option disabled selected value> -- Выберите диспетчера --</option>
                                {this.props.dispatchers.map((dispatcher) => {
                                    return (
                                        <option
                                            id="dispatcher"
                                            value={dispatcher.id}
                                            selected={(this.state.dispatcher?.id === dispatcher.id) ? "selected" : false}>
                                            {dispatcher.id} - {dispatcher.firstName} {dispatcher.lastName}</option>
                                    )
                                })
                                }
                            </select>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <select onChange={this.handleOnValueChange.bind(this)} id="client">
                                <option disabled selected value> -- Выберите клиента --</option>
                                {this.props.clients.map((client) => {
                                    return (
                                        <option
                                            id="client"
                                            value={client.id}
                                            selected={(this.state.client?.id === client.id) ? "selected" : false}>
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
                                onClick={(e) => this.handleReset(e)}
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
        );
    }
};

const mapStateToProps = (state) => {
    return {
        error: state.ordersData.error,
        cars: state.carsData.cars || [],
        clients: state.clientsData.clients || [],
        dispatchers: state.dispatchersData.dispatchers || [],
        drivers: state.driversData.drivers || [],
    };
}

const mapDispatchToProps = (order) => {
    return {
        onAdd: (orderer) => {
            order(createOrder(orderer));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderCreate);