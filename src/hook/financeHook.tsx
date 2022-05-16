import React from "react";
import { baseFinanceUrl } from "../constants";
import { IFinancialFinancials, IFinancialHistory, IFinancialInfo } from "../models/IResponse";
import { useFinance } from "./contextHook";
import { useAxios } from "./requestHook";

export const useFinanceApi = () => {
  const API = useAxios();
  const { tick } = useFinance();


  const queryBuilder = React.useCallback((queries?: Record<string, unknown>) => {
    return { ticker: tick, ...queries };
  }, [tick]);

  const getFinancials = React.useCallback(async () => {
    const response = await API.get<Record<number, Record<string, unknown>>>(`${baseFinanceUrl}/financials`, { params: queryBuilder() });
    return new IFinancialFinancials(response.data);
  }, [API, queryBuilder]);

  const getInfo = React.useCallback(async () => {
    const response = await API.get<IFinancialInfo>(`${baseFinanceUrl}/info`, { params: queryBuilder() });
    return response.data;
  }, [API, queryBuilder]);

  const getHistory = React.useCallback( async (fromDate?: string, toDate?: string) => {
    const response = await API.get<Record<number, Record<string, unknown>>>(`${baseFinanceUrl}/history`, { params: queryBuilder({fromDate, toDate}) });
    return new IFinancialHistory(response.data);
  }, [API, queryBuilder]);

  return { getFinancials, getInfo, getHistory };
};

export const useCurrencySymbolHook = () => {
    const { currency } = useFinance();
    const getCurrencyValue = React.useCallback((value: number | string ) => {
        switch(currency.value) {
            case "USD":
                return `${currency.symbol}${value}`
            case "":
                return value    
            default: 
              return `${value}${currency.symbol}`   
        }
    }, [currency])
    
    return getCurrencyValue
}
