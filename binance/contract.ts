import { binance } from 'ccxt';
import { Direction, Side } from '../struct/common';
import fs from 'fs';

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

  public async GetPositions(symbol?: string) {
    let positions: any[] = [];
    if (symbol) {
      positions = await this.client.fapiPrivateGetPositionRisk({
        symbol: symbol.replace('/', ''),
      });
    } else {
      positions = await this.client.fetchPositions();
    }
    return positions.filter((position) => position.contracts > 0);
  }
}
