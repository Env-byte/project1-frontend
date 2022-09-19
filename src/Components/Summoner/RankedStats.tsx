import React from "react";
import {Summoner} from "../../Types/Api/Summoner";
import {useLeagues} from "../../Hooks/Leagues";
import {League} from "../../Types/Api/League";

interface RankedStatsProps {
    summoner: Summoner,
    leagues: League[] | null
}

const RankedStats = (props: RankedStatsProps) => {
    if (!props.leagues) {
        return <></>;
    }
    const leagues = props.leagues.filter(league => league.queueType === 'RANKED_TFT')
    if (leagues.length === 0 || !leagues[0]) {
        return <></>;
    }

    return <div className="card mb-2">
        <div className="card-body">
            <h3 className="text-center">Ranked Stats</h3>
            <hr/>
            <p>Wins: {leagues[0].wins}</p>
            <p>Losses: {leagues[0].losses}</p>
            <p>Total Games: {leagues[0].wins + leagues[0].losses}</p>
        </div>
    </div>
}
export default RankedStats;