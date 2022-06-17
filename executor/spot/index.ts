import { ITransaction } from './transaction';

export
interface ISpotExecutor {
  Buy(
    in_asset: number,
    price?: number,
    time?: number,
  ): ITransaction | null;

  BuyAll(
    price?: number,
    time?: number,
  ): ITransaction | null;

  Sell(
    in_asset: number,
    price?: number,
    time?: number,
  ): ITransaction | null;

  SellAll(
    price?: number,
    time?: number,
  ): ITransaction | null;
}
