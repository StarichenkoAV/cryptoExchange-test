import { FC, useLayoutEffect, useState } from "react";
import css from "./MainPage.module.scss";
import { useAppDispatch } from "../../../store";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { ExchangeInput } from "../../common/ExchangeInput";

import { getAvailableCurrencies, getExchangeData, getPairTicketCoins } from "../../../store/exchangeSlice";
import { Icon } from "../../common/Icon";

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const [ethAddress, setEthAddress] = useState<string>("");
  
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
        <ExchangeInput />
        <img src="swap.svg" alt="reverse" width="20" height="20" />
        <ExchangeInput />
      </div>
      <div className={css.submitBlock}>
        {/* <h3 className={css.ExchangePageTitleAdress}>Your Ethereum address</h3> */}
        <Input value={ethAddress} onChangeValue={(v) => setEthAddress(v)} />
        <Button onClick={(v) => setEthAddress("")}>EXCANGE</Button>
      </div>
    </div>
  );
};
