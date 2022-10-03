import {Routes, Route} from 'react-router-dom';
import {useEffect} from "react";
import ReactGA from "react-ga";
import Champions from "./Pages/Champions";
import Summoner from "./Pages/Summoner";
import Builder from "./Pages/Builder";
import Index from "./Pages/Index";
import Teams from "./Pages/Teams";

const AppRoutes = () => {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);
    return (
        <Routes>
            <Route path='/' element={<Index/>}/>
            <Route path='/champions' element={<Champions/>}/>
            <Route path='/teams/builder/:id' element={<Builder/>}/>
            <Route path='/teams' element={<Teams/>}/>
            <Route path='/summoner/:region/:name' element={<Summoner/>}/>
        </Routes>
    );
}
export default AppRoutes;