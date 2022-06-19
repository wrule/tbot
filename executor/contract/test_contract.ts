import { Side } from '../../struct/common';
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
  private fee_multiplier!: number;
  private transactions!: ITransaction[];

  private get funds() {
    return this.deposit * this.lever;
  }



  public Open(
    side: Side,
    in_asset: number,
    price?: number,
    time?: number,
  ) {
    const fee = in_asset * this.fee;
    if (in_asset <= this.funds && this.deposit > fee) {

    }
    return null;
  }

  public Reset() {
    this.deposit = this.init_deposit;
    this.fee_multiplier = 1 - this.fee;
    this.transactions = [];
  }
}
