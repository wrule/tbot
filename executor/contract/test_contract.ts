import { Direction, Side } from '../../struct/common';
import { ITransaction } from '../../struct/transaction';

export
class TestContract {
  public constructor(
    private readonly init_deposit = 100,
    private readonly lever = 20,
    private readonly fee = 0.0004,
    private readonly record_transaction = false,
    private readonly target_name = 'ASSET',
    private readonly source_name = 'MONEY',
  ) {
    this.Reset();
  }

  private deposit!: number;
  private funds!: number;
  private fee_multiplier!: number;
  private transactions!: ITransaction[];

  private assets = {
    'LONG': 0,
    'SHORT': 0,
  };

  private assets_funds = {
    'LONG': 0,
    'SHORT': 0,
  };

  public Check(price: number) {

  }

  public Open(
    direction: Direction,
    in_assets: number,
    price: number,
    time: number,
  ) {
    const fee = in_assets * this.fee;
    if (in_assets <= this.funds && this.deposit > fee) {
      this.funds -= in_assets;
      const out_assets = in_assets / price;
      this.assets[direction] += out_assets;
      this.assets_funds[direction] += in_assets;
      this.deposit -= fee;
    }
    return null;
  }

  public Close(
    direction: Direction,
    in_assets: number,
    price: number,
    time: number,
  ) {
    if (in_assets <= this.assets[direction]) {
      this.assets[direction] -= in_assets;
      const out_assets = in_assets * price;
      this.funds += out_assets;
      const fee = out_assets * this.fee;
      this.deposit -= fee;
      if (this.deposit < 0) {
        this.deposit = 0;
      }
    }
    return null;
  }

  public Reset() {
    this.deposit = this.init_deposit;
    this.funds = this.deposit * this.lever;
    this.fee_multiplier = 1 - this.fee;
    this.transactions = [];
  }
}
