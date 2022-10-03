import {useEffect, useState} from "react";
import {Team} from "../Types/Team";
import TeamClient from "../api/TeamClient";
import ErrorHandler from "../Classes/ErrorHandler";

export const useUserTeams = (accessToken?: string) => {
    const [teams, setTeams] = useState<Team[]>([]);
    useEffect(() => {
        if (accessToken && accessToken !== '') {
            TeamClient.ListUser(accessToken)
                .then((teams) => {
                    setTeams(teams)
                })
                .catch(ErrorHandler.Catch)
        }
    }, [accessToken])
    return teams;
}

export const usePublicTeams = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    useEffect(() => {
        TeamClient.List()
            .then((teams) => {
                setTeams(teams)
            })
            .catch(ErrorHandler.Catch)

    }, [])
    return teams;
}