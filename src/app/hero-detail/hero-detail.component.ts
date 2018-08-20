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

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private chartService: ChartService,
  ) {}
  
  ngOnInit() {
    const internalName = this.route.snapshot.paramMap.get('internalname');
    this.heroService.getHeroByInternalName(internalName).then(hero => {
      this.hero = hero;

      setTimeout(() => { // wait for the DOM to finish loading
        // this.chartService.buildWinRateChart("rankedwinratechart", "Rank", ["\u2264 2K", "2K-3K", "3K-4K", "4K-5K", "> 5K"],
        //   this.hero.rankedWinRates, null);
        this.chartService.buildWinRateChart("farmprioritychart", "Farm Priority", ["1", "2", "3", "4", "5"],
          this.hero.farmPriorityWinRates.reverse(), this.hero.farmPrioritySamples.reverse());
        this.chartService.buildWinRateChart("xpprioritychart", "XP Priority", ["1", "2", "3", "4", "5"],
          this.hero.xpPriorityWinRates.reverse(), this.hero.xpPrioritySamples.reverse());
      });
    });
  }
}
