
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

export
function ArrayToOHLCV(
  array: number[],
  confirmed?: boolean,
) {
  return {
    time: array[0],
    open: array[1],
    high: array[2],
    low: array[3],
    close: array[4],
    volume: array[5],
    confirmed,
  } as IOHLCV;
}
