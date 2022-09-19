import {useEffect, useState} from "react";
import MatchClient from "../api/MatchClient";
import ErrorHandler from "../Classes/ErrorHandler";
import {Match} from "../Types/Api/Match";

export const useMatches = (puuid: string, region: string) => {
    const [matchIds, setMatchIds] = useState<string[]>([]);
    useEffect(() => {
        if (puuid)
            MatchClient
                .GetMatchIds(puuid, region)
                .then((ids) => {
                    setMatchIds(ids);
                })
                .catch(ErrorHandler.Catch)
    }, [puuid, region])

    return {matchIds, setMatchIds};
}

export const useMatch = (id: string, region: string) => {
    const [match, setMatch] = useState<Match | null>(null);
    useEffect(() => {
        setMatch(null);
        MatchClient
            .GetMatchById(id, region)
            .then((match) => {
                match.info.region = region
                setMatch(match);
            })
            .catch(ErrorHandler.Catch)
    }, [id, region]);

    return {match, setMatch}
}