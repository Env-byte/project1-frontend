import {Champion} from "./Api/Champion";

export interface ChampionHex {
    hex: number
    champion: Champion
}

export interface Team {
    hexes: ChampionHex[]
    name: string
    setId: string
    isPublic: boolean
}