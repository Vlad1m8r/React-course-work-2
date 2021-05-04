import {createStore, combineReducers, applyMiddleware} from "redux";
import {driverReducer} from "./driverReducer";
import {dispatcherReducer} from "./dispatcherReducer"
import {clientReducer} from "./clientReducer";
import {carReducer} from "./carReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {orderReducer} from "./orderReducer";
import {tableNameReducer} from "./tableNameReducer";

import thunk from "redux-thunk";

import {fetchDrivers} from "../actions/driverAction";
import {fetchDispatchers} from "../actions/dispatcherAction";
import {fetchClients} from "../actions/clientAction";
import {fetchCars} from "../actions/carAction";
import {fetchOrders} from "../actions/orderAction";
import {fetchOrdersChart} from "../actions/orderAction";

const rootReducer = combineReducers({
    driversData: driverReducer,
    dispatchersData: dispatcherReducer,
    clientsData: clientReducer,
    carsData: carReducer,
    ordersData: orderReducer,
    tableNameData: tableNameReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

store.dispatch(fetchDispatchers())
store.dispatch(fetchDrivers())
store.dispatch(fetchClients())
store.dispatch(fetchCars())
store.dispatch(fetchOrders())
store.dispatch(fetchOrdersChart())
