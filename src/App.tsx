import React from 'react';
import './Css/App.css';
import AppRoutes from './Components/AppRoutes';
import {GoogleOAuthProvider} from '@react-oauth/google';
import ReactGA from 'react-ga';
import {UserProvider} from "./Contexts/UserContext";
import {StaticDataProvider} from "./Contexts/StaticDataContext";
import {TFTSetProvider} from "./Contexts/TFTSetContext";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const TRACKING_ID = "G-5RBBT2SEP5"; // OUR_TRACKING_ID
const GoogleClientId = "67743149875-uqngf9h1t0dhveklcs7ouphmpenepeqg.apps.googleusercontent.com";

ReactGA.initialize(TRACKING_ID);


function App() {
    return (
        <>
            <React.StrictMode>
                <UserProvider>
                    <GoogleOAuthProvider clientId={GoogleClientId}>
                        <StaticDataProvider>
                            <TFTSetProvider>
                                <DndProvider backend={HTML5Backend}>
                                    <Header/>
                                    <br/>
                                    <AppRoutes/>
                                </DndProvider>
                            </TFTSetProvider>
                        </StaticDataProvider>
                    </GoogleOAuthProvider>
                </UserProvider>
            </React.StrictMode>
            <Footer/>
        </>
    );
}

export default App;
