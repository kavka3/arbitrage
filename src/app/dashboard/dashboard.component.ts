import { Component, OnInit } from '@angular/core';
import { TickerService } from '../_services/ticker.service';

import { _ } from 'underscore';
import { Ticker } from '../_models/ticker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tickers: String[];
  maxDiffTicker: String;
  maxDiff: Number;
  all: Ticker[];
  arrayOfDiffs: any;

  constructor(private tickerService: TickerService) { }

  ngOnInit() {
    this.getTickers();
  }

  getTickers(): void {
    this.tickerService.getTickers()
      .subscribe(tickers => {


        this.all = tickers;

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

        this.maxDiff = 0;
        this.arrayOfDiffs = [];
        // let maxDiffTicker: Ticker;
        // console.log(tickers)
        for (let tickerSymbol of this.tickers) {
          console.log(tickerSymbol)
          let ticker = _.filter(tickers, function (tick) { return tickerSymbol == tick.symbol });

          // console.log(ticker)

          let tempMin = _.min(ticker, function (item) { return item.price; });
          let tempMax = _.max(ticker, function (item) { return item.price; });

          let diff = tempMax.price / tempMin.price - 1;

          this.arrayOfDiffs.push({
            symbol: tickerSymbol,
            diff: diff
          });

          this.arrayOfDiffs.sort(function (a, b) { return (a.diff > b.diff) ? -1 : ((b.diff > a.diff) ? 1 : 0); });

          // console.log(this.arrayOfDiffs);
          // if (diff > this.maxDiff) {
          //   this.maxDiff = diff;
          //   console.log(this.maxDiff);
          //   this.maxDiffTicker = tickerSymbol;
          // }
        }

        // console.log(this.arrayOfDiffs);

      });
  }

}
