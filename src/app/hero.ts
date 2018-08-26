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
    internalName: string;
    attribute: Attribute;

    rankedPickRates: number[];
    rankedWinRates: number[];
    farmPrioritySamples: number[];
    farmPriorityWinRates: number[];
    xpPrioritySamples: number[];
    xpPriorityWinRates: number[];
    synergySamples: number[];
    synergyWinRates: number[];
    matchUpSamples: number[];
    matchUpWinRates: number[];

    setRankedWinRates(winRates: number[]): void {
        this.rankedWinRates = winRates;
    }

    setFarmPriorityWinRates(winRates: number[]): void {
        this.farmPriorityWinRates = winRates;
    }

    constructor() {
        this.id = 0;
        this.name = "none";
        this.internalName = "empty";
        this.attribute = Attribute.Strength;
    }
}