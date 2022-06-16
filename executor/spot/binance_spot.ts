import { binance } from 'ccxt';
import { ISpotExecutor } from '.';
import fs from 'fs';

export
class BinanceSpot {
  public constructor(
    private readonly symbol: string,
    private readonly client: binance,
  ) {
    this.target_name = this.symbol.split('/')[0];
    this.source_name = this.symbol.split('/')[1];
  }

  private target_name!: string;
  private source_name!: string;

  public async Buy(
    in_assets: number,
    price: number,
    time: number = Number(new Date()),
  ) {
    const order = await this.client.createMarketOrder(
      this.symbol,
      'buy',
      0,
      undefined,
      {
        quoteOrderQty: in_assets,
      },
    );
    fs.writeFileSync('.tmp.json', JSON.stringify(order, null, 2));
    return order;
  }

  public async BuyAll(
    price: number,
    time: number,
  ) {
    const old_time = Number(new Date());
    const balance = await this.client.fetchBalance();
    console.log(Number(new Date()) - old_time);
    console.log(balance[this.source_name].free);
    fs.writeFileSync('.tmp.json', JSON.stringify(balance, null, 2));
    return null;
  }

  public async Sell(
    in_assets: number,
    price: number,
    time: number,
  ) {
    const order = await this.client.createMarketOrder(
      this.symbol,
      'sell',
      in_assets,
    );
    fs.writeFileSync('.tmp.json', JSON.stringify(order, null, 2));
    return order;
  }

  public SellAll(
    price: number,
    time: number,
  ) {
    return null;
  }
}
