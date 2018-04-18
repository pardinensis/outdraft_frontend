import { Component } from '@angular/core';
import { HeroService } from './hero.service';

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
      console.log(hero);
    });
  }
}
