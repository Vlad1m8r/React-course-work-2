import {
    ADD_ORDER_ERROR,
    ADD_ORDER_LOADING,
    ADD_ORDER_SUCCESS,
    DELETE_ORDER_LOADING,
    DELETE_ORDER_ERROR,
    DELETE_ORDER_SUCCESS,
    EDIT_ORDER_LOADING,
    EDIT_ORDER_ERROR,
    EDIT_ORDER_SUCCESS,
    FETCH_ORDER_ERROR,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_LOADING, DELETE_DRIVER_SUCCESS, DELETE_DRIVER_ERROR, EDIT_DRIVER_ERROR, EDIT_DRIVER_SUCCESS
} from "./types"

import axios from "axios";
import {history} from "../index";
// import {editOrder, fetchUsersError, fetchUsersLoading, fetchUsersSuccess} from "./driverAction";

const ORDER_REST_API_URL = 'http://localhost:8080/api/v1/orders';

//CREAT------------------------------------------------------------------
export const createOrderSuccess = (data) => {
    return {
        type: ADD_ORDER_SUCCESS,
        payload: data,
    }
}

export const createOrderError = (data) => {
    debugger
    return {
        type: ADD_ORDER_ERROR,
        payload: data,
    }
}

export const createOrder = (order) => {

    debugger
    if (order.id) {
        const data = {
            id: order?.id,
            date: order?.date,
            time: `${order?.time}`,
            roadTime: order?.roadTime,
            distance: order?.distance,
            cost: order?.cost,
            addressTo: order?.addressTo,
            addressFrom: order?.addressFrom,
            driver: {id: order.driver},
            client: {id: order.client},
            dispatcher: {id: order.dispatcher}
        }
        return (dispatch => {
            dispatch(editOrder(data))
        })
    } else {
        const data = {
            id: order?.id,
            date: order?.date,
            time: `${order?.time}`,
            roadTime: order?.roadTime,
            distance: order?.distance,
            cost: order?.cost,
            addressTo: order?.addressTo,
            addressFrom: order?.addressFrom,
            driver: {id: order.driver},
            client: {id: order.client},
            dispatcher: {id: order.dispatcher}
        }
        debugger
        return (dispatch) => {
            debugger
            return axios.post(ORDER_REST_API_URL, data)
                .then(response => {

                    dispatch(createOrderSuccess(response.data))
                    history.push('/')

                }).catch(error => {
                    dispatch(createOrderError(error))
                })
        }
    }

}

//EDIT-------------------------------------------------------------------
export const editOrderError = (data) => {
    return {
        type: EDIT_DRIVER_ERROR,
        payload: data,
    }
}

export const editOrderSuccess = (data) => {
    return {
        type: EDIT_DRIVER_SUCCESS,
        payload: data,
    }

}

export const editOrder = (data) => {
    const id = data.id
    return (dispatch) => {
        // return fetch(`${USERS_REST_API_URL}/${id}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(data)
        // }).then(response => {
        debugger
        return axios.put(`${ORDER_REST_API_URL}/${id}`, data)
            .then(() => {
                // history.push('/')
                return axios.get(`${ORDER_REST_API_URL}/${id}`)
                    .then(response => {
                        dispatch(editOrderSuccess(response.data))
                        history.push('/')
                    }).catch(error => {
                        // debugger
                        const errorPayload = {}
                        errorPayload['message'] = error.response?.data
                        errorPayload['status'] = error.response?.status
                        dispatch(editOrderError(errorPayload))
                    })
            }).catch(error => {
                // debugger
                const errorPayload = {}
                errorPayload['message'] = error.response?.data
                errorPayload['status'] = error.response?.status
                dispatch(editOrderError(errorPayload))
            })
    }
}


//DELETE-----------------------------------------------------------------
export const deleteOrderSuccess = (data) => {
    return {
        type: DELETE_ORDER_SUCCESS,
        payload: data,
    }
}
export const deleteOrderError = (data) => {
    debugger
    return {
        type: DELETE_ORDER_ERROR,
        payload: data,
    }
}

export const deleteOrder = (id) => {
    return (dispatch) => {
        return axios.delete(`${ORDER_REST_API_URL}/${id}`)
            .then(() => {
                dispatch(deleteOrderSuccess(id))
            })
            .catch(error => {
                // debugger
                const errorPayload = {}
                errorPayload['message'] = error.response?.data?.message?.message
                errorPayload['status'] = error.response?.status
                dispatch(deleteOrderError(errorPayload))

            })
    }
}

//FETCH------------------------------------------------------------------
export const fetchOrdersSuccess = (data) => {
    // debugger
    return {
        type: FETCH_ORDER_SUCCESS,
        payload: data,
    }
}

export const fetchOrdersLoading = (data) => {
    return {
        type: FETCH_ORDER_LOADING,
        payload: data,
    }
}

export const fetchOrdersError = (data) => {
    return {
        type: FETCH_ORDER_ERROR,
        payload: data,
    }
}

export const fetchOrders = () => {
    let isLoading = true
    return (dispatch) => {
        dispatch(fetchOrdersLoading(isLoading))
        return axios.get(ORDER_REST_API_URL)
            .then(response => {
                const data = response.data;
                dispatch(fetchOrdersSuccess(data))
                isLoading = false;
                dispatch(fetchOrdersLoading(isLoading))
            }).catch(error => {
                // debugger
                const errorPayload = {};
                errorPayload['message'] = error.response?.data?.error;
                errorPayload['message'] = errorPayload['message'] + error.response?.data?.message;
                errorPayload['status'] = error.response?.status;
                dispatch(fetchOrdersError(errorPayload))

                isLoading = false
                dispatch(fetchOrdersLoading(isLoading))
            })
    }
}
//FETCH------------------------------------------------------------------
export const fetchOrdersSuccessChart = (data) => {
    return {
        type: "ORDER_CHART",
        payload: data,
    }
}


export const fetchOrdersChart = () => {
    return (dispatch) => {
        // dispatch(fetchOrdersLoading(isLoading))
        return axios.get(`${ORDER_REST_API_URL}/chart`)
            .then(response => {
                const data = response.data;
                // debugger
                dispatch(fetchOrdersSuccessChart(data))
                // dispatch(fetchOrdersLoading(isLoading))
            }).catch(error => {
                const errorPayload = {};
                errorPayload['message'] = error.response?.data?.error;
                errorPayload['message'] = errorPayload['message'] + error.response?.data?.message;
                errorPayload['status'] = error.response?.status;
                // dispatch(fetchOrdersError(errorPayload))

                // dispatch(fetchOrdersLoading(isLoading))
            })
    }
}