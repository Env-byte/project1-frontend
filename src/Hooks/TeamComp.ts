import {Champion} from "../Types/Api/Champion";
import {Team} from "../Types/Team";
import {useEffect, useReducer, useState} from "react";
import {useUser} from "../Contexts/UserContext";
import StaticHelpers from "../Classes/StaticHelpers";
import TeamClient from "../api/TeamClient";
import ErrorHandler from "../Classes/ErrorHandler";
import {ToastError} from "../Classes/SwalMixin";
import {useStaticDataSet} from "../Contexts/StaticDataContext";
import {StaticData} from "../Classes/StaticData";

type ActionType = 'remove' | 'add' | 'saveOptions' | 'overwrite';

export interface Action {
    action: ActionType;
    position?: number
    champion?: Champion
    name?: string
    team?: Team
    isPublic?: boolean
}

export type TeamAdd = (champion: Champion, position: number) => void;
export type TeamRemove = (position: number) => void;
export type TeamSave = (callback?: (guuid: string) => void, name?: string, isPublic?: boolean) => void;
export type TeamSaveOptions = (name: string, isPublic: boolean) => void;

export interface TeamDispatches {
    add: TeamAdd
    remove: TeamRemove
    save: TeamSave
    saveOptions: TeamSaveOptions
}

export interface TeamHookStatus {
    loading: boolean
    canSave: boolean
}

const defaultTeam = {hexes: [], name: "", setId: '', isPublic: false, guuid: null}

const reducer = (state: Team, action: Action) => {
    switch (action.action) {
        case "add": {
            const team = StaticHelpers.deepCopy(state);
            if (action.champion && action.position) {
                team.hexes.push({position: action.position, champion: action.champion})
            }
            return {...team}
        }
        case "remove": {
            const team = StaticHelpers.deepCopy(state);
            team.hexes = team.hexes.filter((item) => item.position !== action.position);
            return {...team}
        }
        case "saveOptions":
            let newName = state.name;
            let isPublic = state.isPublic;
            if (action.name) {
                newName = action.name;
            }
            if (action.isPublic) {
                isPublic = action.isPublic;
            }
            return {...state, name: newName, isPublic: isPublic}
        case 'overwrite':
            if (action.team) {
                return {...action.team}
            }
            return {...state}
    }
}

export const useTeam = (tftSet: string, teamId: string): [Team, TeamHookStatus, TeamDispatches] => {
    const {user} = useUser();
    const setData = useStaticDataSet(tftSet)
    const [state, dispatch] = useReducer(reducer, {...defaultTeam, setId: tftSet});
    const [loading, setLoading] = useState<boolean>(false);
    let canSave = false;

    const add = (champion: Champion, position: number) => {
        dispatch({action: "add", champion: champion, position: position})
    }

    const remove = (position: number) => {
        dispatch({action: "remove", position: position})
    }

    const saveOptions = (name: string, isPublic: boolean) => {
        setLoading(true);
        SaveOptionsHandle(user, state, name, isPublic)
            .then(() => {
                dispatch({action: "saveOptions", name: name, isPublic: isPublic});
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const save = (callback?: (guuid: string) => void, name?: string, isPublic?: boolean) => {
        setLoading(true);
        SaveHandle(user, state, name, isPublic)
            .then((team) => {
                dispatch({action: "overwrite", team: team})
                if (typeof callback === "function") {
                    callback(team.guuid ?? '')
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    if (state.hexes.length > 0) {
        canSave = true;
    }

    useEffect(() => {
        setLoading(true);
        GetHandle(user, teamId, setData)
            .then((team) => {
                dispatch({action: "overwrite", team: team})
            })
            .finally(() => {
                setLoading(false);
            })

    }, [setData, teamId, user])

    return [state, {loading, canSave}, {add, remove, save, saveOptions}]
}

const SaveHandle = (user: UserAccount | null, state: Team, name?: string, isPublic?: boolean): Promise<Team> => {
    return new Promise((resolve, reject) => {
        if (user === null || user.accessToken === '') {
            ToastError.fire('Can not save Team, you are not logged in.')
            reject();
            return;
        }
        let promise;
        if (state.guuid === null) {
            const team = StaticHelpers.deepCopy(state);
            if (name === undefined) {
                ToastError.fire('Can not save Team, Name is not set.')
                reject();
                return;
            }
            if (isPublic === undefined) {
                isPublic = false;
            }
            promise = TeamClient.Create({...team, name: name, isPublic: isPublic}, user.accessToken)
        } else {
            promise = TeamClient.Update(state, user.accessToken)
        }
        promise
            .then((team) => {
                resolve(team);
            })
            .catch(ErrorHandler.Catch)
    })
}

const SaveOptionsHandle = (user: UserAccount | null, state: Team, name: string, isPublic: boolean) => {
    return new Promise((resolve, reject) => {
        if (user === null || user.accessToken === '') {
            ToastError.fire('Can not save Team, you are not logged in.')
            reject();
            return;
        }
        if (!state.guuid) {
            ToastError.fire('Can not save Team, invalid id.');
            reject();
            return;
        }
        TeamClient.UpdateOptions({name: name, isPublic: isPublic, guuid: state.guuid}, user.accessToken)
            .then(() => {
                resolve(true);
            })
            .catch(ErrorHandler.Catch)
    })
}

const GetHandle = (user: UserAccount | null, teamId: string, setData: StaticData): Promise<Team> => {
    return new Promise((resolve, reject) => {
        if (teamId === '' || teamId === 'new' || user === null || user.accessToken === '') {
            reject();
            return;
        }
        TeamClient.Get(teamId, user.accessToken)
            .then((team) => {
                //make sure champion data is set correctly as it is not stored in db
                team.hexes = team.hexes.map(hex => {
                    let champ = setData.getChampion(hex.champion.championId)
                    if (champ) {
                        hex.champion = champ;
                    }
                    return hex
                })
                resolve(team);
            })
            .catch(ErrorHandler.Catch)
    })
}