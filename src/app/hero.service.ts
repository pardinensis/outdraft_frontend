import { Injectable } from '@angular/core';
import { Hero, Attribute } from '../app/hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class HeroService {
	heroesFile: string = "assets/heroes.json";
	heroesAvailable: Promise<boolean>;
	
	heroes: Hero[];
	heroesByName: { [key:string]:Hero };
	heroesByInternalName: { [key:string]:Hero };
	heroesById: { [key:number]:Hero };

	constructor(private http: HttpClient) {
		this.heroes = [];
		this.heroesByName = {};
		this.heroesByInternalName = {};
		this.heroesById = {};

		this.heroesAvailable = new Promise<boolean>(resolve => this.getHeroData(resolve));
	}

	private getHeroData(resolve) {
		this.http.get<Hero[]>(this.heroesFile).subscribe(heroData => {
			for (var i = 0; i < heroData.length; ++i) {
				this.addHero(heroData[i]);
			}
			resolve(true);
		});
	}

	private addHero(hero: Hero): void {
		this.heroes.push(hero);
		this.heroesByName[hero.name] = hero;
		this.heroesByInternalName[hero.internalName] = hero;
		this.heroesById[hero.id] = hero;

		let bestFarmPriority = 0;
		let bestFarmPriorityWinRate = 0;
		let totalSamples = hero.farmPrioritySamples.reduce((a, b) => a + b, 0);
		for (let i = 0; i < 5; ++i) {
			if (hero.farmPrioritySamples[i] / totalSamples > 0.05 && hero.farmPriorityWinRates[i] > bestFarmPriorityWinRate) {
				bestFarmPriority = i;
				bestFarmPriorityWinRate = hero.farmPriorityWinRates[i];
			}
		}
		hero.bestFarmPriority = 5 - bestFarmPriority;

		let bestXPPriority = 0;
		let bestXPPriorityWinRate = 0;
		for (let i = 0; i < 5; ++i) {
			if (hero.xpPrioritySamples[i] / totalSamples > 0.05 && hero.xpPriorityWinRates[i] > bestXPPriorityWinRate) {
				bestXPPriority = i;
				bestXPPriorityWinRate = hero.xpPriorityWinRates[i];
			}
		}
		hero.bestXPPriority = 5 - bestXPPriority;
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
				resolve(this.heroesByName[name]);
			});
		});
	}

	getHeroByInternalName(internalName: string): Promise<Hero> {
		return new Promise(resolve => {
			this.heroesAvailable.then(() => {
				resolve(this.heroesByInternalName[internalName]);
			});
		});
	}

	getHeroById(id: number): Promise<Hero> {
		return new Promise(resolve => {
			this.heroesAvailable.then(() => {
				resolve(this.heroesById[id]);
			});
		});
	}
}
