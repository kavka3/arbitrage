import { Component, OnInit } from '@angular/core';
import { TickerService } from '../_services/ticker.service';

import { _ } from 'underscore';

@Component({
  selector: 'app-tickers',
  templateUrl: './tickers.component.html',
  styleUrls: ['./tickers.component.css']
})
export class TickersComponent implements OnInit {
  tickers: String[];

  constructor(private tickerService: TickerService) { }

  ngOnInit() {
    this.getTickers();
  }

  getTickers(): void {
    this.tickerService.getTickers()
      .subscribe(tickers => {

        let binance = tickers.filter(function (el) {
          return el.exchange == "binance";
        }).map(item => item.symbol);

        let bittrex = tickers.filter(function (el) {
          return el.exchange == "bittrex";
        }).map(item => item.symbol);

        let poloniex = tickers.filter(function (el) {
          return el.exchange == "poloniex";
        }).map(item => item.symbol);

        this.tickers = _.intersection(binance, bittrex, poloniex).sort(function (a, b) { return (a > b) ? 1 : ((b > a) ? -1 : 0); });

      });
  }

}
