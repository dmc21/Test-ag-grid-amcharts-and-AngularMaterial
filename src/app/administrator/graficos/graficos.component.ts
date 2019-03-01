import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from '../../../../node_modules/@amcharts/amcharts4/core';
import * as am4charts from '../../../../node_modules/@amcharts/amcharts4/charts';
import am4themes_animated from '../../../../node_modules/@amcharts/amcharts4/themes/animated';
import { HttpService } from '../../http.service';
am4core.useTheme(am4themes_animated);

export interface Graficos {
  id: number;
  name: string;
  value: number;
  fecha: Date;
}

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {
  title = 'AMaterial';

  private chart: am4charts.XYChart;

constructor(private zone: NgZone, private serviceGraf: HttpService) {}

ngOnInit() {

}

    getAll() {
      this.serviceGraf.getAll().subscribe(e => {
        const chart = am4core.create('chartdiv', am4charts.XYChart);

        chart.paddingLeft = 20;
        chart.paddingRight = 20;

        const data = [];
        let visits = 10;

        let contador = 0;

          for (let i = 1; i < 367; i++) {
            visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

            if (contador < e.length) {
              data.push({ date: new Date(2018, 0, i), name: 'name' + i, value: e[contador].value });
              contador++;
            } else {
              data.push({ date: new Date(2018, 0, i), name: 'name' + i, value: 0 });
            }
          }

          chart.data = data;

          const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
          dateAxis.renderer.grid.template.location = 0;

          const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.tooltip.disabled = true;
          valueAxis.renderer.minWidth = 30;

          const series = chart.series.push(new am4charts.LineSeries());
          series.dataFields.dateX = 'date';
          series.dataFields.valueY = 'value';

          series.tooltipText = '{valueY.value}';
          chart.cursor = new am4charts.XYCursor();

          const scrollbarX = new am4charts.XYChartScrollbar();
          scrollbarX.series.push(series);
          chart.scrollbarX = scrollbarX;

          this.chart = chart;


      });
    }

// tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
        this.getAll();
      });

    }
    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
      this.zone.runOutsideAngular(() => {
        if (this.chart) {
          this.chart.dispose();
        }
      });
    }
}
