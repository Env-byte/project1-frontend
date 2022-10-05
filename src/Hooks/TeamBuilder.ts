import {Champion} from "../Types/Api/Champion";
import {Team} from "../Types/Team";
import {useEffect, useReducer} from "react";
import {useUser} from "../Contexts/UserContext";
import StaticHelpers from "../Classes/StaticHelpers";
import TeamClient from "../api/TeamClient";
import ErrorHandler, {ErrorWrapper} from "../Classes/ErrorHandler";
import {ToastError, ToastSuccess} from "../Classes/SwalMixin";
import {useStaticDataSet} from "../Contexts/StaticDataContext";
import {StaticData} from "../Classes/StaticData";
import {HookStatus, useHookStatus} from "./HookStatus";

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

const defaultTeam = {hexes: [], name: "", setId: '', isPublic: false, guuid: null, isReadonly: false}

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
            if (action.isPublic !== undefined) {
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

export const useTeamBuilder = (tftSet: string, teamId: string): [Team, HookStatus, TeamDispatches] => {
    const {user} = useUser();
    const setData = useStaticDataSet(tftSet)
    const [state, dispatch] = useReducer(reducer, {...defaultTeam, setId: tftSet});
    const [hookState, hookStateDispatches] = useHookStatus()

    const add = (champion: Champion, position: number) => {
        dispatch({action: "add", champion: champion, position: position})
    }

    const remove = (position: number) => {
        dispatch({action: "remove", position: position})
    }

    const saveOptions = (name: string, isPublic: boolean) => {
        hookStateDispatches.setLoading(true);
        SaveOptionsHandle(user, state, name, isPublic)
            .then(() => {
                dispatch({action: "saveOptions", name: name, isPublic: isPublic});
            })
            .finally(() => {
                hookStateDispatches.setLoading(false);
            })
    }

    const save = (callback?: (guuid: string) => void, name?: string, isPublic?: boolean) => {
        hookStateDispatches.setLoading(true);
        SaveHandle(user, state, name, isPublic)
            .then((team) => {
                dispatch({action: "overwrite", team: team})
                if (typeof callback === "function") {
                    callback(team.guuid ?? '')
                }
            })
            .finally(() => {
                hookStateDispatches.setLoading(false);
            });
    }

    useEffect(() => {
        if (state.hexes.length > 0) {
            hookStateDispatches.setCanSave(true);
        }
    }, [state.hexes.length])


    useEffect(() => {
        hookStateDispatches.setLoading(true);
        GetHandle(user, teamId, setData)
            .then((team) => {
                dispatch({action: "overwrite", team: team})
            })
            .catch((e: ErrorWrapper) => {
                if (e) {
                    switch (e.type) {
                        case "Access Denied":
                            hookStateDispatches.setHasAccess(false);
                            break;
                        case "Not Found":
                            hookStateDispatches.setFound(false);
                            break;
                        case "Internal Server Error":
                            break;

                    }
                }
            })
            .finally(() => {
                hookStateDispatches.setLoading(false);
            })
    }, [setData, teamId, user])

    return [state, hookState, {add, remove, save, saveOptions}]
}

const SaveHandle = (user: UserAccount | null, state: Team, name?: string, isPublic?: boolean): Promise<Team> => {
    return new Promise((resolve, reject) => {
        if (user === null || user.accessToken === '') {
            ToastError.fire('Can not save Team, you are not logged in.')
            reject();
            return;
        }
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
            TeamClient.Create({...team, name: name, isPublic: isPublic}, user.accessToken)
                .then((team) => {
                    resolve(team);
                })
                .catch((reason) => {
                    reject(ErrorHandler.Catch(reason));
                })
        } else {
            TeamClient.Update(state, user.accessToken).then(() => {
                resolve(state);
                ToastSuccess.fire('Saved Team');
            })
                .catch((reason) => {
                    reject(ErrorHandler.Catch(reason));
                })
        }
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
        TeamClient.UpdateOptions(state.guuid, {name: name, isPublic: isPublic}, user.accessToken)
            .then(() => {
                resolve(true);
            })
            .catch((reason) => {
                reject(ErrorHandler.Catch(reason));
            })
    })
}

const GetHandle = (user: UserAccount | null, teamId: string, setData: StaticData): Promise<Team> => {
    return new Promise((resolve, reject) => {
        if (teamId === '' || teamId === 'new') {
            reject();
            return;
        }
        TeamClient.Get(teamId, (user?.accessToken) ?? '')
            .then((team) => {
                //make sure champion data is set correctly as it is not stored in db
                team.hexes = team.hexes.map(hex => {
                    let champ = setData.getChampion(hex.champion.championId)
                    if (champ) {
                        champ.items = hex.champion.items;
                        hex.champion = champ;
                    }
                    return hex
                })
                resolve(team);
            })
            .catch((reason) => {
                reject(ErrorHandler.Catch(reason));
            })
    })
}