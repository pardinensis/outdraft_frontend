export enum Attribute {
    Strength = "Strength",
    Agility = "Agility",
    Intelligence = "Intelligence"
}

export enum Bracket {
    Crusader = 0,
    Archon = 1,
    Legend = 2,
    Ancient = 3,
    Divine = 4
}

export class Hero {
    id: number;
    name: string;
    attribute: Attribute;

    rankedWinRates: number[];

    constructor(id: number, name: string, attribute: Attribute) {
        this.id = id;
        this.name = name;
        this.attribute = attribute;
    }

    setRankedWinRates(winRates: number[]): void {
        this.rankedWinRates = winRates;
    }
}