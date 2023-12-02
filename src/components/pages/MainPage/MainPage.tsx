import { FC, useState } from "react";
import css from "./MainPage.module.scss";
// import { useAppDispatch } from "../../../store";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { ExchangeInput } from "../../common/ExchangeInput";

export const MainPage: FC = () => {
  // const dispatch = useAppDispatch();
  const [ethAddress, setEthAddress] = useState<string>("");

  return (
    <div className={css.component}>
      <h1 className={css.title}>Crypto Exchange</h1>
      <h3 className={css.motto}>Exchange fast and easy</h3>
      <div className={css.inputBlocks}>
        <ExchangeInput />
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
