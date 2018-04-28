import { Injectable } from '@angular/core';
import { ColorScaleService } from './color-scale.service';

declare var google: any;

@Injectable()
export class ChartService {

  constructor(
    private colorScaleService: ColorScaleService
  ) {
    if (typeof(google) !== "undefined") {
      google.charts.load('current', {'packages':['corechart', 'line', 'bar']});
    }
  }

  public buildWinRateChart(elementId: string, title: string, labels: string[], winRates: number[]) {
    if (typeof(google) === "undefined") return;

    var paletteBackground = window.getComputedStyle(document.documentElement).getPropertyValue("--palette_background").trim();
    var paletteForeground = window.getComputedStyle(document.documentElement).getPropertyValue("--palette_foreground").trim();
    
    var options = {
      legend: 'none',
      backgroundColor: 'transparent',
      chartArea: {
        left: "30",
        width: "100%",
        height: "80%",
      },
      vAxis: {
        format: 'percent',
        gridlines: {
          color: paletteBackground,
        },
        textStyle: {
          color: paletteForeground,
        },
        viewWindowMode: "explicit",
        viewWindow: {
          min: 0.4,
          max: 0.6,
        },
      },
      hAxis: {
        textStyle: {
          color: paletteForeground,
        },
        maxAlternation: 1,
        slantedText: false,
        showTextEvery: 1,
      },
      tooltip: {
        trigger: 'none',
      },
      annotations: {
        alwaysOutside: true,
        textStyle: {
          fontSize: 14,
        },
      },
    }

    google.charts.setOnLoadCallback(() => {
      var datatable = new google.visualization.DataTable();
      datatable.addColumn("string", title);
      datatable.addColumn("number", "Win Rate");
      datatable.addColumn({"type": "string", "role": "style" });
      datatable.addColumn({"type": "number", "role": "annotation" });
      for (var i = 0; i < 5; ++i) {
        var tooltip = '<div>' + labels[i] + '</div>';
        datatable.addRow([labels[i], Math.max(0.399, Math.min(0.601, winRates[i])), this.colorScaleService.calcColor(winRates[i], 0.4, 0.6), winRates[i]]);
      }
      
      var formatter = new google.visualization.NumberFormat({
        pattern: '##.#%'
      });
      formatter.format(datatable, 3);

      var container = document.getElementById(elementId);
      var chart = new google.visualization.ColumnChart(container);
      chart.draw(datatable, options);
    });   
  }
}
