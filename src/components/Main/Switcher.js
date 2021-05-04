import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import OrderDash from "../Dashs/Order/OrderDash";
import CarDash from "../Dashs/Car/CarDash";
import DriverDash from "../Dashs/Driver/DriverDash";
import ClientDash from "../Dashs/Client/ClientDash";
import DispatcherDash from "../Dashs/Dispathcer/DispatcherDash";
import Nav from "./Nav";
import Author from "./Author";


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

                </Switch>
            </BrowserRouter>
        );
    }
}

export default Switcher;
