import { FC, useEffect, useLayoutEffect, useState } from "react";
import css from "./MainPage.module.scss";
import { useAppDispatch } from "../../../store";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { ExchangeInput } from "../../common/ExchangeInput";
import swap from "../../../assets/img/swap.svg";

import { getAvailableCurrencies } from "../../../store/exchangeSlice";
import { useGetExchangeData } from "../../common/ExchangeInput/useGetExchangeData";
import {
  getEstimatedExchangeAmount,
  getMinimalExchangeAmount,
} from "../../../api/apiExchange";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Preloader } from "../../common/Preloader";

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const [ethAddress, setEthAddress] = useState<string>("");

  // const error = useAppSelector(
  //   (state) => state.exchange.error
  // );

  const {
    setCurrencyFrom,
    setCurrencyTo,
    setAmountForExchange,
    setAmountResult,
    setIsShowError,
    amountForExchange,
    amountResult,
    isShowError,
    error,
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
        />
        {/* <Preloader /> */}
        <img className={css.swapBtn} src={swap} alt="swap button" />
        <ExchangeInput
          setInput={setAmountResult}
          inputValue={amountResult}
          setCurrency={setCurrencyTo}
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
