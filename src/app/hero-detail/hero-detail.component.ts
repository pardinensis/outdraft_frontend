import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

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
  ) {}

  ngOnInit() {
    const internalName = this.route.snapshot.paramMap.get('internalname');
    this.heroService.getHeroByFilename(internalName).then(hero => {
      this.hero = hero;
    });
  }
}
