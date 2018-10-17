import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TickersComponent } from './tickers/tickers.component'
import { TickerComponent } from './ticker/ticker.component';


const routes: Routes = [

  { path: '', redirectTo: '/tickers', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ticker/:symbol', component: TickerComponent },
  { path: 'tickers', component: TickersComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }