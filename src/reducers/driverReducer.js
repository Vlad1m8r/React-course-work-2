import {
    ADD_DRIVER_LOADING,
    ADD_DRIVER_ERROR,
    ADD_DRIVER_SUCCESS,
    DELETE_DRIVER_LOADING,
    DELETE_DRIVER_ERROR,
    DELETE_DRIVER_SUCCESS,
    EDIT_DRIVER_LOADING,
    EDIT_DRIVER_ERROR,
    EDIT_DRIVER_SUCCESS,
    FETCH_DRIVER_SUCCESS,
    FETCH_DRIVER_ERROR,
    FETCH_DRIVER_LOADING,
    USER_CITY_SORTED,
} from "../actions/types"

const defaultState = {
    drivers: [],
    error: null,
    isLoading: false,
}


export const driverReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_DRIVER_SUCCESS:
            return {...state, drivers: action.payload}
        case FETCH_DRIVER_LOADING:
            return {...state, isLoading: action.payload}
        case FETCH_DRIVER_ERROR:
            return {...state, error: action.payload}
        case ADD_DRIVER_SUCCESS:
            return {...state, drivers: [...state.drivers, action.payload]}
        case ADD_DRIVER_ERROR:
            return  {...state, error: action.payload}
        case EDIT_DRIVER_SUCCESS:
            const updateDrivers = state.drivers.filter(drivers => drivers.id !== action.payload.id)
            return {...state, drivers: [...updateDrivers, action.payload]}
        case DELETE_DRIVER_SUCCESS:
            const filterDriver = state.drivers.filter(drivers => drivers.id !== action.payload)
            return {...state, drivers: [...filterDriver] }
        case DELETE_DRIVER_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}