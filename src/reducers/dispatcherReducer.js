import {
    ADD_DISPATCHER_ERROR,
    ADD_DISPATCHER_LOADING,
    ADD_DISPATCHER_SUCCESS,
    DELETE_DISPATCHER_LOADING,
    DELETE_DISPATCHER_ERROR,
    DELETE_DISPATCHER_SUCCESS,
    EDIT_DISPATCHER_LOADING,
    EDIT_DISPATCHER_ERROR,
    EDIT_DISPATCHER_SUCCESS,
    FETCH_DISPATCHER_ERROR,
    FETCH_DISPATCHER_SUCCESS,
    FETCH_DISPATCHER_LOADING
} from "../actions/types"

const defaultState = {
    dispatchers: [],
    error: null,
    isLoading: false,
}


export const dispatcherReducer = (state = defaultState, action) => {
    // debugger
    switch (action.type) {
        case FETCH_DISPATCHER_SUCCESS:
            return {...state, dispatchers: action.payload}
        case FETCH_DISPATCHER_LOADING:
            return {...state, isLoading: action.payload}
        case FETCH_DISPATCHER_ERROR:
            return {...state, error: action.payload}
        case ADD_DISPATCHER_SUCCESS:
            return {...state, dispatchers: [...state.dispatchers, action.payload]}
        case ADD_DISPATCHER_ERROR:
            return  {...state, error: action.payload}
        case EDIT_DISPATCHER_SUCCESS:
            const updateDispatchers = state.dispatchers.filter(dispatchers => dispatchers.id !== action.payload.id)
            return {...state, dispatchers: [...updateDispatchers, action.payload]}
        case DELETE_DISPATCHER_SUCCESS:
            const filterDispatchers = state.dispatchers.filter(dispatchers => dispatchers.id !== action.payload)
            return {...state, dispatchers: [...filterDispatchers] }
        case DELETE_DISPATCHER_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}