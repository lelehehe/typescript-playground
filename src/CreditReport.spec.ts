import CreditReport from "./CreditReport";
import { TradeLine, TradeLineTypes } from "./CreditReport.model";
var deepEqual = require("deep-equal");

describe("CreditReport tests", () => {
  var sampleData: TradeLine[];
  beforeEach(() => {
    sampleData = [
      {
        date: "2015-10-10",
        code: 5,
        subcode: 1,
        monthly_payment: 43198,
        current_balance: 5102800,
      },
      {
        date: "2015-10-10",
        code: 10,
        subcode: 12,
        monthly_payment: 147031,
        current_balance: 65921800,
      },
      {
        date: "2015-10-09",
        code: 8,
        subcode: 15,
        monthly_payment: 34012,
        current_balance: 2122320,
      },
      {
        date: "2015-10-10",
        code: 10,
        subcode: 15,
        monthly_payment: 93012,
        current_balance: 12041300,
      },
      {
        date: "2015-10-09",
        code: 12,
        subcode: 5,
        monthly_payment: 15050,
        current_balance: 642121,
      },
    ];
  });
  it("should init data well", () => {
    let creditReport = new CreditReport([
      {
        date: "2015-10-10",
        code: 10,
        subcode: 12,
        monthly_payment: 147031,
        current_balance: 65921800,
      },
    ]);
    expect(creditReport.tradeLines[0].type).toBe(TradeLineTypes.Mortgage);
  });
  it("should handle HousingExpenses", () => {
    let report = new CreditReport(sampleData);
    let result = report.getHousingExpenses();
    expect(result).toBe(240043);
  });
  it("should handle NonHousingExpenses", () => {
    let report = new CreditReport(sampleData);
    let result = report.getNonHousingExpenses();
    expect(result).toBe(49062);
  });
  it("should handle houseExpense with mortgage timeline missing", () => {
    let report = new CreditReport([
      {
        date: "2015-10-10",
        code: 4,
        subcode: 1,
        monthly_payment: 147031,
        current_balance: 65921800,
      },
    ]);
    let result = report.getHousingExpenses();
    expect(result).toBe(report.defaultHouseExpense);
  });
  it("should handle getFixedExpensesBeforeEducation", () => {
    let report = new CreditReport(sampleData);
    let result = report.getFixedExpensesBeforeEducation();
    let expectedResult = {
      fixed_expenses_before_education: 289105,
      tradeLines: [
        {
          type: "education",
          monthly_payment: 43198,
          current_balance: 5102800,
        },
        {
          type: "mortgage",
          monthly_payment: 147031,
          current_balance: 65921800,
        },
        {
          type: "other",
          monthly_payment: 34012,
          current_balance: 2122320,
        },
        {
          type: "mortgage",
          monthly_payment: 93012,
          current_balance: 12041300,
        },
        {
          type: "other",
          monthly_payment: 15050,
          current_balance: 642121,
        },
      ],
    };
    expect(result.fixed_expenses_before_education).toBe(289105);
    expect(result.tradeLines.length).toBe(5);
    expect(deepEqual(result, expectedResult)).toBe(true);
  });
});
