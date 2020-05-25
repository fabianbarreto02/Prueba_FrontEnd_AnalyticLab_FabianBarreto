import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import {GetlayerService} from '../../services/get_layer.service';



@Component({
  selector: 'app-graph-pie',
  templateUrl: './graph-pie.component.html',
  styleUrls: ['./graph-pie.component.css']
})
export class GraphPieComponent implements OnInit {
  // Variables para carga de label y datos del servicio
  label_get  = [];
  dataNumber = [];

  // Configuración de para metros de la grafica pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [null];
  public pieChartData: number[] = [null];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(245, 183, 177 ,1)', 'rgba(210, 180, 222, 1)', 'rgba(174, 214, 241 ,1)',
      'rgba(162, 217, 206,1)', 'rgba(171, 235, 198,1)', 'rgba(250, 215, 160 ,1)', 'rgba(237, 187, 153,1)'],
    },
  ];

  // Servicio para obtener la data del api
  constructor(private getdataService: GetlayerService) {
    // Metodo para carga de los datos
    this.loadData();

  }

  ngOnInit() {
  }

  // Metodo que utiliza el servicio del api para la información de los sales
  loadData() {
    this.getdataService.get('commerces/graph').subscribe(res => {
      if (res !== null) {
        const dataget = <Array<any>>res;
        const numbercomer = dataget.length;
        for (let i = 0; i < numbercomer; i ++) {
          this.label_get.push(dataget[i]['name']);
          this.dataNumber.push( parseInt(dataget[i]['sales']));

        }
        this.pieChartLabels = this.label_get;
        this.pieChartData = this.dataNumber;
        }
    });

  }
  // evenentos de la grafica
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }



}
