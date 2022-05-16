import React from "react";
import { FinanceContext } from "../context/FinanceContext";
import { NotificationContext } from "../context/NotificationContext";

export const useMessage = () => {
  const { message, setMessage } = React.useContext(NotificationContext);
  return { message, setMessage };
};

export const useFinance = () => {
  const { tick, currency, setCurrency, setTick } = React.useContext(FinanceContext);
  return { tick, currency, setCurrency, setTick}
};
