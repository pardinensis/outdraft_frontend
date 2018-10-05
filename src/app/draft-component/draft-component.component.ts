import { Component, OnInit, ViewChild } from '@angular/core';

import { Hero } from '../hero';
import { HeroGridComponent } from '../hero-grid/hero-grid.component';

class DraftPanel {
  element: HTMLElement;
  hero: Hero;

  constructor(public id: number) {
    this.element = null;
    this.hero = Hero.NONE;
    setTimeout(() => {
      this.element = document.getElementById("draft-panel-" + id);
    });
  }

  addHighlight() {
    this.element.style.boxShadow = "0px 0px 6px white";
  }

  removeHighlight() {
    this.element.style.boxShadow = "none";
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

  constructor() {
    this.allyDraftPanels = [];
    this.enemyDraftPanels = [];
    this.draftPanels = [];
    for (let i = 0; i < 5; ++i) {
      this.allyDraftPanels[i] = new DraftPanel(i);
      this.enemyDraftPanels[i] = new DraftPanel(i + 5);

      this.draftPanels[i] = this.allyDraftPanels[i];
      this.draftPanels[i + 5] = this.enemyDraftPanels[i];
    }

    // this.draftPanels.forEach((panel) => panel.setDraftPanels(this.draftPanels));
  }

  select(panel: DraftPanel) {
    this.draftPanels.forEach((p) => p.removeHighlight());
    panel.addHighlight();
    this.selectedDraftPanel = panel;
  }

  pick(hero: Hero) {
    if (this.selectedDraftPanel !== null) {
      this.selectedDraftPanel.hero = hero;
    }
  }

  ngOnInit() {
    this.heroGrid.setOnClickAction((hero: Hero) => this.pick(hero));
  }
}
