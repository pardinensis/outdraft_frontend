import { Component, OnInit, ViewChild } from '@angular/core';

import { Hero } from '../hero';
import { Draft } from '../draft';
import { ColorScaleService } from '../color-scale.service';
import { HeroGridComponent } from '../hero-grid/hero-grid.component';
import { HeroService } from '../hero.service';

class DraftPanel {
  element: HTMLElement;
  pickedHero: Hero;
  hero: Hero;
  percentage: string;

  constructor(public id: number) {
    this.element = null;
    this.pickedHero = Hero.NONE;
    this.hero = Hero.NONE;
    setTimeout(() => {
      this.element = document.getElementById("draft-panel-" + id);
    });
    this.percentage = "\xa0";
  }

  addHighlight(): void {
    this.element.style.boxShadow = "0px 0px 6px white";
  }

  removeHighlight(): void {
    this.element.style.boxShadow = "none";
  }
}

class SuggestionPanel {
  element: HTMLElement;
  hero: Hero;
  opacity: number;

  constructor(public id: number) {
    this.element = null;
    this.hero = Hero.NONE;
    this.opacity = 0.5;
    setTimeout(() => {
      this.element = document.getElementById("suggestion-panel-" + id);
    })
  }
}

class WinRatePanel {
  element: HTMLElement;
  winRate: string;

  constructor() {
    this.element = null;
    this.winRate = "50.00%"
    setTimeout(() => {
      this.element = document.getElementById("winrate-panel");
    })
  }

  setWinRate(winRate: number): void {
    this.winRate = (winRate * 100).toFixed(2) + "%";
  }
}

@Component({
  selector: 'app-draft-component',
  templateUrl: './draft-component.component.html',
  styleUrls: ['./draft-component.component.css']
})
export class DraftComponentComponent implements OnInit {
  @ViewChild(HeroGridComponent)
  heroGrid: HeroGridComponent;

  allyDraftPanels: DraftPanel[];
  enemyDraftPanels: DraftPanel[];
  draftPanels: DraftPanel[];
  selectedDraftPanel = null;
  selectedDraftPanelIsAlly = false;

  winRatePanel: WinRatePanel;

  allySuggestionPanels: SuggestionPanel[];
  enemySuggestionPanels: SuggestionPanel[];

  allySuggestionPanels1: SuggestionPanel[];
  allySuggestionPanels2: SuggestionPanel[];
  enemySuggestionPanels1: SuggestionPanel[];
  enemySuggestionPanels2: SuggestionPanel[];

  draft: Draft;

  readonly nSuggestions = 24;


  constructor(private heroService: HeroService, private colorScaleService: ColorScaleService) {
    this.allyDraftPanels = [];
    this.enemyDraftPanels = [];
    this.draftPanels = [];
    for (let i = 0; i < 5; ++i) {
      this.allyDraftPanels[i] = new DraftPanel(i);
      this.enemyDraftPanels[i] = new DraftPanel(i + 5);

      this.draftPanels[i] = this.allyDraftPanels[i];
      this.draftPanels[i + 5] = this.enemyDraftPanels[i];
    }

    this.winRatePanel = new WinRatePanel();

    this.allySuggestionPanels = [];
    this.allySuggestionPanels1 = [];
    this.allySuggestionPanels2 = [];
    this.enemySuggestionPanels = [];
    this.enemySuggestionPanels1 = [];
    this.enemySuggestionPanels2 = [];
    for (let i = 0; i < this.nSuggestions; ++i) {
      this.allySuggestionPanels[i] = new SuggestionPanel(i);
      this.enemySuggestionPanels[i] = new SuggestionPanel(i + this.nSuggestions);

      if (i < this.nSuggestions / 2) {
        this.allySuggestionPanels1[i] = this.allySuggestionPanels[i];
        this.enemySuggestionPanels1[i] = this.enemySuggestionPanels[i];
      }
      else {
        this.allySuggestionPanels2[i - this.nSuggestions / 2] = this.allySuggestionPanels[i];
        this.enemySuggestionPanels2[i - this.nSuggestions / 2] = this.enemySuggestionPanels[i];
      }
    }

    this.draft = new Draft(heroService);

    setTimeout(() => {
      this.update();
    });
  }

  select(panel: DraftPanel): boolean {
    this.draftPanels.forEach((p) => p.removeHighlight());
    panel.addHighlight();
    this.selectedDraftPanel = panel;
    this.selectedDraftPanelIsAlly = this.allyDraftPanels.includes(panel);

    return false;
  }

