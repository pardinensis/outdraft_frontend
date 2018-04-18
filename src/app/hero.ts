export enum Attribute {
    Strength = "Strength",
    Agility = "Agility",
    Intelligence = "Intelligence"
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
}