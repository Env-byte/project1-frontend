import {Champion} from "../Types/Api/Champion";
import {Item} from "../Types/Api/Item";
import {Trait} from "../Types/Api/Trait";
import {TFTSetData} from "../Types/TFTSetData";

export class StaticData {
    private constructor() {
    }

    public static Create(set: TFTSetData): StaticData {
        let staticData = new StaticData();
        staticData.setChampions(set.champions);
        staticData.setTraits(set.traits);
        staticData.setItems(set.items);
        return staticData;
    }

    getTraits(): Trait[] {
        return this._Traits;
    }

    getTrait(id: string): Trait | false {
        const trait = this._Traits.find((item) => item.key === id);
        if (trait) {
            return trait;
        }
        return false;
    }

    getItems(): Item[] {
        return this._Items;
    }

    getItem(id: number): Item | false {
        const item = this._Items.find((item) => item.id === id);
        if (item) {
            return item
        }
        return false;
    }

    getChampions(): Champion[] {
        return this._Champions;
    }

    getChampion(id: string): Champion | false {
        const champion = this._Champions.find((item) => item.championId === id);
        if (champion) {
            return champion
        }
        return false;
    }

    private setChampions(value: Champion[]) {
        this._Champions = value;
    }

    private setTraits(value: Trait[]) {
        this._Traits = value;
    }

    private setItems(value: Item[]) {
        this._Items = value;
    }

    private _Champions: Champion[] = [];

    private _Items: Item[] = [];

    private _Traits: Trait[] = []
}