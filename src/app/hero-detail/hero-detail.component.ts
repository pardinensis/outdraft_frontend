import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ChartService } from '../chart.service';

declare var google: any;

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
      this.chartService.buildWinRateChart("rankedwinratechart", "Rank", ["Crusader", "Archon", "Legend", "Ancient", "Divine"], this.hero.rankedWinRates);
      this.chartService.buildWinRateChart("farmprioritychart", "Farm Priority (Position)", ["1", "2", "3", "4", "5"], this.hero.farmPriorityWinRates);
      });
  }
}
