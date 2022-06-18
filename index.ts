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
  // await spot.Buy(10.678912345);
  await spot.Buy(12);
}

main();
