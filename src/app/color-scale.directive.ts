import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[colorScale]'
})
export class ColorScaleDirective {
  element: ElementRef;
  @Input() winRate: number;
  @Input() bad: number;
  @Input() good: number;

  constructor(element: ElementRef) {
    this.element = element;
  }

  ngOnInit() {
    let alpha = Math.max(0, Math.min(1, (this.winRate - this.bad) / (this.good - this.bad)));
		let red, green, blue;
		if (alpha < 0.5) {
			red = 255;
			green = 2 * alpha * 255;
			blue = green;
		}
		else {
			red =  (2 - 2 * alpha) * 255;
			green = 255;
			blue = red;
		}

    this.element.nativeElement.innerText = (this.winRate * 100).toFixed(1) + "%";
    this.element.nativeElement.style.color = "rgb(" + Math.floor(red) + ", " + Math.floor(green) + ", " + Math.floor(blue) + ")";
 }
}
