import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ChartService } from '../chart.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  bestSynergies: Hero[];
  bestMatchups: Hero[];

  N_SYNERGIES = 8;
  N_MATCHUPS = 8;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private chartService: ChartService,
  ) {
    this.bestSynergies = [];
    this.bestMatchups = [];
    for (let i = 0; i < this.N_SYNERGIES; ++i) {
      this.bestSynergies[i] = new Hero();
      this.bestMatchups[i] = new Hero();
    }
  }

  buildCharts() {
    // this.chartService.buildWinRateChart("rankedwinratechart", "Rank", ["\u2264 2K", "2K-3K", "3K-4K", "4K-5K", "> 5K"],
      // this.hero.rankedWinRates, null);
    this.chartService.buildWinRateChart("farmprioritychart", "Farm Priority", ["1", "2", "3", "4", "5"],
      this.hero.farmPriorityWinRates.reverse(), this.hero.farmPrioritySamples.reverse());
    this.chartService.buildWinRateChart("xpprioritychart", "XP Priority", ["1", "2", "3", "4", "5"],
      this.hero.xpPriorityWinRates.reverse(), this.hero.xpPrioritySamples.reverse());
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
          heroes.sort((a: Hero, b: Hero) => {
            return this.hero.matchUpWinRates[b.id] - this.hero.matchUpWinRates[a.id];
          });
          this.bestMatchups = heroes.slice(0, this.N_MATCHUPS);
        });

        this.heroService.getAllHeroes().then(allies => {
          for (let i = 0; i < this.N_SYNERGIES; ++i) {
            console.log(allies[i].name);
          }
        });

        this.buildCharts();
      }); // setTimeout
    }); // getHeroByInternalName
  }
}
