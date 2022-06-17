import { ITransaction } from './transaction';

export
type A = (ITransaction | null);

export
type B = (Promise<A> | A);

export
interface ISpotExecutor {
  Buy(
    in_asset: number,
    price?: number,
    time?: number,
  ): B;

  BuyAll(
    price?: number,
    time?: number,
  ): B;

  Sell(
    in_asset: number,
    price?: number,
    time?: number,
  ): B;

  SellAll(
    price?: number,
    time?: number,
  ): B;
}
