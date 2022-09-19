import {StaticData} from "./StaticData";
import {Champion} from "../Types/Api/Champion";
import {Trait} from "../Types/Api/Trait";


export interface ChampionPageFilters {
    cost: number[]
    origin: string[]
    class: string[]
    champions: string[]
    usingSearch?: boolean
}

export default class FilterHelper {

    static remove(filter: ChampionPageFilters, type: string, val: string | number): ChampionPageFilters {
        if (type === 'cost') {
            filter.cost = filter.cost.filter((item) => item !== val as number);
        } else if (type === 'class') {
            filter.class = filter.class.filter((item) => item !== val as string);
        } else {
            filter.origin = filter.origin.filter((item) => item !== val as string);
        }
        return filter;
    }

    static add(filter: ChampionPageFilters, type: string, val: number | string): ChampionPageFilters {
        if (type === 'cost') {
            filter.cost.push(val as number);
        } else if (type === 'class') {
            filter.class.push(val as string);
        } else {
            filter.origin.push(val as string);
        }
        return filter;
    }

    static search(filter: ChampionPageFilters, search: string, staticData: StaticData): ChampionPageFilters {
        search = search.toLowerCase();
        //filter champion name
        const champions = staticData.getChampions();
        filter.champions = FilterHelper.searchChampion(search, champions);
        if (search.length > 2) {
            const traits = staticData.getTraits();
            const traitFilter = FilterHelper.searchTraits(search, traits);
            filter.origin = traitFilter.origin;
            filter.class = traitFilter.class;
        } else {
            filter.origin = [];
            filter.class = [];
        }

        filter.cost = [];
        if (search.length === 1) {
            const cost = Number(search);
            if (!isNaN(cost)) {
                filter.cost.push(cost);
            }
        }

        if (filter.origin.length === 0 && filter.class.length === 0 && filter.cost.length === 0) {
            //ensure that the searched term does not show everything
            filter.champions.push(search);
        }

        return filter
    }

    private static searchChampion(search: string, champions: Champion[]): string[] {
        return champions
            .filter(item => {
                return item.name.toLowerCase().indexOf(search) !== -1;
            })
            .map<string>((item) => item.name);
    }

    private static searchTraits(search: string, traits: Trait[]): { origin: string[], class: string[] } {
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

    static runFilter(filter: ChampionPageFilters, champions: Record<string, Champion>): Champion[] {
        let data = [];
        for (let key in champions) {
            if (champions.hasOwnProperty(key)) {
                const champion = champions[key];
                if (champion.cost > 5) {
                    continue;
                }
                let show = true;
                if (filter.champions.length > 0) {
                    const condition = filter.champions.includes(champion.name);
                    show = (filter.usingSearch) ? show && condition : condition;
                }
                if (filter.class.length > 0 || filter.origin.length > 0) {
                    const classes = champion.traits.filter((trait) => filter.class.find((classItem) => trait === classItem))
                    const origins = champion.traits.filter((trait) => filter.origin.find((originItem) => trait === originItem))
                    const condition = !((origins.length === 0 && filter.origin.length > 0) || (filter.class.length > 0 && classes.length === 0));
                    show = (filter.usingSearch) ? show && condition : condition;
                }
                if (filter.cost.length !== 0) {
                    const condition = filter.cost.includes(champion.cost);
                    //cost should always be && every other condition.
                    //prevents showing 1 cost and all evokers for example
                    show = show && condition;
                }
                if (show) {
                    data.push(champion);
                }
            }
        }
        return data;
    }
}