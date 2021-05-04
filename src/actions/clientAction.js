import {
    ADD_CLIENT_ERROR,
    ADD_CLIENT_SUCCESS,
    DELETE_CLIENT_ERROR,
    DELETE_CLIENT_SUCCESS,
    EDIT_CLIENT_ERROR,
    EDIT_CLIENT_SUCCESS,
    FETCH_CLIENT_ERROR,
    FETCH_CLIENT_SUCCESS,
    FETCH_CLIENT_LOADING,
} from "./types"


import axios from "axios";
import {history} from "../index";

const CLIENT_REST_API_URL = 'http://localhost:8080/api/v1/clients';

//CREAT------------------------------------------------------------------
export const createClientSuccess = (data) => {
    return {
        type: ADD_CLIENT_SUCCESS,
        payload: data,
    }
}

export const createClientError = (data) => {
    debugger
    return {
        type: ADD_CLIENT_ERROR,
        payload: data,
    }
}

export const createClient = (client) => {

    console.log("client")
    console.log(client.lastName)
    console.log(client.lastName)

    if (client.id) {
        const data = {
            id: client?.id,
            firstName: client?.firstName,
            lastName: client?.lastName,
            phoneNumber: client?.phoneNumber,
        }
        return (dispatch => {
            dispatch(editClient(data))
        })
    } else {
        const data = {
            id: client?.id,
            firstName: client?.firstName,
            lastName: client?.lastName,
            phoneNumber: client?.phoneNumber,
        }

        return (dispatch) => {
            return axios.post(CLIENT_REST_API_URL, data)
                .then(response => {

                    dispatch(createClientSuccess(response.data))
                    history.push('/client')

                }).catch(error => {
                    console.log(error)
                    const errorPayload = {}
                    errorPayload['message'] = error.response.data
                    errorPayload['status'] = error.response.status
                    dispatch(createClientError(errorPayload))
                })
        }
    }
}

//EDIT-------------------------------------------------------------------

export const editClientError = (data) => {
    return {
        type: EDIT_CLIENT_ERROR,
        payload: data,
    }
}

export const editClientSuccess = (data) => {
    return {
        type: EDIT_CLIENT_SUCCESS,
        payload: data,
    }

}

export const editClient = (data) => {
    const id = data.id
    return (dispatch) => {
        // return fetch(`${USERS_REST_API_URL}/${id}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(data)
        // }).then(response => {
        return axios.put(`${CLIENT_REST_API_URL}/${id}`, data)
            .then(() => {
                // history.push('/')
                return axios.get(`${CLIENT_REST_API_URL}/${id}`)
                    .then(response => {
                        dispatch(editClientSuccess(response.data))
                        history.push('/client')
                    }).catch(error => {
                        // debugger
                        const errorPayload = {}
                        errorPayload['message'] = error.response.data
                        errorPayload['status'] = error.response.status
                        dispatch(editClientError(errorPayload))
                    })
            }).catch(error => {
                // debugger
                const errorPayload = {}
                errorPayload['message'] = error.response.data
                errorPayload['status'] = error.response.status
                dispatch(editClientError(errorPayload))
            })
    }
}

//DELETE-----------------------------------------------------------------
export const deleteClientSuccess = (data) => {
    return {
        type: DELETE_CLIENT_SUCCESS,
        payload: data,
    }
}
export const deleteClientError = (data) => {
    // debugger
    return {
        type: DELETE_CLIENT_ERROR,
        payload: data,
    }
}

export const deleteClient = (id) => {
    // debugger
    return (dispatch) => {
        return axios.delete(`${CLIENT_REST_API_URL}/${id}`)
            .then(() => {
                dispatch(deleteClientSuccess(id))
            })
            .catch(error => {
                // debugger
                const errorPayload = {}
                errorPayload['message'] = error.response.data.message.message
                errorPayload['status'] = error.response.status
                dispatch(deleteClientError(errorPayload))

            })
    }
}


//FETCH------------------------------------------------------------------
export const fetchClientsSuccess = (data) => {
    // debugger
    return {
        type: FETCH_CLIENT_SUCCESS,
        payload: data,
    }
}

export const fetchClientsLoading = (data) => {
    return {
        type: FETCH_CLIENT_LOADING,
        payload: data,
    }
}

export const fetchClientsError = (data) => {
    return {
        type: FETCH_CLIENT_ERROR,
        payload: data,
    }
}

export const fetchClients = () => {
    let isLoading = true
    return (dispatch) => {
        dispatch(fetchClientsLoading(isLoading))
        return axios.get(CLIENT_REST_API_URL)
            .then(response => {
                const data = response.data;
                console.log("data")
                dispatch(fetchClientsSuccess(data))
                isLoading = false;
                dispatch(fetchClientsLoading(isLoading))
            }).catch(error => {
                debugger
                const errorPayload = {};
                errorPayload['message'] = error.response?.data?.error;
                errorPayload['message'] = errorPayload['message'] + error.response?.data?.message;
                errorPayload['status'] = error.response?.status;
                dispatch(fetchClientsError(errorPayload))

                isLoading = false
                dispatch(fetchClientsLoading(isLoading))
            })
    }
}