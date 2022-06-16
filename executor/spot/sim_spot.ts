
export
class SimSpot {
  public constructor(
    private readonly init_funds = 100,
    private readonly fee = 0.001,
  ) {
    this.Reset();
  }

  private funds!: number;
  private assets!: number;
  private fee_multiplier!: number;

  public Buy(
    amount: number,
    price: number,
  ) {

  }

  public Sell(
    amount: number,
    price: number,
  ) {

  }

  public Reset() {
    this.funds = this.init_funds;
    this.assets = 0;
    this.fee_multiplier = 1 - this.fee;
  }
}
