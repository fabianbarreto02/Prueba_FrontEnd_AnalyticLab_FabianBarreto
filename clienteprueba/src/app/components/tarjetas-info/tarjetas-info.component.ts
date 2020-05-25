import { Component, OnInit } from '@angular/core';
import {GetlayerService} from '../../services/get_layer.service';

@Component({
  selector: 'app-tarjetas-info',
  templateUrl: './tarjetas-info.component.html',
  styleUrls: ['./tarjetas-info.component.css']
})
export class TarjetasInfoComponent implements OnInit {
  names = [];
  address = [];
  phones = [];
  schedules = [];
  days = [];

  constructor(private getdataService: GetlayerService) {
    this.loadData();
  }
  ngOnInit() {
  }

  loadData() {
    this.getdataService.get('commerces').subscribe(res => {
      if (res !== null) {
        const dataget = <Array<any>>res;
        const numbercomer = dataget.length;
        for (let i = 0; i < numbercomer; i ++) {
          this.names.push(dataget[i]['name']);
          this.address.push(dataget[i]['address']);
          this.phones.push(dataget[i]['phone']);
          this.schedules.push(dataget[i]['schedule']);
          this.days.push(dataget[i]['days']);

        }
        }
    });

  }

}
