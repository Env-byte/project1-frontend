import {Trait} from "./Api/Trait";
import {Item} from "./Api/Item";
import {Champion} from "./Api/Champion";

export interface TFTSetData {
    id: string;
    traits: Trait[]
    items: Item[]
    champions: Champion[]
}