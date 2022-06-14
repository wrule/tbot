import { binance } from 'ccxt';
import { Contract } from './binance/contract';
import secret from './.secret.json';

console.log('你好，世界');

async function main() {
  const client = new binance({
    apiKey: secret.API_KEY,
    secret: secret.SECRET_KEY,
    enableRateLimit: true,
    options: {
      defaultType: 'future',
      hedgeMode: true,
    },
  });
  const contract = new Contract(client);
  await contract.DisplayPositions();
  console.log('');
  await contract.Close('LINK/USDT', 'LONG', 2);
  await contract.DisplayPositions();
}

main();
