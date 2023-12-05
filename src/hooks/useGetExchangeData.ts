import { useEffect, useState } from "react";
import {
  getEstimatedExchangeAmount,
  getMinimalExchangeAmount,
} from "../api/apiExchange";
export interface IUseGetExchangeDataResult {
  setCurrencyFrom: (currencyFrom: string) => void;
  setCurrencyTo: (currencyTo: string) => void;
  setAmountForExchange: (amountToExchange: string) => void;
  setAmountResult: (amountResult: string) => void;
  setIsShowError: (v: boolean) => void;
  setError: (error: string) => void;
  amountForExchange: string;
  amountResult: string;
  currencyFrom: string;
  currencyTo: string;
  isShowError: boolean;
  error: string;
  isLoading: boolean;
}

export const useGetExchangeData = (): IUseGetExchangeDataResult => {
  /* здесь храним тикеры валют */
  const [currencyFrom, setCurrencyFrom] = useState<string>(`btc`);
  const [currencyTo, setCurrencyTo] = useState<string>(`eth`);
  /* здесь храним значения из инпутов */
  const [amountForExchange, setAmountForExchange] = useState<string>(``);
  const [amountResult, setAmountResult] = useState<string>(``);
  /* обработка ошибок */
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [minAmount, setMinAmount] = useState<string>(``);

  const errorHandler = (amount: string = ``): void => {
    const message = amount
      ? `Введите сумму превышающюю ${amount}`
      : `this pair is disabled now`;
    setError(message);
    setIsShowError(true);
    setAmountResult("-");
    setIsLoading(false);
  };

  /* получаем и записываем минимально возможную сумму */
  const updateMinAmount = async () => {
    setIsShowError(false);
    setIsLoading(true);
    let response;
    if (currencyFrom && currencyTo) {
      const currencies = `${currencyFrom}_${currencyTo}`;
      response = await getMinimalExchangeAmount(currencies);
    } else {
      setIsLoading(false);
      return;
    }
    if (!response) {
      errorHandler();
      return;
    } else {
      setMinAmount(response);
      setAmountForExchange(response);
      setIsLoading(false);
    }
  };

  /* получаем и записываем итоговую сумму для правого инпута */
  const updateTotalAmount = async () => {
    setIsShowError(false);
    setIsLoading(true);
    if (minAmount && amountForExchange && +minAmount > +amountForExchange) {
      errorHandler(minAmount);
      return;
    }
    if (amountForExchange) {
      const response = await getEstimatedExchangeAmount({
        currencyFrom,
        currencyTo,
        amountForExchange,
      });
      if (!response) {
        errorHandler();
        return;
      } else {
        setAmountResult(response);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    updateMinAmount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyFrom, currencyTo]);

  useEffect(() => {
    updateTotalAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountForExchange]);

  return {
    setCurrencyFrom,
    setCurrencyTo,
    setAmountForExchange,
    setAmountResult,
    setIsShowError,
    setError,
    amountForExchange,
    amountResult,
    currencyFrom,
    currencyTo,
    isShowError,
    error,
    isLoading,
  };
};
