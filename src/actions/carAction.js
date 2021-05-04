import {
    ADD_CAR_ERROR,
    ADD_CAR_LOADING,
    ADD_CAR_SUCCESS,
    DELETE_CAR_LOADING,
    DELETE_CAR_ERROR,
    DELETE_CAR_SUCCESS,
    EDIT_CAR_LOADING,
    EDIT_CAR_ERROR,
    EDIT_CAR_SUCCESS,
    FETCH_CAR_ERROR,
    FETCH_CAR_SUCCESS,
    FETCH_CAR_LOADING,
} from "./types"

import axios from "axios";
import {history} from "../index";

const CAR_REST_API_URL = 'http://localhost:8080/api/v1/cars';

//CREAT------------------------------------------------------------------
export const createCarSuccess = (data) => {
    return {
        type: ADD_CAR_SUCCESS,
        payload: data,
    }
}

export const createCarError = (data) => {
    debugger
    return {
        type: ADD_CAR_ERROR,
        payload: data,
    }
}

export const createCar = (car) => {

    console.log("car")
    console.log(car.lastName)
    console.log(car.lastName)

    if (car.id) {
        const data = {
            id: car?.id,
            carVIN: car?.carVIN,
            carNumber: car?.carNumber,
            carModel: car?.carModel,
            carCategory: car?.carCategory,
            carColor: car?.carColor,
            carModelYear: car?.carModelYear,
        }
        return (dispatch => {
            dispatch(editCar(data))
        })
    } else {
        const data = {
            id: car?.id,
            carVIN: car?.carVIN,
            carNumber: car?.carNumber,
            carModel: car?.carModel,
            carCategory: car?.carCategory,
            carColor: car?.carColor,
            carModelYear: car?.carModelYear,
        }

        return (dispatch) => {
            return axios.post(CAR_REST_API_URL, data)
                .then(response => {

                    dispatch(createCarSuccess(response.data))
                    history.push('/car')

                }).catch(error => {
                    dispatch(createCarError(error))
                })
        }
    }
}

//EDIT-------------------------------------------------------------------

export const editCarError = (data) => {
    return {
        type: EDIT_CAR_ERROR,
        payload: data,
    }
}

export const editCarSuccess = (data) => {
    return {
        type: EDIT_CAR_SUCCESS,
        payload: data,
    }

}

export const editCar = (data) => {
    const id = data.id
    return (dispatch) => {
        // return fetch(`${USERS_REST_API_URL}/${id}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(data)
        // }).then(response => {
        return axios.put(`${CAR_REST_API_URL}/${id}`, data)
            .then(() => {
                // history.push('/')
                return axios.get(`${CAR_REST_API_URL}/${id}`)
                    .then(response => {
                        dispatch(editCarSuccess(response.data))
                        history.push('/car')
                    }).catch(error => {
                        // debugger
                        const errorPayload = {}
                        errorPayload['message'] = error.response.data
                        errorPayload['status'] = error.response.status
                        dispatch(editCarError(errorPayload))
                    })
            }).catch(error => {
                // debugger
                const errorPayload = {}
                errorPayload['message'] = error.response.data
                errorPayload['status'] = error.response.status
                dispatch(editCarError(errorPayload))
            })
    }
}


//DELETE-----------------------------------------------------------------
export const deleteCarsSuccess = (data) => {
    return {
        type: DELETE_CAR_SUCCESS,
        payload: data,
    }
}
export const deleteCarsError = (data) => {
    debugger
    return {
        type: DELETE_CAR_ERROR,
        payload: data,
    }
}

export const deleteCars = (id) => {
    return (dispatch) => {
        return axios.delete(`${CAR_REST_API_URL}/${id}`)
            .then(() => {
                dispatch(deleteCarsSuccess(id))
            })
            .catch(error => {
                const errorPayload = {}
                errorPayload['message'] = error.response?.data?.message?.message
                errorPayload['status'] = error.response?.status
                dispatch(deleteCarsError(errorPayload))

            })
    }
}



//FETCH------------------------------------------------------------------
export const fetchCarsSuccess = (data) => {
    // debugger
    return {
        type: FETCH_CAR_SUCCESS,
        payload: data,
    }
}

export const fetchCarsLoading = (data) => {
    return {
        type: FETCH_CAR_LOADING,
        payload: data,
    }
}

export const fetchCarsError = (data) => {
    return {
        type: FETCH_CAR_ERROR,
        payload: data,
    }
}

export const fetchCars = () => {
    let isLoading = true
    return (dispatch) => {
        dispatch(fetchCarsLoading(isLoading))
        return axios.get(CAR_REST_API_URL)
            .then(response => {
                const data = response.data;
                console.log("data")
                dispatch(fetchCarsSuccess(data))
                isLoading = false;
                dispatch(fetchCarsLoading(isLoading))
            }).catch(error => {
                debugger
                const errorPayload = {};
                errorPayload['message'] = error.response?.data?.error;
                errorPayload['message'] = errorPayload['message'] + error.response?.data?.message;
                errorPayload['status'] = error.response?.status;
                dispatch(fetchCarsError(errorPayload))

                isLoading = false
                dispatch(fetchCarsLoading(isLoading))
            })
    }
}