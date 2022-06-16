import { binance } from 'ccxt';
import { ISpotExecutor } from '.';
import fs from 'fs';

export
class BinanceSpot {
  public constructor(
    private readonly symbol: string,
    private readonly client: binance,
  ) { }

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

  public BuyAll(
    price: number,
    time: number,
  ) {
    return null;
  }

  public Sell(
    in_assets: number,
    price: number,
    time: number,
  ) {
    return null;
  }

  public SellAll(
    price: number,
    time: number,
  ) {
    return null;
  }
}
