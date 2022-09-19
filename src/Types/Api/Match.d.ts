import {Summoner} from "./Summoner";

export interface Match {
    metadata: Metadata;
    info: Info;
}

export interface Info {
    gameDatetime: number;
    gameLength: number;
    gameVariation: string;
    tftGameType: string;
    tftSetCoreName: string;
    gameVersion: string;
    queueId: number;
    tftSetNumber: number;
    participants: Participant[];
    region: string
}

export interface Participant {
    companion: Companion;
    goldLeft: number;
    lastRound: number;
    level: number;
    placement: number;
    playersEliminated: number;
    totalDamageToPlayers: number;
    puuid: string;
    timeEliminated: number;
    traits: MatchTrait[];
    units: Unit[];
}

export interface Companion {
}

export interface MatchTrait {
    name: TraitName;
    numUnits: number;
    style: number;
    tierCurrent: number;
    tierTotal: number;
}

export enum TraitName {
    Set7Assassin = "Set7_Assassin",
    Set7Astral = "Set7_Astral",
    Set7Bard = "Set7_Bard",
    Set7Bruiser = "Set7_Bruiser",
    Set7Cannoneer = "Set7_Cannoneer",
    Set7Cavalier = "Set7_Cavalier",
    Set7Dragon = "Set7_Dragon",
    Set7Dragonmancer = "Set7_Dragonmancer",
    Set7Evoker = "Set7_Evoker",
    Set7Guardian = "Set7_Guardian",
    Set7Guild = "Set7_Guild",
    Set7Jade = "Set7_Jade",
    Set7Legend = "Set7_Legend",
    Set7Mage = "Set7_Mage",
    Set7Mirage = "Set7_Mirage",
    Set7Mystic = "Set7_Mystic",
    Set7Ragewing = "Set7_Ragewing",
    Set7Revel = "Set7_Revel",
    Set7Scalescorn = "Set7_Scalescorn",
    Set7Shapeshifter = "Set7_Shapeshifter",
    Set7Shimmerscale = "Set7_Shimmerscale",
    Set7SpellThief = "Set7_SpellThief",
    Set7Starcaller = "Set7_Starcaller",
    Set7Swiftshot = "Set7_Swiftshot",
    Set7Tempest = "Set7_Tempest",
    Set7Trainer = "Set7_Trainer",
    Set7Warrior = "Set7_Warrior",
    Set7Whispers = "Set7_Whispers",
}

export interface Unit {
    items: number[];
    characterId: string;
    chosen: null;
    name: string;
    rarity: number;
    tier: number;
}

export interface Metadata {
    dataVersion: string;
    matchId: string;
    participants: any[];
    summoners: Summoner[];
}