import { binance } from 'ccxt';
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
    const a = ArrayToKLine(list);
    console.log(a[a.length - 1].time, a[a.length - 1].close);
  }, 1000);
}

main();
