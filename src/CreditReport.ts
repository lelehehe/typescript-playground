import { timeline } from "console";
import { Expense, TradeLineTypes, TradeLine } from "./CreditReport.model";
export default class CreditReport {
  //the default value could be stored in a config file
  defaultHouseExpense: number = 106100;
  tradeLines: TradeLine[];
  /**
   * @param {TradeLine[]} tradeLines
   */
  constructor(tradeLines: TradeLine[]) {
    //note: will add validation later
    tradeLines.map((tradeLine) => {
      if (tradeLine.code === 10 && (tradeLine.subcode === 12 || tradeLine.subcode === 15))
        tradeLine.type = TradeLineTypes.Mortgage;
      else if (tradeLine.code === 5) tradeLine.type = TradeLineTypes.Education;
      else tradeLine.type = TradeLineTypes.Other;
    });
    this.tradeLines = tradeLines;
  }
  public getFixedExpensesBeforeEducation(): Expense {
    let fixed_expenses_before_education =
      this.getNonHousingExpenses() + this.getHousingExpenses();
    let tradeLines = this.tradeLines.map((tradeLine) => {
      delete tradeLine.date;
      delete tradeLine.code;
      delete tradeLine.subcode;
      return tradeLine;
    });

    return {
      fixed_expenses_before_education,
      tradeLines,
    };
  }

  getHousingExpenses(): number {
    let mortgage = this.tradeLines.reduce(
      (accu, cur) =>
        accu + (this.isHousingExpense(cur) ? cur.monthly_payment : 0),
      0
    );
    return mortgage || this.defaultHouseExpense;
  }
  getNonHousingExpenses(): number {
    return this.tradeLines.reduce(
      (accu, cur) =>
        (this.isNonHousingExpense(cur) ? cur.monthly_payment : 0) + accu,
      0
    );
  }

  private isHousingExpense(timeLine: TradeLine): boolean {
    return (
      timeLine.code === 10 &&
      (timeLine.subcode === 12 || timeLine.subcode === 15)
    );
  }
  private isNonHousingExpense(timeLine: TradeLine): boolean {
    return (
      (timeLine.code !== 10 ||
        (timeLine.subcode !== 12 && timeLine.subcode !== 15)) &&
      timeLine.code !== 5
    );
  }
}
