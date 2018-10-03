import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Hero, Attribute } from '../hero';
import { HeroService } from '../hero.service';
import { HeroGridComponent } from '../hero-grid/hero-grid.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  @ViewChild(HeroGridComponent)
  heroGrid: HeroGridComponent;

  blub(hero: Hero, router: Router) {
    router.navigate(["./hero/" + hero.internalName]);
  }

  constructor(private router: Router) {}

  ngOnInit() {
    this.heroGrid.setOnClickAction((hero: Hero) => this.blub(hero, this.router));
  }
}
