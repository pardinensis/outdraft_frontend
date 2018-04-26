import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Hero, Attribute } from '../app/hero';
import { callLifecycleHooksChildrenFirst } from '@angular/core/src/view/provider';


@Injectable()
export class HeroService {
  heroesAvailable: boolean;
  
  heroes: Hero[];
  heroesByName: { [key:string]:Hero };
  heroesByInternalName: { [key:string]:Hero };

  constructor() {
    this.heroesAvailable = false;

    this.heroes = [];
    this.heroesByName = {};
    this.heroesByInternalName = {};
  }

  private addHero(hero: Hero): void {
    this.heroes.push(hero);
    this.heroesByName[hero.name] = hero;
    this.heroesByInternalName[hero.internalName] = hero;
  }

  // STUB: initialize a testing set of heroes locally and simulate network delay
  private gatherHeroes() {
    console.log("started gathering");

    // keep it busy
    for (let i = 0; i < 100000000; ++i);

    this.heroes = [];

    let antiMage = new Hero(1, "Anti-Mage", "Magina, the Anti-Mage", Attribute.Agility);
    antiMage.setRankedWinRates([0.4479, 0.4620, 0.4762, 0.4744, 0.4742]);
    this.addHero(antiMage);

    let axe = new Hero(2, "Axe", "Mogul Khan, the Axe", Attribute.Strength);
    axe.setRankedWinRates([0.5341, 0.5315, 0.5247, 0.5126, 0.5154]);
    this.addHero(axe);

    let bane = new Hero(3, "Bane", "Atropos, the Bane", Attribute.Intelligence);
    bane.setRankedWinRates([0.4918, 0.4983, 0.5179, 0.5253, 0.5473]);
    this.addHero(bane);

    let bloodseeker = new Hero(4, "Bloodseeker", "Strygwyr, the Bloodseeker", Attribute.Agility);
    bloodseeker.setRankedWinRates([0.5292, 0.5299, 0.5185, 0.5200, 0.4996]);
    this.addHero(bloodseeker);

    let crystalMaiden = new Hero(5, "Crystal Maiden", "Rylai, the Crystal Maiden", Attribute.Intelligence);
    crystalMaiden.setRankedWinRates([0.5585, 0.5395, 0.5267, 0.5205, 0.5026]);
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

  getHeroByName(name: string): Promise<Hero> {
    return new Promise(resolve => {
      if (!this.heroesAvailable) {
        this.gatherHeroes();
      }
      resolve(this.heroesByName[name]);
    });
  }

  getHeroByInternalName(internalName: string): Promise<Hero> {
    return new Promise(resolve => {
      if (!this.heroesAvailable) {
        this.gatherHeroes();
      }
      resolve(this.heroesByInternalName[internalName]);
    });
  }
}
