
export
class SimSpot {
  public constructor(
    private readonly init_funds = 100,
    private readonly fee = 0.001,
    private readonly bill = false,
  ) {
    this.Reset();
  }

  private funds!: number;
  private assets!: number;
  private fee_multiplier!: number;
  private bills: [boolean, number, number, number][] = [];

  public Buy(
    in_funds: number,
    price: number,
  ) {
    if (in_funds <= this.funds) {
      this.funds -= in_funds;
      const out_assets = in_funds / price * this.fee_multiplier;
      this.assets += out_assets;
      return [in_funds, out_assets, price];
    }
    return [0, 0, price];
  }

  public Sell(
    in_assets: number,
    price: number,
  ) {
    if (in_assets <= this.assets) {
      this.assets -= in_assets;
      const out_funds = in_assets * price * this.fee_multiplier;
      this.funds += out_funds;
      return [in_assets, out_funds, price];
    }
    return [0, 0, price];
  }

  public Reset() {
    this.funds = this.init_funds;
    this.assets = 0;
    this.fee_multiplier = 1 - this.fee;
  }
}
