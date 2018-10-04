import { Component, OnInit, ViewChild } from '@angular/core';

import { Hero } from '../hero';
import { HeroGridComponent } from '../hero-grid/hero-grid.component';

@Component({
  selector: 'app-draft-component',
  templateUrl: './draft-component.component.html',
  styleUrls: ['./draft-component.component.css']
})
export class DraftComponentComponent implements OnInit {
  @ViewChild(HeroGridComponent)
  heroGrid: HeroGridComponent;

  constructor() { }

  ngOnInit() {
    this.heroGrid.setOnClickAction((hero: Hero) => console.log(hero.name));
  }
}
