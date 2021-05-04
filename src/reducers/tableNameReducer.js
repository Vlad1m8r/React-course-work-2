const defaultState = {
    tableName: "Заказы"
}


export const tableNameReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ПОМЕНЯТЬ_НАЗВАНИЕ_СТРАНИЦЫ":
            return {...state, tableName: action.payload}
        default:
            return state
    }
}