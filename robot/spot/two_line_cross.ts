import { SpotRobot } from '.';
import { IOHLCV } from '../../struct/ohlcv';

export
class TwoLineCross
extends SpotRobot {
  private check_time = -1;

  public Check(
    prev_fast: number,
    prev_slow: number,
    last_fast: number,
    last_slow: number,
    ohlcv: IOHLCV,
  ) {
    if ( // 金叉检测
      (prev_fast <= prev_slow) &&
      (last_fast > last_slow)
    ) {
      if (this.check_time !== ohlcv.time) {
        this.check_time = ohlcv.time;
        this.executor.BuyAll(ohlcv.close, ohlcv.time);
      }
    }
    else if ( // 死叉检测
      (prev_fast >= prev_slow) &&
      (last_fast < last_slow)
    ) {
      if (this.check_time !== ohlcv.time) {
        this.check_time = ohlcv.time;
        this.executor.SellAll(ohlcv.close, ohlcv.time);
      }
    }
  }
}
