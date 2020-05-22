import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import * as Mapboxgl from 'mapbox-gl';
import {GetlayerService} from '../../services/get_layer.service';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {

  constructor( private getlayerService: GetlayerService) {
    this.loadData();
   }

  mapa: Mapboxgl.Map;

  ngOnInit() {
    

    Mapboxgl.accessToken = environment.mapboxkey;

    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.08699035644531,
        4.742043976363009], // LNG,LAT
      zoom: 9 // starting zoom
      });


  }

  loadData() {
    this.getlayerService.get('commerces/layer').subscribe(res => {
      if (res !== null) {
        const data = <Array<any>>res;
        const numberlocate = data['features'].length;
        for (let i = 0; i < numberlocate; i ++) {
          const geolocate = data['features'][i]['geometry']['coordinates'];
          this.marcador(geolocate[0],
            geolocate[1]);

        }
        }
    });

  }

  marcador(lng: number, lat: number) {
    let marker = new Mapboxgl.Marker({
      draggable: false
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
    }

}
