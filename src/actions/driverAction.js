import {
    ADD_DRIVER_ERROR,
    ADD_DRIVER_LOADING,
    ADD_DRIVER_SUCCESS,
    DELETE_DRIVER_LOADING,
    DELETE_DRIVER_ERROR,
    DELETE_DRIVER_SUCCESS,
    EDIT_DRIVER_LOADING,
    EDIT_DRIVER_ERROR,
    EDIT_DRIVER_SUCCESS,
    FETCH_DRIVER_ERROR,
    FETCH_DRIVER_SUCCESS,
    FETCH_DRIVER_LOADING
} from "./types"

import axios from "axios";
import {history} from "../index";

const DRIVER_REST_API_URL = 'http://localhost:8080/api/v1/drivers';

//CREAT------------------------------------------------------------------
export const createDriverSuccess = (data) => {
    return {
        type: ADD_DRIVER_SUCCESS,
        payload: data,
    }
}

export const createDriverError = (data) => {
    debugger
    return {
        type: ADD_DRIVER_ERROR,
        payload: data,
    }
}

export const createDriver = (driver) => {

    console.log("driver")
    console.log(driver.lastName)
    console.log(driver.lastName)

    if (driver.id) {
        const data = {
            id: driver?.id,
            firstName: driver?.firstName,
            lastName: driver?.lastName,
            email: driver?.email,
            phoneNumber: driver?.phoneNumber,
            gender: driver?.gender,
            address: driver?.address,
            driverLicenseIssueDate: driver?.driverLicenseIssueDate,
        }
        return (dispatch => {
            dispatch(editDriver(data))
        })
    } else {
        const data = {
            id: driver?.id,
            firstName: driver?.firstName,
            lastName: driver?.lastName,
            email: driver?.email,
            phoneNumber: driver?.phoneNumber,
            gender: driver?.gender,
            address: driver?.address,
            driverLicenseIssueDate: driver?.driverLicenseIssueDate,
        }

        return (dispatch) => {
            return axios.post(DRIVER_REST_API_URL, data)
                .then(response => {

                    dispatch(createDriverSuccess(response.data))
                    history.push('/driver')

                }).catch(error => {
                    console.log(error)
                    dispatch(createDriverError(error))
                })
        }
    }
}

//EDIT-------------------------------------------------------------------

export const editDriverError = (data) => {
    return {
        type: EDIT_DRIVER_ERROR,
        payload: data,
    }
}

export const editDriverSuccess = (data) => {
    return {
        type: EDIT_DRIVER_SUCCESS,
        payload: data,
    }

}

export const editDriver = (data) => {
    const id = data.id
    return (dispatch) => {
        // return fetch(`${USERS_REST_API_URL}/${id}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(data)
        // }).then(response => {
        return axios.put(`${DRIVER_REST_API_URL}/${id}`, data)
            .then(() => {
                // history.push('/')
                return axios.get(`${DRIVER_REST_API_URL}/${id}`)
                    .then(response => {
                        dispatch(editDriverSuccess(response.data))
                        history.push('/driver')
                    }).catch(error => {
                        // debugger
                        const errorPayload = {}
                        errorPayload['message'] = error.response.data
                        errorPayload['status'] = error.response.status
                        dispatch(editDriverError(errorPayload))
                    })
            }).catch(error => {
                // debugger
                const errorPayload = {}
                errorPayload['message'] = error.response.data
                errorPayload['status'] = error.response.status
                dispatch(editDriverError(errorPayload))
            })
    }
}

//DELETE-----------------------------------------------------------------
export const deleteDriverSuccess = (data) => {
    return {
        type: DELETE_DRIVER_SUCCESS,
        payload: data,
    }
}
export const deleteDriverError = (data) => {
    debugger
    return {
        type: DELETE_DRIVER_ERROR,
        payload: data,
    }
}

export const deleteDriver = (id) => {
    return (dispatch) => {
        return axios.delete(`${DRIVER_REST_API_URL}/${id}`)
            .then(() => {
            dispatch(deleteDriverSuccess(id))
        })
            .catch(error => {
                // debugger
                const errorPayload = {}
                errorPayload['message'] = error.response.data.message.message
                errorPayload['status'] = error.response.status
                dispatch(deleteDriverError(errorPayload))

        })
    }
}

//FETCH------------------------------------------------------------------

export const fetchDriversSuccess = (data) => {
    // debugger
    return {
        type: FETCH_DRIVER_SUCCESS,
        payload: data,
    }
}

export const fetchDriversLoading = (data) => {
    return {
        type: FETCH_DRIVER_LOADING,
        payload: data,
    }
}

export const fetchDriversError = (data) => {
    return {
        type: FETCH_DRIVER_ERROR,
        payload: data,
    }
}

export const fetchDrivers = () => {
    let isLoading = true
    // debugger
    return (dispatch) => {
        dispatch(fetchDriversLoading(isLoading))
        return axios.get(DRIVER_REST_API_URL)
            .then(response => {
            const data = response.data;
            console.log("data")
            dispatch(fetchDriversSuccess(data))
            isLoading = false;
            dispatch(fetchDriversLoading(isLoading))
        }).catch(error => {
            debugger
            const errorPayload = {};
            errorPayload['message'] = error.response?.data?.error;
            errorPayload['message'] = errorPayload['message'] + error.response?.data?.message;
            errorPayload['status'] = error.response?.status;
            dispatch(fetchDriversError(errorPayload))

            isLoading = false
            dispatch(fetchDriversLoading(isLoading))
        })
    }
}
