import { Injectable } from '@angular/core';
import { ColorScaleService } from './color-scale.service';
import { HeroService } from './hero.service';

declare var google: any;

@Injectable()
export class ChartService {

  constructor(
    private colorScaleService: ColorScaleService,
    private heroService: HeroService,
  ) {
    if (typeof(google) !== "undefined") {
      google.charts.load('current', {'packages':['corechart', 'line', 'bar']});
    }
  }

  public buildWinRateChart(elementId: string, title: string, labels: string[], winRates: number[], samples: number[]) {
    if (typeof(google) === "undefined") return;

    var paletteBackground = window.getComputedStyle(document.documentElement).getPropertyValue("--palette_dark_subtle").trim();
    var paletteForeground = window.getComputedStyle(document.documentElement).getPropertyValue("--palette_foreground").trim();

    const minSamplePercentage = 0.05;
    let totalSamples = 0;
    if (samples != null) {
      for (let i = 0; i < samples.length; ++i) {
        totalSamples += samples[i];
      }
    }
    
    var options = {
      legend: 'none',
      backgroundColor: 'transparent',
      width: 580,
      enableInteractivity: false,
      chartArea: {
        left: "30",
        width: "100%",
        height: "80%",
      },
      vAxis: {
        gridlines: {
          color: paletteBackground,
        },
        textStyle: {
          color: paletteForeground,
          fontSize: 12,
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
          fontSize: 12,
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
        highContrast: false,
        textStyle: {
          fontSize: 12,
          color: paletteForeground,
        }
      }
    }

    google.charts.setOnLoadCallback(() => {
      this.heroService.wait().then(() => {
        var datatable = new google.visualization.DataTable();
        datatable.addColumn("string", title);
        datatable.addColumn("number", "Win Rate");
        datatable.addColumn({"type": "string", "role": "annotation" });
        datatable.addColumn({"type": "string", "role": "style" });
        for (var i = 0; i < labels.length; ++i) {
          var tooltip = '<div>' + labels[i] + '</div>';
          let color = this.colorScaleService.calcColor(winRates[i], 0.4, 0.6);
          let annotationText = (winRates[i] * 100).toFixed(1) + "%";
          let row = [
            labels[i],
            Math.max(0.399, Math.min(0.601, winRates[i])),
          ];
          if (samples != null && samples[i] < minSamplePercentage * totalSamples) {
            row.push("(" + annotationText + ")");
            row.push("fill-opacity: 0.05; color: " + color);
          }
          else {
            row.push(annotationText);
            row.push(color);
          }
          datatable.addRow(row);
        }
        
        var formatter = new google.visualization.NumberFormat({
          pattern: '##.#%'
        });
        formatter.format(datatable, 3);

        var container = document.getElementById(elementId);
        var chart = new google.visualization.ColumnChart(container);
        chart.draw(datatable, options);
      });
    });   
  }
}
