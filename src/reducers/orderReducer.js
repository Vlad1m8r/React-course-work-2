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
    FETCH_ORDER_LOADING
} from "./../actions/types"

const defaultState = {
    allOrders: [],
    orders: [],
    error: null,
    isLoading: false,
    sortByDistanceBool: true,
    chartInfo: [],
}


export const orderReducer = (state = defaultState, action) => {
    // debugger
    switch (action.type) {
        case FETCH_ORDER_SUCCESS:
            return {...state, orders: action.payload, allOrders: action.payload}
        case FETCH_ORDER_LOADING:
            return {...state, isLoading: action.payload}
        case FETCH_ORDER_ERROR:
            return {...state, error: action.payload}
        case ADD_ORDER_SUCCESS:
            return {...state, orders: [...state.orders, action.payload]}
        case ADD_ORDER_ERROR:
            return {...state, error: action.payload}
        case EDIT_ORDER_SUCCESS:
            const updateOrder = state.orders.filter(orders => orders.id !== action.payload.id)
            return {...state, orders: [...updateOrder, action.payload]}
        case DELETE_ORDER_SUCCESS:
            const filterOrders = state.orders.filter(orders => orders.id !== action.payload)
            return {...state, orders: [...filterOrders]}
        case DELETE_ORDER_ERROR:
            return {...state, error: action.payload}
        case "СОРТИРОВКА_ПО_ДИСТАНЦИИ":
            if (action.payload) {
                console.log("sorted")
                const sortedOrder = state.orders.sort((a, b) => a.distance > b.distance ? 1 : -1)
                return {...state, orders: [...sortedOrder], sortByDistanceBool: !action.payload}
            } else {
                const unSortedOrder = state.orders.sort((a, b) => a.distance < b.distance ? 1 : -1)
                return {...state, orders: [...unSortedOrder], sortByDistanceBool: !action.payload}
            }
        case "ПОИСК":
            state.orders = state.allOrders
            const searchOrder = []
            state.orders.forEach(order => {
                if (order.addressFrom.indexOf(action.payload) >= 0) {
                    searchOrder.push(order)
                }
            })
            return {...state, orders: [...searchOrder]}
        case "ORDER_CHART":
            return {...state, chartInfo: action.payload}

        default:
            return state
    }
}