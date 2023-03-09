import { createContext, useReducer } from "react";
import userReducer from "./userReducer";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const initialState = {
        user,
        loading: false,
    }

    const [state, dispatch] = useReducer(userReducer, initialState);

    return <UserContext.Provider value={{
        ...state,
        dispatch
    }}>
        {children}
    </UserContext.Provider>
}

export default UserContext;