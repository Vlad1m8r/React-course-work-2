import {
    ADD_DISPATCHER_ERROR,
    ADD_DISPATCHER_SUCCESS,
    DELETE_DISPATCHER_ERROR,
    DELETE_DISPATCHER_SUCCESS,
    EDIT_DISPATCHER_ERROR,
    EDIT_DISPATCHER_SUCCESS,
    FETCH_DISPATCHER_ERROR,
    FETCH_DISPATCHER_SUCCESS,
    FETCH_DISPATCHER_LOADING,
} from "./types"

import axios from "axios";
import {history} from "../index";

const DISPATCHER_REST_API_URL = 'http://localhost:8080/api/v1/dispatchers';

//CREAT------------------------------------------------------------------
export const createDispatcherSuccess = (data) => {
    return {
        type: ADD_DISPATCHER_SUCCESS,
        payload: data,
    }
}

export const createDispatcherError = (data) => {
    debugger
    return {
        type: ADD_DISPATCHER_ERROR,
        payload: data,
    }
}

export const createDispatcher = (dispatcher) => {

    console.log("dispatcher")
    console.log(dispatcher.lastName)
    console.log(dispatcher.lastName)

    if (dispatcher.id) {
        const data = {
            id: dispatcher?.id,
            firstName: dispatcher?.firstName,
            lastName: dispatcher?.lastName,
            email: dispatcher?.email,
            phoneNumber: dispatcher?.phoneNumber,
            gender: dispatcher?.gender,
            address: dispatcher?.address,
            salary: dispatcher?.salary,
            ssn: dispatcher?.ssn,
        }
        return (dispatch => {
            dispatch(editDispatcher(data))
        })
    } else {
        const data = {
            id: dispatcher?.id,
            firstName: dispatcher?.firstName,
            lastName: dispatcher?.lastName,
            email: dispatcher?.email,
            phoneNumber: dispatcher?.phoneNumber,
            gender: dispatcher?.gender,
            address: dispatcher?.address,
            salary: dispatcher?.salary,
            ssn: dispatcher?.ssn,
        }

        return (dispatch) => {
            return axios.post(DISPATCHER_REST_API_URL, data)
                .then(response => {

                    dispatch(createDispatcherSuccess(response.data))
                    history.push('/dispatcher')

                }).catch(error => {
                    console.log(error)
                    dispatch(createDispatcherError(error))
                })
        }
    }
}

//EDIT-------------------------------------------------------------------

export const editDispatcherError = (data) => {
    return {
        type: EDIT_DISPATCHER_ERROR,
        payload: data,
    }
}

export const editDispatcherSuccess = (data) => {
    return {
        type: EDIT_DISPATCHER_SUCCESS,
        payload: data,
    }

}

export const editDispatcher = (data) => {
    const id = data.id
    return (dispatch) => {
        // return fetch(`${USERS_REST_API_URL}/${id}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(data)
        // }).then(response => {
        return axios.put(`${DISPATCHER_REST_API_URL}/${id}`, data)
            .then(() => {
                // history.push('/')
                return axios.get(`${DISPATCHER_REST_API_URL}/${id}`)
                    .then(response => {
                        dispatch(editDispatcherSuccess(response.data))
                        history.push('/dispatcher')
                    }).catch(error => {
                        dispatch(editDispatcherError(error))
                    })
            }).catch(error => {
                dispatch(editDispatcherError(error))
            })
    }
}
//DELETE-----------------------------------------------------------------
export const deleteDispatcherSuccess = (data) => {
    return {
        type: DELETE_DISPATCHER_SUCCESS,
        payload: data,
    }
}
export const deleteDispatcherError = (data) => {
    // debugger
    return {
        type: DELETE_DISPATCHER_ERROR,
        payload: data,
    }
}

export const deleteDispatcher = (id) => {
    // debugger
    return (dispatch) => {
        return axios.delete(`${DISPATCHER_REST_API_URL}/${id}`)
            .then(() => {
                dispatch(deleteDispatcherSuccess(id))
            })
            .catch(error => {
                dispatch(deleteDispatcherError(error))

            })
    }
}



//FETCH------------------------------------------------------------------
export const fetchDispatchersSuccess = (data) => {
    // debugger
    return {
        type: FETCH_DISPATCHER_SUCCESS,
        payload: data,
    }
}

export const fetchDispatchersLoading = (data) => {
    return {
        type: FETCH_DISPATCHER_LOADING,
        payload: data,
    }
}

export const fetchDispatchersError = (data) => {
    return {
        type: FETCH_DISPATCHER_ERROR,
        payload: data,
    }
}

export const fetchDispatchers = () => {
    let isLoading = true
    return (dispatch) => {
        dispatch(fetchDispatchersLoading(isLoading))
        return axios.get(DISPATCHER_REST_API_URL)
            .then(response => {
                const data = response.data;
                console.log("data")
                dispatch(fetchDispatchersSuccess(data))
                isLoading = false;
                dispatch(fetchDispatchersLoading(isLoading))
            }).catch(error => {
                dispatch(fetchDispatchersError(error))

                isLoading = false
                dispatch(fetchDispatchersLoading(isLoading))
            })
    }
}