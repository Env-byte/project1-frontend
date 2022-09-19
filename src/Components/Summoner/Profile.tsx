import React, {} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    IconDefinition,
    findIconDefinition
} from '@fortawesome/fontawesome-svg-core'
import RankedIcon from "./RankedIcon";
import RankedStats from "./RankedStats";
import {Summoner} from "../../Types/Api/Summoner";
import {useLeagues} from "../../Hooks/Leagues";

export interface SummonerPageProps {
    summoner: Summoner,
    onRefresh: () => void
}

const Profile = (props: SummonerPageProps) => {
    const {leagues} = useLeagues(props.summoner.id, props.summoner.region)

    const syncIconDefinition: IconDefinition = findIconDefinition({prefix: 'fas', iconName: 'sync'})
    return <div>
        <div className="card mb-2">
            <div className="card-body">
                <h3 className="text-center">{props.summoner.name}</h3>
                <hr/>
                <RankedIcon leagues={leagues} summoner={props.summoner} rankedOnly={false}/>
                <div className="text-center">
                    <button onClick={props.onRefresh} className="btn btn-success">
                        <FontAwesomeIcon icon={syncIconDefinition}/> Refresh
                    </button>
                </div>
            </div>
        </div>
        <RankedStats leagues={leagues} summoner={props.summoner}/>
    </div>
}

export default Profile;