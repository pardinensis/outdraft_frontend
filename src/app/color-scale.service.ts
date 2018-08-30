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
    
    let keyframes = [
      {alpha: 0.0, red: 150, green: 0, blue: 30},
      {alpha: 0.3, red: 200, green: 0, blue: 30},
      {alpha: 0.5, red: 200, green: 200, blue: 30},
      {alpha: 0.7, red: 0, green: 200, blue: 30},
      {alpha: 1.0, red: 0, green: 150, blue: 30}
    ];

    for (let i = 0; i < keyframes.length - 1; ++i) {
      let prev = keyframes[i];
      let next = keyframes[i + 1];
      if (alpha <= next.alpha) {
        let localAlpha = (alpha - prev.alpha) / (next.alpha - prev.alpha);
        red = (1 - localAlpha) * prev.red + localAlpha * next.red;
        green = (1 - localAlpha) * prev.green + localAlpha * next.green;
        blue = (1 - localAlpha) * prev.blue + localAlpha * next.blue;
        break;
      }
    }

    return this.toHexString(Math.floor(red), Math.floor(green), Math.floor(blue));
  }
}
