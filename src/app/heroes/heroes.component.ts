import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../hero';
import { HeroGridComponent } from '../hero-grid/hero-grid.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  @ViewChild(HeroGridComponent)
  heroGrid: HeroGridComponent;

  constructor(private router: Router) {}

  ngOnInit() {
    this.heroGrid.setOnClickAction((hero: Hero) => this.router.navigate(["./hero/" + hero.internalName]));
  }
}
