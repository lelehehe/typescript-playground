// export enum ExpenseCodeTypes {
//   CreditCard = 12,
//   Mortgage = 10,
// }
export enum TradeLineTypes {
  Education = "education",
  Mortgage = "mortgage",
  Other = "other",
}
export interface TradeLine {
  date?: string;
  code?: number;
  subcode?: number;
  type?: TradeLineTypes;
  monthly_payment: number;
  current_balance?: number;
}

export interface Expense {
  fixed_expenses_before_education: number;
  tradeLines: TradeLine[];
}
