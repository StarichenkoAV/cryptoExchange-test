import { FC, useLayoutEffect, useState } from "react";
import css from "./MainPage.module.scss";
import { useAppDispatch } from "../../../store";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { ExchangeInput } from "../../common/ExchangeInput";
import { EInputTypes } from "../../../types/EInputTypes";

import { getAvailableCurrencies } from "../../../store/exchangeSlice";

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const [ethAddress, setEthAddress] = useState<string>("");

  const label = `Your Ethereum address`
  
  /* подгружаем в Стор массив доступных валют для отображения в компоненте Селекта */
  useLayoutEffect(() => {
    dispatch(getAvailableCurrencies());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className={css.component}>
      <h1 className={css.title}>Crypto Exchange</h1>
      <h3 className={css.motto}>Exchange fast and easy</h3>
      <div className={css.inputBlocks}>
        <ExchangeInput inputType={EInputTypes.INPUT_FROM} />
        <img src="swap.svg" alt="reverse" width="20" height="20" />
        <ExchangeInput inputType={EInputTypes.INPUT_TO}/>
      </div>
      <div className={css.submitBlock}>
        <Input label={label} value={ethAddress} onChangeValue={(v) => setEthAddress(v)} />
        <Button onClick={(v) => setEthAddress("")}>EXCANGE</Button>
      </div>
    </div>
  );
};
