import {ContentClient} from "../api/FetchWrapper";

const english_ordinal_rules = new Intl.PluralRules("en", {type: "ordinal"});
const suffixes: Record<string, string> = {
    one: "st",
    two: "nd",
    few: "rd",
    other: "th"
};


export default class StaticHelpers {
    public static Ordinal(number?: number): string {
        if (!number) return "";
        const category = english_ordinal_rules.select(number);
        const suffix = suffixes[category];
        return (number + suffix);
    }

    public static deepCopy = <T, U = T extends Array<infer V> ? V : never>(source: T): T => {
        if (Array.isArray(source)) {
            return source.map(item => (StaticHelpers.deepCopy(item))) as T & U[]
        }
        if (source instanceof Date) {
            return new Date(source.getTime()) as T & Date
        }
        if (source && typeof source === 'object') {
            return (Object.getOwnPropertyNames(source) as (keyof T)[]).reduce<T>((o, prop) => {
                Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop)!)
                o[prop] = StaticHelpers.deepCopy(source[prop])
                return o
            }, Object.create(Object.getPrototypeOf(source)))
        }
        return source
    }

    public static  championImage = (setId: string, name: string) => {
        return ContentClient.ApiPrefix + "/" + setId + "/champions/" + encodeURIComponent(name.replace('\'', '')) + '.png';
    }

}