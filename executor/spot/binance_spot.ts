import { binance } from 'ccxt';
import { ISpotExecutor } from '.';
import fs from 'fs';
import { ITransaction } from './transaction';

export
class BinanceSpot
implements ISpotExecutor {
  public constructor(
    private readonly symbol: string,
    private readonly client: binance,
  ) {
    this.target_name = this.symbol.split('/')[0].trim();
    this.source_name = this.symbol.split('/')[1].trim();
  }

  private target_name!: string;
  private source_name!: string;

  public async Buy(
    in_assets: number,
    price: number,
  ) {
    const request_time = Number(new Date());
    const order = await this.client.createMarketOrder(
      this.symbol,
      'buy',
      0,
      undefined,
      {
        quoteOrderQty: this.client.costToPrecision(this.symbol, in_assets),
      },
    );
    const response_time = Number(new Date());
    const tn: ITransaction = {
      side: 'buy',
      request_time,
      transaction_time: order.timestamp,
      response_time,
      expected_price: price,
      price: order.price,
      in_name: this.source_name,
      expected_in_amount: in_assets,
      in_amount: order.cost,
      out_name: this.target_name,
      out_amount: order.amount - (order.fee.currency === this.target_name ? order.fee.cost : 0),
    };
    fs.writeFileSync('.tmp.json', JSON.stringify(order, null, 2));
    return tn;
  }

  public async BuyAll() {
    const old_time = Number(new Date());
    const balance = await this.client.fetchBalance();
    console.log('耗时', Number(new Date()) - old_time);
    const free: number = balance[this.source_name].free;
    console.log(this.source_name, free);
    return await this.Buy(free);
  }

  public async Sell(in_assets: number) {
    const order = await this.client.createMarketOrder(
      this.symbol,
      'sell',
      this.client.amountToPrecision(this.symbol, in_assets),
    );
    fs.writeFileSync('.tmp.json', JSON.stringify(order, null, 2));
    return null;
  }

  public async SellAll() {
    const balance = await this.client.fetchBalance();
    const free: number = balance[this.target_name].free;
    return await this.Sell(free);
  }
}
