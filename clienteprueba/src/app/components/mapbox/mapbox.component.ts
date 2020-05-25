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
  datasource: any;
  constructor( private getlayerService: GetlayerService) {
    this.loadData();
   }


  ngOnInit() {

    Mapboxgl.accessToken = environment.mapboxkey;
    const mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.08699035644531,
        4.742043976363009], // LNG,LAT
      zoom: 9.5 // starting zoom
      });

     
      
      mapa.on('load', () => {

  
        mapa.addSource('pointsSource', {
          type : 'geojson',
          data: this.datasource,
        });

        mapa.addLayer({
          id: 'points_data',
          source: 'pointsSource',
          type: 'circle',
          paint: {
            'circle-color': 'gray',
            'circle-radius': 10
          }
        });

            });
            mapa.on('click',e => {
              const result = mapa.queryRenderedFeatures(e.point, {layer: ['points_data']});
              if (result.length) {
                const popup = new Mapboxgl.Popup({closeButton: false});
                const id = result[0].layer.id;
                const content_name = result[0].properties.name;
                const content_address = result[0].properties.address;
                const id_data = result[0].properties.id;
                const nit = result[0].properties.nit;
                const phone = result[0].properties.phone;
                const owner = result[0].properties.owner;
                const days = result[0].properties.days;
                const schedule = result[0].properties.schedule;
                const sales = result[0].properties.sales;
                if (String(id) === 'points_data') {
                  popup.setLngLat(e.lngLat).setHTML(`<h6 style="text-align:center">Id: ${id_data}<br>NIT: ${nit}<br>Nombre: ${content_name}
                  <br>Dirección: ${content_address}<br>Telefono: ${phone}<br>Propietario: ${owner}<br>Dias: ${days}
                  <br>Horario: ${schedule}<br> Ventas: $${sales}<h6>`)
                  .addTo(mapa);
                }
              }
            });


  }

  loadData() {
    this.getlayerService.get('commerces/layer').subscribe(res => {
      if (res !== null) {
        const data = <Array<any>>res;
        this.datasource = data;
        }
    });

  }
}
