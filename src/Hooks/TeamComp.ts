import {Champion} from "../Types/Api/Champion";
import {Team} from "../Types/Team";
import {useReducer} from "react";
import StaticHelpers from "../Classes/StaticHelpers";

type ActionType = 'remove' | 'add';

export interface Action {
    action: ActionType;
    hex: number
    champion?: Champion
}

export type teamAdd = (champion: Champion, hex: number) => void;
export type teamRemove = (hex: number) => void;

export interface TeamDispatches {
    add: teamAdd
    remove: teamRemove
}

export const useTeam = (tftSet: string): [Team, boolean, TeamDispatches] => {
    const defaultTeam = {hexes: [], name: "", setId: tftSet, isPublic: false}
    let loading = false;
    const reducer = (state: Team, action: Action) => {
        const team = StaticHelpers.deepCopy(state);
        switch (action.action) {
            case "add":
                if (action.champion) {
                    team.hexes.push({hex: action.hex, champion: action.champion})
                }
                return {...team}
            case "remove":
                team.hexes = team.hexes.filter((item) => item.hex !== action.hex);
                return {...team}
        }
    }
    const [state, dispatch] = useReducer(reducer, defaultTeam);

    const add = (champion: Champion, hex: number) => {
        dispatch({action: "add", champion: champion, hex: hex})
    }
    const remove = (hex: number) => {
        dispatch({action: "remove", hex: hex})
    }
    const save = () => {
        loading = true;

    }

    return [state, loading, {add, remove}]
}