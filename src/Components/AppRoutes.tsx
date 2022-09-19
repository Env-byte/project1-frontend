import {Routes, Route} from 'react-router-dom';
import {useEffect} from "react";
import ReactGA from "react-ga";
import Champions from "./Pages/Champions";
import Summoner from "./Pages/Summoner";
import TeamBuilder from "./Pages/TeamBuilder";
import Index from "./Pages/Index";

const AppRoutes = () => {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);
    return (
        <Routes>
            <Route path='/' element={<Index/>}/>
            <Route path='/champions' element={<Champions/>}/>
            <Route path='/team-builder' element={<TeamBuilder/>}/>
            <Route path={'/summoner/:region/:name'} element={<Summoner/>}/>
        </Routes>
    );
}
export default AppRoutes;