import { FC, useEffect, useLayoutEffect, useState } from "react";
import css from "./MainPage.module.scss";
import { useAppDispatch } from "../../../store";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { ExchangeInput } from "../../common/ExchangeInput";

import { getAvailableCurrencies } from "../../../store/exchangeSlice";
import { useGetExchangeData } from "../../common/ExchangeInput/useGetExchangeData";
import {
  getEstimatedExchangeAmount,
  getMinimalExchangeAmount,
} from "../../../api/apiExchange";
import { useAppSelector } from "../../../hooks/useAppSelector";

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const [ethAddress, setEthAddress] = useState<string>("");

  const [currencyFrom, setCurrencyFrom] = useState<string>(`btc`);
  const [currencyTo, setCurrencyTo] = useState<string>(`eth`);
  const [amountForExchange, setAmountForExchange] = useState<string>(``);
  const [amountResult, setAmountResult] = useState<string>(``);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [minAmount, setMinAmount] = useState<string>(``);

  // const error = useAppSelector(
  //   (state) => state.exchange.error
  // );

  /* подгружаем в Стор массив доступных валют для отображения в компоненте Селекта */
  useLayoutEffect(() => {
    dispatch(getAvailableCurrencies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateMinAmount = async () => {
    setIsShowError(false);
    const response = await getMinimalExchangeAmount(
      `${currencyFrom}_${currencyTo}`
    );
    if (!response) {
      setError(`this pair is disabled now`);
      setIsShowError(true);
      setAmountResult("-");
      return;
    } else {
      setMinAmount(response);
      setAmountForExchange(response);
    }
  };

  const updateTotalAmount = async () => {
    setIsShowError(false);
    if (+minAmount > +amountForExchange) {
      setError(`Введите сумму превышающюю ${minAmount}`);
      setIsShowError(true);
      setAmountResult("-");
      return;
    }
    const response = await getEstimatedExchangeAmount({
      currencyFrom,
      currencyTo,
      amountForExchange,
    });
    if (!response) {
      setError(`this pair is disabled now`);
      setAmountResult("");
      setIsShowError(true);
      return;
    } else {
      setAmountResult(response);
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

  const label = `Your Ethereum address`;

  return (
    <div className={css.component}>
      <h1 className={css.title}>Crypto Exchange</h1>
      <h3 className={css.motto}>Exchange fast and easy</h3>
      <div className={css.inputBlocks}>
        <ExchangeInput
          setInput={setAmountForExchange}
          inputValue={amountForExchange}
          setCurrency={setCurrencyFrom}
        />
        <img src="swap.svg" alt="reverse" width="20" height="20" />
        <ExchangeInput
          setInput={setAmountResult}
          inputValue={amountResult}
          setCurrency={setCurrencyTo}
        />
      </div>
      <div className={css.submitBlock}>
        <Input
          label={label}
          value={ethAddress}
          onChangeValue={(v) => setEthAddress(v)}
        />
        <Button onClick={(v) => setEthAddress("")}>EXCANGE</Button>
      </div>
      {/* {error && (
        <div className={css.error}>
          <span>{error}</span>
        </div>
      )} */}
      {isShowError && <div className={css.errorMinAmount}>{error}</div>}
    </div>
  );
};