  remove(panel: DraftPanel): boolean {
    panel.pickedHero = Hero.NONE;
    panel.hero = Hero.NONE;

    this.update();
    return false;
  }

  pick(hero: Hero): boolean {
    if (this.selectedDraftPanel !== null) {
      this.selectedDraftPanel.pickedHero = hero;
      this.selectedDraftPanel.hero = hero;
    }

    this.update();
    return false;
  }

  hover(hero: Hero): boolean {
    if (this.selectedDraftPanel !== null && hero != Hero.NONE) {
      this.selectedDraftPanel.hero = hero;

      this.allyDraftPanels.forEach((panel: DraftPanel) => {
        if (panel.pickedHero !== Hero.NONE && panel !== this.selectedDraftPanel) {
          let winRate = (this.selectedDraftPanelIsAlly) ? hero.synergyWinRates[panel.pickedHero.id] : hero.matchUpWinRates[panel.pickedHero.id];
          panel.percentage = ((winRate - 0.5) * 100).toFixed(2) + "%";
        }
      });
      this.enemyDraftPanels.forEach((panel: DraftPanel) => {
        if (panel.pickedHero !== Hero.NONE && panel !== this.selectedDraftPanel) {
          let winRate = (this.selectedDraftPanelIsAlly) ? hero.matchUpWinRates[panel.pickedHero.id] : hero.synergyWinRates[panel.pickedHero.id];
          panel.percentage = ((winRate - 0.5) * 100).toFixed(2) + "%";
        }
      });

      this.updateWinRate();
    }
    return false;
  }

  hoverEnd(hero: Hero): boolean {
    if (this.selectedDraftPanel !== null) {
      this.selectedDraftPanel.hero = this.selectedDraftPanel.pickedHero;
    }
    this.allyDraftPanels.forEach((panel: DraftPanel) => {
      panel.percentage = "\xa0";
    });
    this.enemyDraftPanels.forEach((panel: DraftPanel) => {
      panel.percentage = "\xa0";
    });

    this.updateWinRate();
    return false;
  }

  updateWinRate(): void {
    // get hovered heroes
    let allyHeroes: Hero[] = [];
    this.allyDraftPanels.forEach((panel) => {
      if (panel.hero !== Hero.NONE) {
        allyHeroes.push(panel.hero);
      }
    });
    let enemyHeroes: Hero[] = [];
    this.enemyDraftPanels.forEach((panel) => {
      if (panel.hero !== Hero.NONE) {
        enemyHeroes.push(panel.hero);
      }
    });

    let winRate = this.draft.evaluate(allyHeroes, enemyHeroes)
    this.winRatePanel.setWinRate(winRate);
  }

  update(): void {
    this.updateWinRate();

    // get picked heroes
    let allyHeroes: Hero[] = [];
    this.allyDraftPanels.forEach((panel) => {
      if (panel.pickedHero !== Hero.NONE) {
        allyHeroes.push(panel.pickedHero);
      }
    });
    let enemyHeroes: Hero[] = [];
    this.enemyDraftPanels.forEach((panel) => {
      if (panel.pickedHero !== Hero.NONE) {
        enemyHeroes.push(panel.pickedHero);
      }
    });

    this.draft.suggest(allyHeroes, enemyHeroes, this.nSuggestions).then((heroes: Hero[]) => {
      for (let i = 0; i < this.allySuggestionPanels.length; ++i) {
        if (i < heroes.length) {
          this.allySuggestionPanels[i].hero = heroes[i];
        }
        else {
          this.allySuggestionPanels[i].hero = Hero.NONE;
        }
      }
    });

    this.draft.suggest(enemyHeroes, allyHeroes, this.nSuggestions).then((heroes: Hero[]) => {
      for (let i = 0; i < this.enemySuggestionPanels.length; ++i) {
        if (i < heroes.length) {
          this.enemySuggestionPanels[i].hero = heroes[i];
        }
        else {
          this.enemySuggestionPanels[i].hero = Hero.NONE;
        }
      }
    });
  }

  ngOnInit() {
    this.heroGrid.setOnClickAction((hero: Hero) => this.pick(hero));
    this.heroGrid.setOnHoverActions((hero: Hero) => this.hover(hero), (hero: Hero) => this.hoverEnd(hero));
  }
}
