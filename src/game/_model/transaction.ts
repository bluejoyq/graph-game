export interface Transaction {
  type: 'buy' | 'sell';
  price: number;
  shares: number;
  date: string;
  profit?: number;
}
