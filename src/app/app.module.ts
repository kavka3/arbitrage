import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { TickersComponent } from './tickers/tickers.component';
import { HttpClientModule } from '@angular/common/http';
import { TickerComponent } from './ticker/ticker.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TickersComponent,
    TickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
