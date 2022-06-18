import { binance } from 'ccxt';
import { BinanceSpot } from './executor/spot/binance_spot';
import secret from './.secret.json';
import { TwoLineCross } from './robot/spot/two_line_cross';

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

  const list = await client.fetchOHLCV('LINK/USDT', '1m', undefined, 500);
  console.log(list);

  // const a = await spot.Buy(12);
  // console.log(a);
  // const b = await spot.SellAll();
  // console.log(b);
}

main();
