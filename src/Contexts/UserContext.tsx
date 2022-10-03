import React, {Dispatch, useContext, useEffect, useState} from 'react'
import UserClient from "../api/UserClient";
import ErrorHandler from "../Classes/ErrorHandler";

interface UserContextObj {
    user: UserAccount | null
    setUser: Dispatch<UserAccount | null>
}

interface AuthProviderProps {
    children: JSX.Element
}

const UserContext = React.createContext<UserContextObj>({} as UserContextObj);

export const UserProvider = (props: AuthProviderProps) => {
    const [user, setUser] = useState<UserAccount | null>(null);
    useEffect(() => {
        let accessToken = localStorage.getItem('user-token');
        if (accessToken) {
            UserClient.LoginAccessToken(accessToken)
                .then((user) => {
                    setUser(user)
                })
                .catch((e) => {
                    const error = ErrorHandler.Catch(e)
                    switch (error.type) {
                        case "Not Found":
                            localStorage.removeItem('user-token');
                            break;
                    }
                })
        }
    }, [setUser])
    return <UserContext.Provider value={{user, setUser}}>
        {props.children}
    </UserContext.Provider>
}
export const useUser = () => {
    const {user, setUser} = useContext(UserContext)
    return {user, setUser}
}