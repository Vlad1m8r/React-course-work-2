import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import OrderDash from "../Dashs/Order/OrderDash";
import CarDash from "../Dashs/Car/CarDash";
import DriverDash from "../Dashs/Driver/DriverDash";
import ClientDash from "../Dashs/Client/ClientDash";
import DispatcherDash from "../Dashs/Dispathcer/DispatcherDash";
import Nav from "./Nav";
import Author from "./Author";
import NewCarCreate from "../Creaters/CarCreater/NewCarCreate";
import NewDispatcherCreate from "../Creaters/DispathcerCreater/NewDispatcherCreate";
import NewClientCreate from "../Creaters/ClientCreater/NewClientCreate";
import NewDriverCreate from "../Creaters/DriverCreater/NewDriverCreate";
import NewOrderCreate from "../Creaters/OrderCreater/NewOrderCreate";


class Switcher extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pathname: '',
            // dispatcher: props.dispatcher,
            // order: props.order,
            // driver: props.driver,
        }
        this.notifyPathname = this.notifyPathname.bind(this)
    }

    notifyPathname(pathname) {
        this.setState({
            pathname: pathname,
        })
    }


    render() {
        return (
            <BrowserRouter>
                <Nav
                    notifyPathname={this.notifyPathname}
                    pathname={this.state.pathname}
                />
                <Switch>
                    <Route path="/"
                           exact
                           component={() => <OrderDash/>}
                    />


                    <Route path="/driver"
                           exact
                           component={() => <DriverDash/>}
                    />

                    <Route path="/dispatcher"
                           exact
                           component={() => <DispatcherDash/>}
                    />

                    <Route path="/client"
                           exact
                           component={() => <ClientDash/>}
                    />

                    <Route path="/car"
                           exact
                           component={() => <CarDash/>}
                    />
                    <Route path="/author"
                           exact
                           component={() => <Author/>}
                    />

                    <Route path="/editCar/:id"
                           exact
                           car={this.state.car}
                           component={(props) => <NewCarCreate {...props}/>}
                    />

                    <Route path="/createCar"
                           exact
                           component={() => <NewCarCreate/>}
                    />
                    <Route path="/editDispatcher/:id"
                           exact
                           dispatcher={this.state.dispatcher}
                           component={(props) => <NewDispatcherCreate {...props}/>}
                    />

                    <Route path="/createDispatcher"
                           exact
                           component={() => <NewDispatcherCreate/>}
                    />

                    <Route path="/editClient/:id"
                           exact
                           client={this.state.client}
                           component={(props) => <NewClientCreate {...props}/>}
                    />

                    <Route path="/createClient"
                           exact
                           component={() => <NewClientCreate/>}
                    />


                    <Route path="/editDriver/:id"
                           exact
                           driver={this.state.driver}
                           component={(props) => <NewDriverCreate {...props}/>}
                    />

                    <Route path="/createDriver"
                           exact
                           component={() => <NewDriverCreate/>}
                    />

                    <Route path="/editOrder/:id"
                           exact
                           order={this.state.order}
                           component={(props) => <NewOrderCreate {...props}/>}
                    />

                    <Route path="/createOrder"
                           exact
                           component={() => <NewOrderCreate/>}
                    />

                </Switch>
            </BrowserRouter>
        );
    }
}

export default Switcher;
