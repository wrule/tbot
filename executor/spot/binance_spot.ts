import { binance } from 'ccxt';
import { ISpotExecutor } from '.';

export
class BinanceSpot
implements ISpotExecutor {
  public constructor(
    private readonly client: binance,
  ) { }

  public Buy(
    in_assets: number,
    price: number,
    time: number,
  ) {
    return null;
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
