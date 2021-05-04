import {
    ADD_CLIENT_ERROR,
    ADD_CLIENT_LOADING,
    ADD_CLIENT_SUCCESS,
    DELETE_CLIENT_LOADING,
    DELETE_CLIENT_ERROR,
    DELETE_CLIENT_SUCCESS,
    EDIT_CLIENT_LOADING,
    EDIT_CLIENT_ERROR,
    EDIT_CLIENT_SUCCESS,
    FETCH_CLIENT_ERROR,
    FETCH_CLIENT_SUCCESS,
    FETCH_CLIENT_LOADING
} from "../actions/types"

const defaultState = {
    clients: [],
    error: null,
    isLoading: false,
}


export const clientReducer = (state = defaultState, action) => {
    // debugger
    switch (action.type) {
        case FETCH_CLIENT_SUCCESS:
            return {...state, clients: action.payload}
        case FETCH_CLIENT_LOADING:
            return {...state, isLoading: action.payload}
        case FETCH_CLIENT_ERROR:
            return {...state, error: action.payload}
        case ADD_CLIENT_SUCCESS:
            return {...state, clients: [...state.clients, action.payload]}
        case ADD_CLIENT_ERROR:
            return  {...state, error: action.payload}
        case EDIT_CLIENT_SUCCESS:
            const updateClients = state.clients.filter(clients => clients.id !== action.payload.id)
            return {...state, clients: [...updateClients, action.payload]}
        case DELETE_CLIENT_SUCCESS:
            const filterClients = state.clients.filter(clients => clients.id !== action.payload)
            return {...state, clients: [...filterClients] }
        case DELETE_CLIENT_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}