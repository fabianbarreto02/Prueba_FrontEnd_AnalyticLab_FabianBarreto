import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { MapboxComponent } from './components/mapbox/mapbox.component';

import {GetlayerService} from './services/get_layer.service';
import { GraphComponent } from './components/graph/graph.component';
import { GraphPieComponent } from './components/graph-pie/graph-pie.component';
import { TarjetasInfoComponent } from './components/tarjetas-info/tarjetas-info.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    MapboxComponent,
    GraphComponent,
    GraphPieComponent,
    TarjetasInfoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    GetlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
