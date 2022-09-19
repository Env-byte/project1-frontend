import {useUser} from "../../Contexts/UserContext";
import {googleLogout} from "@react-oauth/google";
import Logout from "./Google/Logout";
import Login from "./Google/Login";

export default function Auth() {
    const {user, setUser} = useUser();
    const onLogoutHandle = () => {
        setUser(null);
        googleLogout();
        localStorage.removeItem('user-token');
    }
    const onLoginHandle = (user: UserAccount) => {
        localStorage.setItem('user-token', user.accessToken);
        setUser(user);
    }

    if (user) {
        return <Logout name={user.firstName + ' ' + user.lastName} onClick={onLogoutHandle}/>
    } else {
        return <Login onLogin={onLoginHandle}/>
    }
}