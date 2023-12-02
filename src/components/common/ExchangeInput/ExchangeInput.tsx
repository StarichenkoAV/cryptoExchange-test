import { FC } from "react";
import css from "./ExchangeInput.module.scss";
import { Select } from "../Select";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IOption } from "../../../types/IOption";

export const ExchangeInput: FC = () => {
    
const availableCurrencies = useAppSelector((state) => state.exchange.availableCurrencies);

const options: Array<IOption> = availableCurrencies.map((currency) => ({
        name: currency.name,
        image: currency.image,
        ticker: currency.ticker,
}));

  const selectProps = {
    options,
    selected: options[0],
  };

  return (
    <div className={css.component}>
      <input className={css.input} />
      <div className={css.selectBlock}>
        <Select {...selectProps} />
      </div>
    </div>
  );
};
