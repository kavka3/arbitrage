import { Component, OnInit, Input } from '@angular/core';
import { TickerService } from '../_services/ticker.service';
import { ActivatedRoute } from '@angular/router';
import { Ticker } from '../_models/ticker';

import { _ } from 'underscore';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {
  @Input() ticker: Ticker[];
  // tickers: Ticker[];
  symbol: String;
  isValid: Boolean = false;
  min: Ticker;
  max: Ticker;
  loading: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tickerService: TickerService,
  ) { }

  ngOnInit() {
    this.isValid = false;
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.getTicker();
  }

  getTicker(): void {
    this.tickerService.getTicker(this.symbol)
      .subscribe(ticker => {

        this.loading = false;

        this.min = _.min(ticker, function (item) { return item.price; });
        this.max = _.max(ticker, function (item) { return item.price; });

        if (ticker) {
          // this.symbol = ticker[0].symbol;
          this.isValid = true;
        }
        this.ticker = ticker;
      });
  }

  // fetchData(): void {
  //   this.loading = true;
  //   this.tickerService.fetchData()
  //     .subscribe(ticker => {
  //       this.getTicker()
  //     });
  // }

}
