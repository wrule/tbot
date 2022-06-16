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
  const spot = new BinanceSpot('LINK/USDT', client);
  // await spot.Buy(11, 0);
  await spot.BuyAll(0, 0);
}

main();
