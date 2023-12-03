import { useCallback, useEffect, useState } from "react";
import {
  getEstimatedExchangeAmount,
  getMinimalExchangeAmount,
} from "../../../api/apiExchange";

export interface IUseGetExchangeDataResult {
  setCurrencyFrom: (currencyFrom: string) => void;
  setCurrencyTo: (currencyTo: string) => void;
  setAmountForExchange: (amountToExchange: string) => void;
  setAmountResult: (amountResult: string) => void;
  amountForExchange: string;
  amountResult: string;
  currencyFrom: string;
  currencyTo: string;
  reverseInput: () => void;
}

export const useGetExchangeData = (): IUseGetExchangeDataResult => {
  const [currencyFrom, setCurrencyFrom] = useState<string>(`btc`);
  const [currencyTo, setCurrencyTo] = useState<string>(`eth`);
  const [amountForExchange, setAmountForExchange] = useState<string>(`100`);
  const [amountResult, setAmountResult] = useState<string>(``);
  const [isShowError, setIsShowError] = useState<boolean>(false);

  // useEffect(() => {
  //   if (minAmount) {
  //     updateTotalAmount();
  //   }
  // }, [currencyFrom, currencyTo, amountForExchange]);

  const reverseInput = () => {
    setCurrencyFrom(currencyFrom);
    setCurrencyTo(currencyTo);
  };

  return {
    setCurrencyFrom,
    setCurrencyTo,
    setAmountForExchange,
    setAmountResult,
    amountForExchange,
    amountResult,
    currencyFrom,
    currencyTo,
    reverseInput,
  };
};
