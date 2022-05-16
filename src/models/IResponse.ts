export interface IFinancialInfo {
  longName: string;
  country: string;
  logo_url: string;
  currentPrice: number;
  currency: string;
  fiftyDayAverage: number;
}

export interface IFinancialItem {
  netIncome: number;
}

export class IFinancialFinancials {
  financialItems: IFinancialItem[];
  sign: string = "Mil.";

  constructor(data: Record<number, Record<string, unknown>>) {
    if (!data) {
      this.financialItems = [];
    }
    this.financialItems = Object.keys(data).map((key) => {
      return {
        netIncome: data[key]["Net Income"] / 1000000,
      };
    });
  }
}

export interface IHistoryItem {
  open: number[];
  low: number[];
  high: number[];
}

export class IFinancialHistory {
  historyItems: IHistoryItem = {
    open: [],
    low: [],
    high: [],
  };
  sign: string = "Mil.";

  constructor(data: Record<number, Record<string, unknown>>) {
    if (!data) {
      return;
    }
    this.historyItems.open = this._getItems(data["Open"]);
    this.historyItems.low = this._getItems(data["Low"]);
    this.historyItems.high = this._getItems(data["High"]);
  }

  private _getItems = (
    data: Record<number, Record<string, unknown>>
  ): number[] => {
    return Object.keys(data).map((key) => {
      return data[key].toFixed(2);
    });
  };
}
