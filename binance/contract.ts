import { binance } from 'ccxt';
import { Direction, Side } from '../struct/common';

export
class Contract {
  public constructor(
    private readonly client: binance,
  ) { }

  public async Open(
    symbol: string,
    direction: Direction,
    amount: number,
  ) {
    return await this.client.createOrder(
      symbol,
      'MARKET',
      { 'LONG': 'buy', 'SHORT': 'sell', }[direction] as Side,
      amount,
      undefined,
      { positionSide: direction, },
    );
  }

  public async Close(
    symbol: string,
    direction: Direction,
    amount: number,
  ) {
    return await this.client.createOrder(
      symbol,
      'MARKET',
      { 'LONG': 'sell', 'SHORT': 'buy', }[direction] as Side,
      amount,
      undefined,
      { positionSide: direction, },
    );
  }
}
