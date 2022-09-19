import {useMatch} from "../../Hooks/Matches";
import {useMemo} from "react";
import Loading from "../Loading";
import StaticHelpers from "../../Classes/StaticHelpers";
import {ChampionPortrait} from "../Champions/ChampionPortrait";
import {Summoner} from "../../Types/Api/Summoner";

export interface MatchProps {
    id: string;
    summoner: Summoner
}

const Match = (props: MatchProps) => {
    const {match} = useMatch(props.id, props.summoner.region);
    const player = useMemo(() => match?.info.participants.find(participant => props.summoner.puuid === participant.puuid),
        [match?.info.participants, props.summoner.puuid]);

    if (!match) {
        return <li className="list-group-item">
            <Loading screen={false} size={"1x"}/>
        </li>;
    }

    if (match.info.tftSetNumber < 7) {
        return <li className="list-group-item">
            TFT Set {match.info.tftSetNumber} not supported.
        </li>;
    }


    let unitPortraits: JSX.Element[] = player?.units.map<JSX.Element>((unit, index) => {
        return <ChampionPortrait tftSet={match.info.tftSetCoreName} key={"portrait" + index}
                                 characterId={unit.characterId} items={unit.items}/>;
    }) ?? [];

    let gameType;
    switch (match.info.tftGameType) {
        case 'standard':
            gameType = 'Standard';
            break;
        case 'pairs':
            gameType = 'Double Up';
            break;
        case 'turbo':
            gameType = 'Hyper Roll';
            break;
        default:
            gameType = match.info.tftGameType;
            break;
    }
    const date = new Date(match.info.gameDatetime);

    return <li className="list-group-item">
        <div className="row">
            <div className="col-lg-1">
                <h3>{StaticHelpers.Ordinal(player?.placement)}</h3>
            </div>
            <div className="col-lg-11">
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {unitPortraits}
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-1">
                <p>{gameType}</p>
            </div>
            <div className="col-lg-3">
                <p>{date.toLocaleString("en-US", {timeZoneName: "short"})}</p>
            </div>
        </div>
    </li>;

}

export default Match;