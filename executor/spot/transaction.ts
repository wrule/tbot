
export
interface ITransaction {
  request_time: number;
  transaction_time: number;
  response_time: number;
  expected_price: number;
  price: number;
  in_name: string;
  expected_in_amount: number;
  in_amount: number;
  out_name: string;
  out_amount: number;
}
