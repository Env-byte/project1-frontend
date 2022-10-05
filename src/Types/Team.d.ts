import {Champion} from "./Api/Champion";

export interface ChampionHex {
    position: number
    champion: Champion
}

export interface Team {
    hexes: ChampionHex[]
    name: string
    setId: string
    isPublic: boolean
    guuid: string | null
    isReadonly: boolean
}