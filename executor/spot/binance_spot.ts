import { binance } from 'ccxt';
import { ISpotExecutor } from '.';
import fs from 'fs';

export
class BinanceSpot {
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
  ) {
    const order = await this.client.createMarketOrder(
      this.symbol,
      'buy',
      0,
      undefined,
      {
        quoteOrderQty: this.client.costToPrecision(this.symbol, in_assets),
      },
    );
    fs.writeFileSync('.tmp.json', JSON.stringify(order, null, 2));
    return order;
  }

  public async BuyAll() {
    const old_time = Number(new Date());
    const balance = await this.client.fetchBalance();
    console.log('耗时', Number(new Date()) - old_time);
    const free: number = balance[this.source_name].free;
    console.log(this.source_name, free);
    // return await this.Buy(free);
  }

  public async Sell(
    in_assets: number,
  ) {
    const order = await this.client.createMarketOrder(
      this.symbol,
      'sell',
      this.client.amountToPrecision(this.symbol, in_assets),
    );
    fs.writeFileSync('.tmp.json', JSON.stringify(order, null, 2));
    return order;
  }

  public async SellAll() {
    const balance = await this.client.fetchBalance();
    const free: number = balance[this.target_name].free;
    return await this.Sell(free);
  }
}
