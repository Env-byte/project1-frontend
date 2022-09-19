import ErrorHandler from "../Classes/ErrorHandler";
import {useEffect, useState} from "react";
import {Summoner} from "../Types/Api/Summoner";
import SummonerClient from "../api/SummonerClient";

export const useSummoner = (name: string, region: string) => {
    const [summoner, setSummoner] = useState<Summoner | null>(null);
    useEffect(() => {
        if (name !== '') {
            SummonerClient.GetByName(name, region)
                .then((response) => {
                    response.region = region;
                    setSummoner(response);
                })
                .catch(ErrorHandler.Catch)
        }
    }, [name, region])
    return {summoner, setSummoner};
}

