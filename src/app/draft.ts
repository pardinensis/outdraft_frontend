import { Hero, Bracket } from './hero';
import { HeroService } from './hero.service';

export class Draft {
    static bracket = Bracket.Ancient;

    permutations: number[][];

    generatePermutations(a: number[], size: number): void {
        if (size <= 1) {
            this.permutations.push(a.slice());
        }
        else {
            for (let i = 0; i < size; ++i) {
                this.generatePermutations(a, size - 1);
                if (size % 2 === 1) {
                    let tmp = a[0];
                    a[0] = a[size - 1];
                    a[size - 1] = tmp;
                }
                else {
                    let tmp = a[i]; 
                    a[i] = a[size - 1]; 
                    a[size - 1] = tmp; 
                }
            }
        }
    }

    constructor(private heroService: HeroService) {
        this.permutations = [];        
        let a = [0, 1, 2, 3, 4];
        this.generatePermutations(a, 5);
    }

    combine(winRate1: number, winRate2: number): number {
        return winRate1 * winRate2 / (winRate1 * winRate2 + (1 - winRate1) * (1 - winRate2));
    }

    evaluateRankedWinRates(allyHeroes: Hero[], enemyHeroes: Hero[]): number {
        let totalWinRate = 0.5;
        allyHeroes.forEach((hero) => totalWinRate = this.combine(totalWinRate, hero.rankedWinRates[Draft.bracket]));
        enemyHeroes.forEach((hero) => totalWinRate = this.combine(totalWinRate, 1 - hero.rankedWinRates[Draft.bracket]));
        return totalWinRate;
    }

    evaluateSynergies(heroes: Hero[]): number {
        let totalWinRate = 0.5;
        for (let i = 0; i < heroes.length; ++i) {
            for (let j = i + 1; j < heroes.length; ++j) {
                let winRate = heroes[i].synergyWinRates[heroes[j].id];
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

    evaluatePriority(heroes: Hero[], priorityWinRate: (hero: Hero, priority: number) => number): number {
        let maxWinRates: {[id: number]: number} = {};
        heroes.forEach((hero: Hero) => {
            let maxWinRate = 0;
            for (let i = 0; i < 5; ++i) {
                maxWinRate = Math.max(maxWinRate, priorityWinRate(hero, i));
            }
            maxWinRates[hero.id] = maxWinRate;
        });

        let bestWinRate = 0;
        let bestPermutation = [];
        this.permutations.forEach((permutation: number[]) => {
            let winRate = 0.5;
            for (let i = 0; i < heroes.length; ++i) {
                winRate = this.combine(winRate, priorityWinRate(heroes[i], permutation[i]) - maxWinRates[heroes[i].id] + 0.5);
            }
            if (winRate > bestWinRate) {
                bestWinRate = winRate;
                bestPermutation = permutation;
            }
        });
        
        return bestWinRate;
    }

    evaluateFarmPriority(heroes: Hero[]) {
        return this.evaluatePriority(heroes, (hero: Hero, priority: number) => {
            return hero.farmPriorityWinRates[priority];
        });
    }

    evaluateXPPriority(heroes: Hero[]) {
        return this.evaluatePriority(heroes, (hero: Hero, priority: number) => {
            return hero.xpPriorityWinRates[priority];
        });
    }

    evaluate(allyHeroes: Hero[], enemyHeroes: Hero[]): number {
        let totalWinRate = 0.5;

        if (allyHeroes.length > 5 || enemyHeroes.length > 5) {
            return 0;
        }

        totalWinRate = this.combine(totalWinRate, this.evaluateRankedWinRates(allyHeroes, enemyHeroes));
        totalWinRate = this.combine(totalWinRate, this.evaluateSynergies(allyHeroes));
        totalWinRate = this.combine(totalWinRate, 1 - this.evaluateSynergies(enemyHeroes));
        totalWinRate = this.combine(totalWinRate, this.evaluateMatchUps(allyHeroes, enemyHeroes));
        totalWinRate = this.combine(totalWinRate, this.evaluateFarmPriority(allyHeroes));
        // totalWinRate = this.combine(totalWinRate, this.evaluateXPPriority(allyHeroes));

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