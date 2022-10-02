import {useReducer} from "react";

export interface HookStatus {
    loading: boolean
    canSave: boolean
    hasAccess: boolean
}

const defaultState: HookStatus = {
    loading: false,
    canSave: false,
    hasAccess: true
}

type ActionType = 'setLoading' | 'setCanSave' | 'setHasAccess';

export interface Action {
    action: ActionType;
    value: boolean
}

export type SetLoading = (value: boolean) => void;
export type SetCanSave = (value: boolean) => void;
export type SetHasAccess = (value: boolean) => void;

export interface HookStatusDispatches {
    setLoading: SetLoading
    setCanSave: SetCanSave
    setHasAccess: SetHasAccess
}

const reducer = (state: HookStatus, action: Action) => {
    switch (action.action) {
        case "setLoading":
            return {...state, loading: action.value}
        case "setCanSave":
            return {...state, canSave: action.value}
        case "setHasAccess":
            return {...state, hasAccess: action.value}
    }
}
export const useHookStatus = (): [HookStatus, HookStatusDispatches] => {
    const [state, dispatch] = useReducer(reducer, {...defaultState});
    const setLoading = (value: boolean) => {
        dispatch({action: 'setLoading', value: value})
    }
    const setCanSave = (value: boolean) => {
        dispatch({action: 'setCanSave', value: value})
    }
    const setHasAccess = (value: boolean) => {
        dispatch({action: 'setHasAccess', value: value})
    }
    return [state, {setLoading, setCanSave, setHasAccess}];
}