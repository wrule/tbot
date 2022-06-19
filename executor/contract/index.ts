import { Side } from '../../struct/common';
import { ReturnTransactionAS } from '../spot';

export
interface IContractExecutor {
  Open(
    side: Side,
    in_asset: number,
    price?: number,
    time?: number,
  ): ReturnTransactionAS;

  OpenAll(
    side: Side,
    price?: number,
    time?: number,
  ): ReturnTransactionAS;

  Close(
    side: Side,
    in_asset: number,
    price?: number,
    time?: number,
  ): ReturnTransactionAS;

  CloseAll(
    side: Side,
    price?: number,
    time?: number,
  ): ReturnTransactionAS;
}
