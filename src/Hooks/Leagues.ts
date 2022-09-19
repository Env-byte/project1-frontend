import {useEffect, useState} from "react";
import {League} from "../Types/Api/League";
import ErrorHandler from "../Classes/ErrorHandler";
import LeagueClient from "../api/LeagueClient";

export const useLeagues = (id: string, region: string) => {

    const [leagues, setLeagues] = useState<League[] | null>(null);

    useEffect(() => {
        if (id) {
            LeagueClient.GetBySummonerId(id, region)
                .then((leagues) => {
                    setLeagues(leagues);
                })
                .catch(ErrorHandler.Catch)
        }
    }, [id, region])

    return {leagues, setLeagues};
}