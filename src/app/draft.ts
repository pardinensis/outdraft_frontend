import { Hero, Bracket } from './hero';
import { HeroService } from './hero.service';

export class Draft {
    static bracket = Bracket.Ancient;

    constructor(private heroService: HeroService) { }

    combine(winRate1: number, winRate2: number): number {
        return winRate1 * winRate2 / (winRate1 * winRate2 + (1 - winRate1) * (1 - winRate2));
    }

    evaluateRankedWinRates(allyHeroes: Hero[], enemyHeroes: Hero[]): number {
        let totalWinRate = 0.5;
        allyHeroes.forEach((hero) => totalWinRate = this.combine(totalWinRate, hero.rankedWinRates[Draft.bracket]));
        enemyHeroes.forEach((hero) => totalWinRate = this.combine(totalWinRate, 1 - hero.rankedWinRates[Draft.bracket]));
        return totalWinRate;
    }

    evaluateSynergies(allyHeroes: Hero[], enemyHeroes: Hero[]): number {
        let totalWinRate = 0.5;
        for (let i = 0; i < allyHeroes.length; ++i) {
            for (let j = i + 1; j < allyHeroes.length; ++j) {
                let winRate = allyHeroes[i].synergyWinRates[allyHeroes[j].id];
                totalWinRate = this.combine(totalWinRate, winRate);
            }
        }
        for (let i = 0; i < enemyHeroes.length; ++i) {
            for (let j = i + 1; j < enemyHeroes.length; ++j) {
                let winRate = 1 - enemyHeroes[i].synergyWinRates[enemyHeroes[j].id];
                totalWinRate = this.combine(totalWinRate, winRate);
            }
        }
        return totalWinRate;        
    }

    evaluateMatchUps(allyHeroes: Hero[], enemyHeroes: Hero[]): number {
        let totalWinRate = 0.5;
        for (let i = 0; i < allyHeroes.length; ++i) {
            for (let j = 0; j < enemyHeroes.length; ++j) {
                let winRate = allyHeroes[i].matchUpWinRates[enemyHeroes[j].id];
                totalWinRate = this.combine(totalWinRate, winRate);
            }
        }
        return totalWinRate;        
    }

    evaluate(allyHeroes: Hero[], enemyHeroes: Hero[]): number {
        let totalWinRate = 0.5;

        if (allyHeroes.length > 5 || enemyHeroes.length > 5) {
            return 0;
        }

        totalWinRate = this.combine(totalWinRate, this.evaluateRankedWinRates(allyHeroes, enemyHeroes));
        totalWinRate = this.combine(totalWinRate, this.evaluateSynergies(allyHeroes, enemyHeroes));
        totalWinRate = this.combine(totalWinRate, this.evaluateMatchUps(allyHeroes, enemyHeroes));

        return totalWinRate;
    }

    suggest(allyHeroes: Hero[], enemyHeroes: Hero[], nSuggestions: number): Promise<Hero[]> {
        return new Promise((resolve, reject) => {
            this.heroService.getAllHeroes().then((heroes: Hero[]) => {
                // check which heroes are available
                let available: {[heroId: number]: boolean} = {};
                heroes.forEach((hero: Hero) => available[hero.id] = true);
                allyHeroes.forEach((hero: Hero) => available[hero.id] = false);
                enemyHeroes.forEach((hero: Hero) => available[hero.id] = false);

                // evaluate possible picks
                let possiblePicks: {hero: Hero, winRate: number}[] = [];
                heroes.forEach((hero: Hero) => {
                    if (available[hero.id]) {
                        let newAllyHeroes: Hero[] = allyHeroes.slice();
                        newAllyHeroes.push(hero);
                        possiblePicks.push({
                            hero: hero,
                            winRate: this.evaluate(newAllyHeroes, enemyHeroes),
                        });
                    }
                });

                // sort and return
                possiblePicks.sort((a: {hero: Hero, winRate: number}, b: {hero: Hero, winRate: number}) => b.winRate - a.winRate);
                let suggestedHeroes = [];
                for (let i = 0; i < Math.min(nSuggestions, possiblePicks.length); ++i) {
                    suggestedHeroes.push(possiblePicks[i].hero);
                }
                resolve(suggestedHeroes);
            });
        });
    }
}