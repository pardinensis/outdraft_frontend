import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Hero, Attribute } from '../app/hero';


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
    this.addHero(new Hero(1, "Anti-Mage", Attribute.Agility));
    this.addHero(new Hero(2, "Axe", Attribute.Strength));
    this.addHero(new Hero(3, "Bane", Attribute.Intelligence));
    this.addHero(new Hero(4, "Bloodseeker", Attribute.Agility));
    this.addHero(new Hero(5, "Crystal Maiden", Attribute.Intelligence));

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
