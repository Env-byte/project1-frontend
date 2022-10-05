import {useEffect, useState} from "react";
import {Team} from "../Types/Team";
import TeamClient from "../api/TeamClient";
import ErrorHandler from "../Classes/ErrorHandler";
import {useStaticDataSet, useStaticDataSets} from "../Contexts/StaticDataContext";
import {TFTSetData} from "../Types/TFTSetData";
import {StaticData} from "../Classes/StaticData";
import {StaticDataWrapper} from "./StaticDataWrapper";

export const useUserTeams = (accessToken?: string) => {
    const [teams, setTeams] = useState<Team[]>([]);
    const setData = useStaticDataSets()

    useEffect(() => {
        if (accessToken && accessToken !== '') {
            TeamClient.ListUser(accessToken)
                .then((teams) => {
                    setTeams(MapChampionsToTeam(teams, setData))
                })
                .catch(ErrorHandler.Catch)
        }
    }, [accessToken])
    return teams;
}

export const usePublicTeams = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const setData = useStaticDataSets()

    useEffect(() => {
        TeamClient.List()
            .then((teams) => {
                setTeams(MapChampionsToTeam(teams, setData))
            })
            .catch(ErrorHandler.Catch)

    }, [])
    return teams;
}

const MapChampionsToTeam = (teams: Team[], setData: StaticDataWrapper) => {
    teams.forEach((team) => {
        //make sure champion data is set correctly as it is not stored in db
        team.hexes = team.hexes.map(hex => {
            let champ = setData[team.setId].getChampion(hex.champion.championId)
            if (champ) {
                champ.items = hex.champion.items;
                hex.champion = champ;
            }
            return hex
        })
    });
    return teams;
}