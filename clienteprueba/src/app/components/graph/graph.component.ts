import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { GetlayerService } from '../../services/get_layer.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  // Varibale para resivir los datos del servicio
  label_get = [];
  dataNumber = [];
  data_get = [];

  // Definición de los paremetros de la grafica
  public lineChartData: any[] = [{ data: null }];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left'
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        }
      ]
    }
  };

  public lineChartColors: Color[] = [{}];
  public lineChartLegend = true;
  public lineChartType = 'line';

  // Definición del servicio
  constructor(private getdataService: GetlayerService) {
    // Carga la data del servicio
    this.loadData();
  }

  ngOnInit() {}

  // Metodo para la carga de datos del sales con el servicion dado
  loadData() {
    this.getdataService.get('commerces/graph').subscribe(res => {
      if (res !== null) {
        const dataget = <Array<any>>res;
        const numbercomer = dataget.length;
        for (let i = 0; i < numbercomer; i++) {
          this.label_get.push(dataget[i]['name']);
          this.dataNumber.push(parseInt(dataget[i]['sales']));
        }
        this.lineChartData[0] = {
          data: this.dataNumber,
          label: 'Ventas por comercio'
        };
        this.lineChartLabels = this.label_get;
        this.lineChartColors = [
          {
            backgroundColor: 'rgba(170,201,232,0.2)',
            borderColor: 'rgba(48,132,217,1)',
            pointBackgroundColor: 'rgba(12,61,109,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(3,83,96,1)'
          }
        ];
      }
    });
  }

  // Evento para grafica
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
