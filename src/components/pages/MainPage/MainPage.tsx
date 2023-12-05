import { FC, useLayoutEffect, useState } from "react";
import { useAppDispatch } from "../../../store";
import { useGetExchangeData } from "../../../hooks/useGetExchangeData";
import { getAvailableCurrencies } from "../../../store/exchangeSlice";

import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { ExchangeInput } from "../../common/ExchangeInput";
import { Preloader } from "../../common/Preloader";

import css from "./MainPage.module.scss";
import swap from "../../../assets/img/swap.svg";

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const [ethAddress, setEthAddress] = useState<string>("");

  const {
    setCurrencyFrom,
    setCurrencyTo,
    setAmountForExchange,
    setAmountResult,
    setIsShowError,
    amountForExchange,
    amountResult,
    currencyFrom,
    currencyTo,
    isShowError,
    error,
    isLoading,
  } = useGetExchangeData();

  /* подгружаем в Стор массив доступных валют для отображения в компоненте Селекта */
  useLayoutEffect(() => {
    setIsShowError(false);
    dispatch(getAvailableCurrencies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const label = `Your Ethereum address`;

  return (
    <div className={css.component}>
      <div className={css.title}>Crypto Exchange</div>
      <div className={css.smallTitle}>Exchange fast and easy</div>
      <div className={css.inputBlocks}>
        <ExchangeInput
          setInput={setAmountForExchange}
          inputValue={amountForExchange}
          setCurrency={setCurrencyFrom}
          currency={currencyFrom}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <img className={css.swapBtn} src={swap} alt="swap button" />
        )}
        <ExchangeInput
          setInput={setAmountResult}
          inputValue={amountResult}
          setCurrency={setCurrencyTo}
          currency={currencyTo}
          /*насколько я понял из ТЗ правый инпут не доступен для редактирования
            юзером, поэтому делаю его только для чтения
          */
          readonlyInput
        />
      </div>
      <div className={css.submitBlock}>
        <Input
          label={label}
          value={ethAddress}
          onChangeValue={(v) => setEthAddress(v)}
        />
        <div className={css.buttonBlock}>
          <Button onClick={(v) => setEthAddress("")}>EXCANGE</Button>
          {isShowError && <div className={css.error}>{error}</div>}
        </div>
      </div>
    </div>
  );
};
