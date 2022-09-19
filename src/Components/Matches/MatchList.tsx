import {Summoner} from "../../Types/Api/Summoner";
import {useMatches} from "../../Hooks/Matches";
import {useEffect, useState} from "react";
import Match from "./Match";

interface MatchListProps {
    summoner: Summoner
}


const MatchList = (props: MatchListProps) => {
    const [matchList, setMatchList] = useState<JSX.Element[]>([]);
    const {matchIds} = useMatches(props.summoner.puuid, props.summoner.region);
    useEffect(() => {
        setMatchList(matchIds.map<JSX.Element>((matchId, index) => {
            return <Match key={"match" + index} summoner={props.summoner} id={matchId}/>
        }));
    }, [matchIds, props.summoner.puuid]);

    return <ul className="list-group">
        {matchList}
    </ul>
}

export default MatchList;