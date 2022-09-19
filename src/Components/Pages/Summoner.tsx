import {useParams} from "react-router-dom";
import {useSummoner} from "../../Hooks/Summoner";
import {useEffect, useState} from "react";
import MatchList from "../Matches/MatchList";
import Loading from "../Loading";
import Profile from "../Summoner/Profile";
import SummonerClient from "../../api/SummonerClient";
import ErrorHandler from "../../Classes/ErrorHandler";

const Summoner = () => {
    const urlParam = useParams();
    const [name, setName] = useState<string>('');
    const [region, setRegion] = useState<string>('');
    const {summoner, setSummoner} = useSummoner(name, region);

    useEffect(() => {
        setName(urlParam.name as string);
        setRegion(urlParam.region as string);
    }, [urlParam])

    if (!summoner) {
        return <Loading screen={true} size={"2x"}/>;
    }

    const onRefreshHandle = () => {
        setSummoner(null);
        setName('');
        if (summoner?.puuid) {
            SummonerClient.Refesh(summoner.puuid, region)
                .then((summoner) => {
                    setSummoner(summoner);
                })
                .catch(ErrorHandler.Catch)
                .finally(() => {
                    setName(urlParam.name as string);
                });
        }
    }

    return <div className="summoner-page">
        <div className="row">
            <div className="col-lg-3">
                <Profile summoner={summoner} onRefresh={onRefreshHandle}/>
            </div>
            <div className="col-lg-9">
                <MatchList summoner={summoner}/>
            </div>
        </div>
    </div>

}

export default Summoner;