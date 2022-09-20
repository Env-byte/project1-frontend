import React, {Dispatch, useContext, useState} from 'react'

interface UserContextObj {
    user: UserAccount | null
    setUser: Dispatch<UserAccount | null>
}

interface AuthProviderProps {
    children: JSX.Element
}

const UserContext = React.createContext<UserContextObj>({} as UserContextObj);

export const UserProvider = (props: AuthProviderProps) => {
    const [user, setUser] = useState<UserAccount | null>(null)
    return <UserContext.Provider value={{user, setUser}}>
        {props.children}
    </UserContext.Provider>
}
export const useUser = () => {
    const {user, setUser} = useContext(UserContext)
    return {user, setUser}
}