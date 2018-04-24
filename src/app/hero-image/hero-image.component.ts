import { Component, OnInit, Input } from '@angular/core';

import { Hero } from '../hero'

@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.css']
})
export class HeroImageComponent implements OnInit {
  @Input() hero: Hero;

  constructor() {
    
  }

  ngOnInit() {
  }
}
