import { createContext, useEffect, useReducer } from "react";
import noteReducer from "./noteReducer";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const initialState = {
        notes: [],
        isLoading: false
    }

    const [state, dispatch] = useReducer(noteReducer, initialState);

    useEffect(() => {
        console.log(state);
    }, [state])

    return <NoteContext.Provider value={{
        ...state,
        dispatch
    }}>
        {children}
    </NoteContext.Provider>
}

export default NoteContext;