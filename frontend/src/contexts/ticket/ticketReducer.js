const ticketReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                tickets: [],
                ticket: {},
                isLoading: true
            }
        case "STOP_LOADING":
            return {
                ...state,
                isLoading: false
            }
        case "GET_TICKET":
            return {
                ...state,
                ticket: action.payload,
                isLoading: false
            }
        case "GET_TICKETS":
            return {
                ...state,
                tickets: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}

export default ticketReducer;