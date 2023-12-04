import { useEffect, useState } from "react";
import {
  getEstimatedExchangeAmount,
  getMinimalExchangeAmount,
} from "../../../api/apiExchange";

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
}

export const useGetExchangeData = (): IUseGetExchangeDataResult => {

  const [currencyFrom, setCurrencyFrom] = useState<string>(`btc`);
  const [currencyTo, setCurrencyTo] = useState<string>(`btc`);
  const [amountForExchange, setAmountForExchange] = useState<string>(``);
  const [amountResult, setAmountResult] = useState<string>(``);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [minAmount, setMinAmount] = useState<string>(``);

  const errorHandler = (
    amount: string = ``
  ): void => {
    const message = amount
      ? `Введите сумму превышающюю ${amount}`
      : `this pair is disabled now`;
      setError(message);
      setIsShowError(true);
      setAmountResult("-");
  };

  const updateMinAmount = async () => {
    setIsShowError(false);
    let response;
    if (currencyFrom && currencyTo) {
      response = await getMinimalExchangeAmount(
        `${currencyFrom}_${currencyTo}`
      );
    } else return;
    if (!response) {
      errorHandler()
      return;
    } else {
      setMinAmount(response);
      setAmountForExchange(response);
    }
  };

  const updateTotalAmount = async () => {
    setIsShowError(false);
    if (minAmount && amountForExchange && +minAmount > +amountForExchange) {
      errorHandler(minAmount)
      return;
    }

    if (amountForExchange) {
      const response = await getEstimatedExchangeAmount({
        currencyFrom,
        currencyTo,
        amountForExchange,
      });
      if (!response) {
        errorHandler()
        return;
      } else {
        setAmountResult(response);
      }
    }
  };

  useEffect(() => {
    updateMinAmount();
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
  };
};
