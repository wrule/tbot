import { binance } from 'ccxt';
import { BinanceSpot } from './executor/spot/binance_spot';
import secret from './.secret.json';

console.log('你好，世界');

async function main() {
  const client = new binance({
    apiKey: secret.API_KEY,
    secret: secret.SECRET_KEY,
    enableRateLimit: true,
  });
  await client.loadMarkets();
  const spot = new BinanceSpot('LINK/USDT', client);
  const a = await spot.Buy(12);
  console.log(a);
  const b = await spot.SellAll();
  console.log(b);
}

main();
