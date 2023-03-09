import { createContext, useReducer, useEffect } from "react";
import ticketReducer from "./ticketReducer";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {

    const initialState = {
        tickets: [],
        ticket: {},
        isLoading: false
    }

    const [state, dispatch] = useReducer(ticketReducer, initialState);

    useEffect(() => {
        console.log(state);
    }, [state])

    return <TicketContext.Provider value={{
        ...state,
        dispatch
    }}>
        {children}
    </TicketContext.Provider>
}

export default TicketContext;