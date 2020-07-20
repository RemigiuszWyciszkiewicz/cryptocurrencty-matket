export interface Transaction {
  _id: string;
  date: string;
  amount: number;
  price: number;
  cryptocurrency: string;
  type: TransactionType;
  value: number;
}

export enum TransactionType {
  SELL = 'sell',
  BUY = 'buy',
}
