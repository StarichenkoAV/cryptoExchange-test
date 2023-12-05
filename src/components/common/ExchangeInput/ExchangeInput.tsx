import { useAppSelector } from "../../../hooks/useAppSelector";
import { FC } from "react";
import { Select } from "../Select";
import { IOption } from "../../../types/IOption";
import { Input } from "../Input";
import css from "./ExchangeInput.module.scss";

export interface IExchangeInputProps {
  inputValue: string;
  setInput: (v: string) => void;
  setCurrency: (v: string) => void;
  readonlyInput?: boolean;
  currency: string;
}

export const ExchangeInput: FC<IExchangeInputProps> = ({
  inputValue,
  setInput,
  setCurrency,
  readonlyInput = false,
  currency,
}) => {
  const availableCurrencies = useAppSelector(
    (state) => state.exchange.availableCurrencies
  );

  const handleSelect = (option: string) => {
    setCurrency(option);
  };

  const options: Array<IOption> = availableCurrencies.map((currency) => ({
    name: currency.name,
    image: currency.image,
    ticker: currency.ticker,
  }));

  const selected =
    options.find((item) => item.ticker === currency) || options[0];

  const selectProps = {
    options,
    selected,
    onChange: handleSelect,
  };

  return (
    <div className={css.component}>
      <Input readOnly={readonlyInput} value={inputValue} onChangeValue={(v) => setInput(v)} />
      <div className={css.selectBlock}>
        <Select {...selectProps} />
      </div>
    </div>
  );
};
