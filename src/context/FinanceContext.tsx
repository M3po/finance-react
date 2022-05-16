import React from "react";
import getSymbolFromCurrency from "currency-symbol-map";

const defaultTickValue = "TSLA";

interface ICurrency {
  value: string;
  symbol: string;
}

export const FinanceContext = React.createContext<{
  tick: string;
  currency: ICurrency;
  setTick: (value: string) => void;
  setCurrency: (value: string) => void;
}>({
  currency: {
    value: "",
    symbol: "",
  },
  tick: defaultTickValue,
  setTick: () => undefined,
  setCurrency: () => undefined,
});

FinanceContext.displayName = "FinanceContext";

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tick, setTick] = React.useState<string>(defaultTickValue);
  const [currency, setCurrency] = React.useState<ICurrency>({
    value: "",
    symbol: "",
  });

  const setCurrencySymbol = React.useCallback((currency: string) => {
    const symbol = getSymbolFromCurrency(currency);
    setCurrency({
      value: currency,
      symbol: symbol ? symbol : "",
    });
  }, []);

  const contextValue = {
    tick,
    currency,
    setTick: React.useCallback(
      (messagePayload: string) => setTick(messagePayload),
      []
    ),
    setCurrency: setCurrencySymbol,
  };

  return (
    <FinanceContext.Provider value={contextValue}>
      {children}
    </FinanceContext.Provider>
  );
};
