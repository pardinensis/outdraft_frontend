import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hero, Attribute } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  strengthHeroes: Hero[];
  agilityHeroes: Hero[];
  intelligenceHeroes: Hero[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService
  ) {
    this.strengthHeroes = [];
    this.agilityHeroes = [];
    this.intelligenceHeroes = [];
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
        this.strengthHeroes = str;
        this.agilityHeroes = agi;
        this.intelligenceHeroes = int;
      });
    });
  }
}
