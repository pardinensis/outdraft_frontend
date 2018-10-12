export enum Attribute {
    Strength = "str",
    Agility = "agi",
    Intelligence = "int"
}

export enum Bracket {
    Herald = 0,
    Guardian = 1,
    Crusader = 2,
    Archon = 3,
    Legend = 4,
    Ancient = 5,
    Divine = 6,
    Immortal = 7
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

    synergySpecifity: number;
    matchUpSpecifity: number;

    bestFarmPriority: number;
    bestXPPriority: number;

    constructor() {
        this.id = 0;
        this.name = "none";
        this.internalName = "empty";
        this.attribute = Attribute.Strength;
    }

    static NONE = new Hero();
}
