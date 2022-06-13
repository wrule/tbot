
export
interface IOHLCV {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  confirmed?: boolean;
}

export
type KLine = IOHLCV[];
