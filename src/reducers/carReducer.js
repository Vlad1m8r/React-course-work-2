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
    FETCH_CAR_LOADING
} from "../actions/types"

const defaultState = {
    cars: [],
    error: null,
    isLoading: false,
}


export const carReducer = (state = defaultState, action) => {
    // debugger
    switch (action.type) {
        case FETCH_CAR_SUCCESS:
            return {...state, cars: action.payload}
        case FETCH_CAR_LOADING:
            return {...state, isLoading: action.payload}
        case FETCH_CAR_ERROR:
            return {...state, error: action.payload}
        case ADD_CAR_SUCCESS:
            return {...state, cars: [...state.cars, action.payload]}
        case ADD_CAR_ERROR:
            return  {...state, error: action.payload}
        case EDIT_CAR_SUCCESS:
            const updateCars = state.cars.filter(cars => cars.id !== action.payload.id)
            return {...state, cars: [...updateCars, action.payload]}
        case DELETE_CAR_SUCCESS:
            const filterCars = state.cars.filter(cars => cars.id !== action.payload)
            return {...state, cars: [...filterCars] }
        case DELETE_CAR_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}