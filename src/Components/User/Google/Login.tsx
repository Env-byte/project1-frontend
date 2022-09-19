import {CredentialResponse, GoogleLogin, useGoogleOneTapLogin} from "@react-oauth/google";
import * as React from "react";
import {useEffect, useState} from "react";
import UserClient from "../../../api/UserClient";
import ErrorHandler from "../../../Classes/ErrorHandler";

interface LoginProps {
    onLogin: (user: UserAccount) => void;
}

export default function Login(props: LoginProps) {

    const [credentialResponse, setCredentialResponse] = useState<CredentialResponse | null>();

    function handleLogin(credentialResponse: CredentialResponse) {
        setCredentialResponse(credentialResponse);
    }

    useEffect(() => {
        if (credentialResponse?.credential) {
            UserClient.Login(credentialResponse.credential)
                .then((user) => {
                    props.onLogin(user);
                })
                .catch(ErrorHandler.Catch)
        }
    }, [credentialResponse, props])

    useGoogleOneTapLogin({
        onSuccess: handleLogin,
        onError: () => {
            console.log('Login.tsx Failed')
        },
        cancel_on_tap_outside: false
    });


    useEffect(() => {


    }, [credentialResponse?.credential])

    return <GoogleLogin
        theme="filled_black"
        shape="pill"
        auto_select={true}
        onSuccess={handleLogin}
        useOneTap={true}
        onError={() => {
            console.log('Login.tsx Failed')
        }}/>;
}