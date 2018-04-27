import { Injectable } from '@angular/core';
import { ColorScaleService } from './color-scale.service';

declare var google: any;

@Injectable()
export class ChartService {

  constructor(
    private colorScaleService: ColorScaleService
  ) {
    google.charts.load('current', {'packages':['corechart']});
  }

  public buildWinRateChart(elementId: string, title: string, labels: string[], winRates: number[]) {
    var paletteBackground = window.getComputedStyle(document.documentElement).getPropertyValue("--palette_background").trim();
    var paletteForeground = window.getComputedStyle(document.documentElement).getPropertyValue("--palette_foreground").trim();
    
    var options = {
      title: title,
      titleTextStyle: {
        color: paletteForeground,
      },
      legend: 'none',
      backgroundColor: 'transparent',
      chartArea: {
        left: "30",
        width: "100%",
      },
      vAxis: {
        format: 'percent',
        gridlines: {
          color: paletteBackground
        },
        textStyle: {
          color: paletteForeground,
        },
      },
      hAxis: {
        textStyle: {
          color: paletteForeground,
        },
        maxAlternation: 1,
        slantedText: false,
        showTextEvery: 1,
      }
    }
    var data = [
      ["Farm Priority", "Win Rate", { role: 'style' }],
      [labels[0], winRates[0], this.colorScaleService.calcColor(winRates[0], 0.4, 0.6)],
      [labels[1], winRates[1], this.colorScaleService.calcColor(winRates[1], 0.4, 0.6)],
      [labels[2], winRates[2], this.colorScaleService.calcColor(winRates[2], 0.4, 0.6)],
      [labels[3], winRates[3], this.colorScaleService.calcColor(winRates[3], 0.4, 0.6)],
      [labels[4], winRates[4], this.colorScaleService.calcColor(winRates[4], 0.4, 0.6)]
    ];

    google.charts.setOnLoadCallback(() => {
      var datatable = google.visualization.arrayToDataTable(data);
      var container = document.getElementById(elementId);
      var chart = new google.visualization.ColumnChart(container);
      chart.draw(datatable, options);
    });   
  }
}
