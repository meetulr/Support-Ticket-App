import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return <UserContext.Provider value={{
        user,
        setUser
    }}>
        {children}
    </UserContext.Provider>
}

export default UserContext;