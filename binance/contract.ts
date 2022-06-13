import { binance } from 'ccxt';

export
class Contract {
  public constructor(
    private readonly client: binance,
  ) { }

  public async Open(symbol: string) {

  }

  public async Close() {

  }
}
