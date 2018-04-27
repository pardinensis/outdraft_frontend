import { Injectable } from '@angular/core';

@Injectable()
export class ColorScaleService {

  constructor() { }

  private toHex(n: number): string {
    var hex = n.toString(16);
    while (hex.length < 2) {hex = "0" + hex; }
    return hex;
  }
  
  private toHexString(red: number, green: number, blue: number): string {
    var r = this.toHex(red);
    var g = this.toHex(green);
    var b = this.toHex(blue);
    return "#" +  r + g + b;
  }

  public calcColor(value: number, bad: number, good: number) {
    let alpha = Math.max(0, Math.min(1, (value - bad) / (good - bad)));
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
    
    return this.toHexString(Math.floor(red), Math.floor(green), Math.floor(blue));
  }
}
