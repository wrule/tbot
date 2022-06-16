import { ITransaction } from './transaction';

export
class SimSpot {
  public constructor(
    private readonly init_funds = 100,
    private readonly fee = 0.001,
    private readonly bill = false,
    private readonly fund_name = 'MONEY',
    private readonly asset_name = 'ASSET',
  ) {
    this.Reset();
  }

  private funds!: number;
  private assets!: number;
  private fee_multiplier!: number;
  private bills: ITransaction[] = [];

  public Buy(
    in_funds: number,
    price: number,
    time: number,
  ) {
    if (in_funds <= this.funds) {
      this.funds -= in_funds;
      const out_assets = in_funds / price * this.fee_multiplier;
      this.assets += out_assets;
      const tn: ITransaction = {
        time,
        price,
        in_name: this.fund_name,
        in_amount: in_funds,
        out_name: this.asset_name,
        out_amount: out_assets,
      };
      return tn;
    }
    return null;
  }

  public Sell(
    in_assets: number,
    price: number,
    time: number,
  ) {
    if (in_assets <= this.assets) {
      this.assets -= in_assets;
      const out_funds = in_assets * price * this.fee_multiplier;
      this.funds += out_funds;
      const tn: ITransaction = {
        time,
        price,
        in_name: this.asset_name,
        in_amount: in_assets,
        out_name: this.fund_name,
        out_amount: out_funds,
      };
      return tn;
    }
    return null;
  }

  public Reset() {
    this.funds = this.init_funds;
    this.assets = 0;
    this.fee_multiplier = 1 - this.fee;
  }
}
