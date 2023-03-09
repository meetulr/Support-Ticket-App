const noteReducer = (state, action) => {
    switch(action.type){
        case "SET_LOADING":
            return {
                ...state,
                notes: [],
                isLoading: true
            }
        case "STOP_LOADING":
            return {
                ...state,
                isLoading: false
            }
        case "GET_NOTES":
            return {
                ...state,
                notes: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}

export default noteReducer;