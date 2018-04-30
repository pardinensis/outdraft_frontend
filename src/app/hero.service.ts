import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Hero, Attribute } from '../app/hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class HeroService {
  heroesFile: string = "assets/heroes.json";
  heroesAvailable: Promise<boolean>;
  
  heroes: Hero[];
  heroesByName: { [key:string]:Hero };
  heroesByInternalName: { [key:string]:Hero };

  constructor(
    private http: HttpClient
  ) {
    this.heroes = [];
    this.heroesByName = {};
    this.heroesByInternalName = {};

    this.heroesAvailable = new Promise<boolean>(resolve => this.getHeroData(resolve));
  }

  private getHeroData(resolve) {
    class HeroData {
      heroes: Hero[]
    }

    this.http.get<HeroData>(this.heroesFile).subscribe(heroData => {
      for (var i = 0; i < heroData.heroes.length; ++i) {
        this.addHero(heroData.heroes[i]);
      }
      resolve(true);
    });
  }

  private addHero(hero: Hero): void {
    this.heroes.push(hero);
    this.heroesByName[hero.name] = hero;
    this.heroesByInternalName[hero.internalName] = hero;
  }

  wait(): Promise<void> {
    return new Promise(resolve => {
      this.heroesAvailable.then(() => {
          resolve();
      });
    });
  }

  getAllHeroes(): Promise<Hero[]> {
    return new Promise(resolve => {
      this.heroesAvailable.then(() => {
        resolve(this.heroes);
      });
    });
  }

  getHeroByName(name: string): Promise<Hero> {
    return new Promise(resolve => {
      this.heroesAvailable.then(() => {
      });
        resolve(this.heroesByName[name]);
      });
  }

  getHeroByInternalName(internalName: string): Promise<Hero> {
    return new Promise(resolve => {
      this.heroesAvailable.then(() => {
        resolve(this.heroesByInternalName[internalName]);
      });
    });
  }
}
