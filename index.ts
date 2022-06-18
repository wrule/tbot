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
    const list = await client.fetchOHLCV('LINK/USDT', '1m', undefined, 10);
    const kline = ArrayToKLine(list).filter((item) => item.confirmed);
    const closes = kline.map((item) => item.close);
    tulind.indicators.sma.indicator(
      [closes],
      [3],
      (err: any, result: any) => {
        console.log(3, result[0]);
      },
    );
    tulind.indicators.sma.indicator(
      [closes],
      [8],
      (err: any, result: any) => {
        console.log(8, result[0]);
      },
    );
    console.log(Number(new Date()));
  }, 1000);
}

main();
