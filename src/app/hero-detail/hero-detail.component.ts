import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ChartService } from '../chart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  routeSubscription: Subscription;

  hero: Hero;
  bestSynergies: Hero[];
  bestMatchups: Hero[];
  worstSynergies: Hero[];
  worstMatchups: Hero[];

  N_SYNERGIES = 12;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private chartService: ChartService,
  ) {
    this.bestSynergies = [];
    this.bestMatchups = [];
    this.worstSynergies = [];
    this.worstMatchups = [];
    for (let i = 0; i < this.N_SYNERGIES; ++i) {
      this.bestSynergies[i] = new Hero();
      this.bestMatchups[i] = new Hero();
      this.worstSynergies[i] = new Hero();
      this.worstMatchups[i] = new Hero();
    }
  }

  buildCharts() {
    this.chartService.buildWinRateChart("rankedwinratechart", "Rank", ["HE", "GU", "CR", "AR", "LE", "AN", "DI", "IM"],
      this.hero.rankedWinRates, null);
    this.chartService.buildWinRateChart("farmprioritychart", "Farm Priority", ["1", "2", "3", "4", "5"],
      this.hero.farmPriorityWinRates.slice().reverse(), this.hero.farmPrioritySamples.slice().reverse());
    this.chartService.buildWinRateChart("xpprioritychart", "XP Priority", ["1", "2", "3", "4", "5"],
      this.hero.xpPriorityWinRates.slice().reverse(), this.hero.xpPrioritySamples.slice().reverse());
  }

  buildHeroTable(heroes: Hero[], elementId: string, criteria: (Hero) => number) {
    heroes = heroes.slice();
    heroes.sort((a: Hero, b: Hero) => {
      return criteria(b) - criteria(a);
    });

    let container = document.getElementById(elementId);
    for (let i = 0; i < 5; ++i) {
      container.innerHTML += "<p>" + heroes[i].name + "</p>";
    }
  }
  
  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(routeParams => {
      const internalName = this.route.snapshot.paramMap.get('internalname');
      this.heroService.getHeroByInternalName(internalName).then(hero => {
        this.hero = hero;

        setTimeout(() => { // wait for the DOM to finish loading
          let bestAlly = null;
          let bestSynergy = 0;
          this.heroService.getAllHeroes().then(heroes => {
            // this.buildHeroTable(heroes, "synergies", ally => this.hero.synergyWinRates[ally.id]);
            // this.buildHeroTable(heroes, "matchups", opponent => this.hero.matchUpWinRates[opponent.id]);

            heroes = heroes.slice();
            heroes.sort((a: Hero, b: Hero) => {
              return this.hero.synergyWinRates[b.id] - this.hero.synergyWinRates[a.id];
            });
            this.bestSynergies = heroes.slice(0, this.N_SYNERGIES);
            this.worstSynergies = heroes.slice(heroes.length - this.N_SYNERGIES - 1, heroes.length - 1).reverse();
            heroes.sort((a: Hero, b: Hero) => {
              return this.hero.matchUpWinRates[b.id] - this.hero.matchUpWinRates[a.id];
            });
            this.bestMatchups = heroes.slice(0, this.N_SYNERGIES);
            this.worstMatchups = heroes.slice(heroes.length - this.N_SYNERGIES - 1, heroes.length - 1).reverse();
          });

          this.buildCharts();
        }); // setTimeout
      }); // getHeroByInternalName
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
