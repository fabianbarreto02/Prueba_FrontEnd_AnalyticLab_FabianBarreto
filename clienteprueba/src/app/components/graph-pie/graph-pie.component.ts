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
  label_get  = [];
  dataNumber = [];

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

  constructor(private getdataService: GetlayerService) {
    this.loadData();

  }

  ngOnInit() {
  }

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
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }



}
