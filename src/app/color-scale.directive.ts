import { Directive, ElementRef, Input } from '@angular/core';

import { ColorScaleService } from './color-scale.service';

@Directive({
  selector: '[colorScale]'
})
export class ColorScaleDirective {
  element: ElementRef;
  @Input() winRate: number;
  @Input() bad: number;
  @Input() good: number;

  constructor(
    private colorScaleService: ColorScaleService,
    element: ElementRef
  ) {
    this.element = element;
  }

  ngOnInit() {
    this.element.nativeElement.innerText = (this.winRate * 100).toFixed(1) + "%";
    this.element.nativeElement.style.color = this.colorScaleService.calcColor(this.winRate, this.bad, this.good);
 }
}
