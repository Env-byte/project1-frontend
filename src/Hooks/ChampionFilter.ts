import {useReducer} from "react";
import {Champion} from "../Types/Api/Champion";
import {useStaticDataSet} from "../Contexts/StaticDataContext";
import {Trait} from "../Types/Api/Trait";
import StaticHelpers from "../Classes/StaticHelpers";

type ActionType = 'remove' | 'add' | 'search';

export interface ChampionFilter {
    cost: number[]
    origin: string[]
    class: string[]
    isSearch: boolean
}

export interface FilterResponse {
    champions: Champion[];
    filter: ChampionFilter;
}

export interface Action {
    action: ActionType;
    type?: string
    value?: number | string
    search?: string
}

export interface FilterDispatches {
    add: (type: string, value: number | string) => void
    remove: (type: string, value: number | string) => void
    search: (type: string) => void
}

export const useChampionFilter = (tftSet: string): [FilterResponse, FilterDispatches] => {
    const setData = useStaticDataSet(tftSet)

    const reducer = (state: FilterResponse, action: Action) => {
        let filter
        switch (action.action) {
            case 'remove':
                filter = StaticHelpers.deepCopy(state.filter);
                if (action.type === 'cost') {
                    filter.cost = filter.cost.filter((item) => item !== action.value as number);
                } else if (action.type === 'class') {
                    filter.class = filter.class.filter((item) => item !== action.value as string);
                } else {
                    filter.origin = filter.origin.filter((item) => item !== action.value as string);
                }
                filter.isSearch = false;
                //this expands old state into new state but overwrites champions
                return {filter: filter, champions: applyFilter(filter, setData.getChampions())};
            case 'add':
                filter = StaticHelpers.deepCopy(state.filter);
                if (action.type === 'cost') {
                    filter.cost.push(action.value as number);
                } else if (action.type === 'class') {
                    filter.class.push(action.value as string);
                } else {
                    filter.origin.push(action.value as string);
                }
                filter.isSearch = false;
                return {filter: filter, champions: applyFilter(filter, setData.getChampions())};
            case 'search':
                if (!action.search) {
                    return state;
                }
                filter = {
                    isSearch: true,
                    cost: searchCost(action.search),
                    ...searchTraits(action.search, setData.getTraits())
                }
                return {
                    filter: filter,
                    champions: applyFilter(filter, searchChampion(action.search, setData.getChampions())),
                };
        }
    }
    const defaultFilter = {
        cost: [],
        origin: [],
        class: [],
        isSearch: false
    };
    const [state, dispatch] = useReducer(reducer, {
        filter: defaultFilter,
        champions: applyFilter(defaultFilter, setData.getChampions())
    });

    const add = (type: string, value: number | string) => {
        dispatch({
            action: "add",
            type: type,
            value: value
        })
    };
    const remove = (type: string, value: number | string) => {
        dispatch({
            action: "remove",
            type: type,
            value: value
        })
    }
    const search = (search: string) => {
        dispatch({
            action: "search",
            search: search
        })
    }

    return [state, {add, remove, search}];
}

const applyFilter = (filter: ChampionFilter, champions: Champion[]): Champion[] => {
    return champions
        .filter(champion => {
            if (champion.cost > 5) {
                return false;
            }

            let show = true;
            if (filter.class.length > 0 || filter.origin.length > 0) {
                const classes = champion.traits.filter((trait) => filter.class.find((classItem) => trait === classItem))
                const origins = champion.traits.filter((trait) => filter.origin.find((originItem) => trait === originItem))
                show = !((origins.length === 0 && filter.origin.length > 0) || (filter.class.length > 0 && classes.length === 0));
            }
            if (filter.cost.length !== 0) {
                const condition = filter.cost.includes(champion.cost);
                //prevents showing 1 cost and all evokers for example
                show = show && condition;
            }
            return show;
        });
}

const searchChampion = (search: string, champions: Champion[]) => {
    return champions
        .filter(item => {
            return item.name.toLowerCase().indexOf(search) !== -1;
        });
}

const searchTraits = (search: string, traits: Trait[]) => {
    const filtered = traits.filter(item => {
        return item.name.toLowerCase().indexOf(search) !== -1;
    })
    let obj = {origin: [] as string[], class: [] as string[]};

    obj.origin = filtered
        .filter((item) => {
            return item.type === 'origin';
        })
        .map((item) => item.name)

    obj.class = filtered
        .filter((item) => {
            return item.type === 'class';
        })
        .map((item) => item.name)

    return obj;
}

const searchCost = (search: string) => {
    if (search.length === 1) {
        const cost = Number(search);
        if (!isNaN(cost)) {
            return [cost];
        }
    }
    return [];
}