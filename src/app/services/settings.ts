/**
 * Created by mrx on 25.04.18.
 */

export enum Bracket {
  Crusader = 0,
  Archon = 1,
  Legend = 2,
  Ancient = 3,
  Divine = 4
}

export class Settings {
  bracket: Bracket;
  weightA: number;
  weightE: number;
  constructor(bracket: Bracket, weightA: number, weightE: number) {
    this.bracket = bracket;
    this.weightA = weightA;
    this.weightE = weightE;
  }
}
