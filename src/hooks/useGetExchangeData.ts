import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../store";
import { getExchangeData, getPairTicketCoins } from "../store/exchangeSlice";

export interface IUseGetExchangeDataResult {
  setCurrencyFrom: (currencyFrom: string) => void,
  setCurrencyTo: (currencyTo: string) => void,
  setAmountForExchange: (amountToExchange: string) => void,
  setAmountResult: (amountResult: string) => void,
  amountForExchange: string,
  amountResult: string;
  currencyFrom: string,
  currencyTo: string,
}

export const useGetExchangeData = (): IUseGetExchangeDataResult => {
  const dispatch = useAppDispatch();

  const [currencyFrom, setCurrencyFrom] = useState<string>(`btc`);
  const [currencyTo, setCurrencyTo] = useState<string>(`eth`);
  const [amountForExchange, setAmountForExchange] = useState<string>(`100`);
  const  [amountResult, setAmountResult] = useState<string>(``)  

  /* при изменении валют или суммы к обмену отправляем запрос
    для получения актуальной итоговой суммы 
  */
  useEffect(() => {
    dispatch(getExchangeData({currencyFrom, currencyTo, amountForExchange }))
  }, [currencyFrom, currencyTo, amountForExchange, dispatch]);

 return  ({
  setCurrencyFrom,
  setCurrencyTo,
  setAmountForExchange,
  setAmountResult,
  amountForExchange,
  amountResult,
  currencyFrom,
  currencyTo,
 })
};
