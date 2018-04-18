import { Component } from '@angular/core';
import { HeroService } from './hero.service';
import { Bracket } from './hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Outdraft';

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHero("Crystal Maiden").then(hero => {
      console.log(hero.name + " has a " + (hero.rankedWinRates[Bracket.Ancient] * 100) + "% win rate in the ancient bracket.");
    });
  }
}
