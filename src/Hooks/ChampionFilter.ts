import {useEffect, useReducer} from "react";
import {Champion} from "../Types/Api/Champion";
import {useStaticDataSet} from "../Contexts/StaticDataContext";
import {Trait} from "../Types/Api/Trait";
import StaticHelpers from "../Classes/StaticHelpers";

type ActionType = 'remove' | 'add' | 'search' | 'reset';

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
    const defaultFilter = {
        cost: [],
        origin: [],
        class: [],
        isSearch: false
    };

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
                if (action.search === undefined) {
                    return state;
                }
                if (action.search === '') {
                    filter = defaultFilter
                } else {
                    filter = {
                        isSearch: true,
                        cost: searchCost(action.search),
                        ...searchTraits(action.search, setData.getTraits())
                    }
                }
                //check if there is a valid filter
                const isFilter = filter.origin.length !== 0 || filter.class.length !== 0 || filter.cost.length !== 0;

                //only show filtered champions if search is set with cost or origin or class
                const filteredChampions = (action.search !== '' && isFilter) ? applyFilter(filter, setData.getChampions()) : [];

                const searchedChampions = searchChampion(action.search, setData.getChampions());
                //merge filtered and searched champion removing all duplicates
                const champions = filteredChampions.filter(champion => !searchedChampions.includes(champion)).concat(searchedChampions)

                return {
                    filter: filter,
                    champions: champions,
                };
            case'reset':
                return {
                    filter: defaultFilter,
                    champions: applyFilter(defaultFilter, setData.getChampions())
                }
        }
    }
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
    };
    const reset = () => {
        dispatch({
            action: "reset"
        })
    }

    //reset if tft set changes
    useEffect(() => {
        reset();
    }, [tftSet])

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
                if (filter.isSearch) {
                    // show champions with any of the origins / classes
                    show = !(origins.length === 0 && filter.origin.length > 0) || !(filter.class.length > 0 && classes.length === 0);
                } else {
                    //only show champions with the exact origin class combo
                    show = !((origins.length === 0 && filter.origin.length > 0) || (filter.class.length > 0 && classes.length === 0));
                }
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