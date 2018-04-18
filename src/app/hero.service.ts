import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Hero, Attribute } from '../app/hero';
import { callLifecycleHooksChildrenFirst } from '@angular/core/src/view/provider';


@Injectable()
export class HeroService {
  heroesAvailable: boolean;
  
  heroes: Hero[];
  heroesByName: { [key:string]:Hero };

  constructor() {
    this.heroesAvailable = false;

    this.heroes = [];
    this.heroesByName = {};
  }

  private addHero(hero: Hero): void {
    this.heroes.push(hero);
    this.heroesByName[hero.name] = hero;
  }

  // STUB: initialize a testing set of heroes locally and simulate network delay
  private gatherHeroes() {
    console.log("started gathering");

    // keep it busy
    for (let i = 0; i < 100000000; ++i);

    this.heroes = [];

    let antiMage = new Hero(1, "Anti-Mage", Attribute.Agility);
    antiMage.setRankedWinRates([0.45, 0.45, 0.48, 0.48, 0.48]);
    this.addHero(antiMage);

    let axe = new Hero(2, "Axe", Attribute.Strength);
    axe.setRankedWinRates([0.53, 0.52, 0.52, 0.51, 0.51]);
    this.addHero(axe);

    let bane = new Hero(3, "Bane", Attribute.Intelligence);
    bane.setRankedWinRates([0.49, 0.51, 0.51, 0.53, 0.54]);
    this.addHero(bane);

    let bloodseeker = new Hero(4, "Bloodseeker", Attribute.Agility);
    bloodseeker.setRankedWinRates([0.52, 0.53, 0.51, 0.51, 0.49]);
    this.addHero(bloodseeker);

    let crystalMaiden = new Hero(5, "Crystal Maiden", Attribute.Intelligence);
    crystalMaiden.setRankedWinRates([0.56, 0.54, 0.53, 0.51, 0.50]);
    this.addHero(crystalMaiden);

    this.heroesAvailable = true;
    console.log("finished gathering");
  }

  getAllHeroes(): Promise<Hero[]> {
    return new Promise(resolve => {
      if (!this.heroesAvailable) {
        this.gatherHeroes();
      }
      resolve(this.heroes);
    });
  }

  getHero(name: string): Promise<Hero> {
    return new Promise(resolve => {
      if (!this.heroesAvailable) {
        this.gatherHeroes();
      }
      resolve(this.heroesByName[name]);
    });
  }
}
