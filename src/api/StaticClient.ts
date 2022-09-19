import {ContentClient} from "./FetchWrapper";
import {Trait} from "../Types/Api/Trait";
import {Item} from "../Types/Api/Item";
import {Champion} from "../Types/Api/Champion";

export default class StaticClient {
    public static GetChampions(set: string): Promise<Champion[]> {
        return ContentClient
            .get<Champion[]>('/' + set + '/champions.json');
    }

    public static GetTraits(set: string): Promise<Trait[]> {
        return ContentClient
            .get<Trait[]>('/' + set + '/traits.json');
    }

    public static GetItems(set: string): Promise<Item[]> {
        return ContentClient
            .get<Item[]>('/' + set + '/items.json');
    }
}