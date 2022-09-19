export interface Trait {
    key: string;
    name: string;
    description: string;
    type: TraitType;
    sets: Set[];
}

export interface Set {
    style: Style;
    min: string;
    max: string;
}

export enum Style {
    Bronze = "bronze",
    Chromatic = "chromatic",
    Gold = "gold",
    Silver = "silver",
}

export enum TraitType {
    Class = "class",
    Origin = "origin",
}
