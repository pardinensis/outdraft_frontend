import { Component, OnInit } from '@angular/core';

import { Hero, Attribute } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-grid',
  templateUrl: './hero-grid.component.html',
  styleUrls: ['./hero-grid.component.css']
})
export class HeroGridComponent implements OnInit {
  strengthHeroes1: Hero[];
  strengthHeroes2: Hero[];
  agilityHeroes1: Hero[];
  agilityHeroes2: Hero[];
  intelligenceHeroes1: Hero[];
  intelligenceHeroes2: Hero[];

  onClickAction: (Hero) => void;

  constructor(
    private heroService: HeroService
  ) {
    this.strengthHeroes1 = [];
    this.strengthHeroes2 = [];
    this.agilityHeroes1 = [];
    this.agilityHeroes2 = [];
    this.intelligenceHeroes1 = [];
    this.intelligenceHeroes2 = [];
    this.onClickAction = this.clicked;
  }

  public clicked(hero: Hero) {
    console.log(hero.name);
  }

  setOnClickAction(f: (Hero) => void) {
    this.onClickAction = f;
  }

  ngOnInit() {
    setTimeout(() => { // wait for the DOM to finish loading
      this.heroService.getAllHeroes().then(heroes => {
        let str: Hero[] = [];
        let agi: Hero[] = [];
        let int: Hero[] = [];
        heroes.forEach(hero => {
          switch(hero.attribute) {
            case Attribute.Strength:
              str.push(hero);
              break;
            case Attribute.Agility:
              agi.push(hero);
              break;
            case Attribute.Intelligence:
              int.push(hero);
              break;
          }
        });
        let compare = (a: Hero, b: Hero) => {
          return a.internalName.localeCompare(b.internalName);
        };
        str.sort(compare);
        agi.sort(compare);
        int.sort(compare);

        const maxIconsPerRow = 22;
        this.strengthHeroes1 = str.slice(0, maxIconsPerRow);
        this.strengthHeroes2 = str.slice(maxIconsPerRow);
        this.agilityHeroes1 = agi.slice(0, maxIconsPerRow);
        this.agilityHeroes2 = agi.slice(maxIconsPerRow);
        this.intelligenceHeroes1 = int.slice(0, maxIconsPerRow);
        this.intelligenceHeroes2 = int.slice(maxIconsPerRow);
      });
    });
  }
}
