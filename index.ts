import { binance } from 'ccxt';
// import tulind from 'tulind';
const tulind = require('tulind');
import { BinanceSpot } from './executor/spot/binance_spot';
import secret from './.secret.json';
import { TwoLineCross } from './robot/spot/two_line_cross';
import { ArrayToKLine } from './struct/ohlcv';

console.log('你好，世界');

async function main() {
  const client = new binance({
    apiKey: secret.API_KEY,
    secret: secret.SECRET_KEY,
    enableRateLimit: true,
  });
  await client.loadMarkets();
  const executor = new BinanceSpot('LINK/USDT', client);
  const robot = new TwoLineCross(executor);

  setInterval(async () => {
    const list = await client.fetchOHLCV('LINK/USDT', '1m', undefined, 500);
    const kline = ArrayToKLine(list).filter((item) => item.confirmed);
    const closes = kline.map((item) => item.close);
    let fast_line: number[] = [];
    let slow_line: number[] = [];
    tulind.indicators.sma.indicator(
      [closes],
      [10],
      (err: any, result: any) => {
        fast_line = result[0];
      },
    );
    tulind.indicators.sma.indicator(
      [closes],
      [30],
      (err: any, result: any) => {
        slow_line = result[0];
      },
    );
    if (
      fast_line.length >= 2 &&
      slow_line.length >= 2 &&
      kline.length > 0
    ) {
      const
        prev_fast = fast_line[fast_line.length - 2],
        prev_slow = slow_line[slow_line.length - 2],
        last_fast = fast_line[fast_line.length - 1],
        last_slow = slow_line[slow_line.length - 1];
      const ohlcv = kline[kline.length - 1];
      robot.Check(
        prev_fast,
        prev_slow,
        last_fast,
        last_slow,
        ohlcv,
      );
    }
  }, 1000);
}

main();
