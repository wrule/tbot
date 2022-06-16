
export
interface ITransaction {
  time: number;
  expected_price: number;
  price: number;
  in_name: string;
  expected_in_amount: number;
  in_amount: number;
  out_name: string;
  out_amount: number;
}
