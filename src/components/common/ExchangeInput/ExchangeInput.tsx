import { FC, useState } from "react";
import css from "./ExchangeInput.module.scss";
import { Select } from "../Select";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IOption } from "../../../types/IOption";

export interface IExchangeInputProps {
  inputValue: string;
  setInput: (v: string) => void;
  setCurrency: (v: string) => void;
  readonlyInput?: boolean;
}

export const ExchangeInput: FC<IExchangeInputProps> = ({
  inputValue,
  setInput,
  setCurrency,
  readonlyInput = false,
}) => {
  const [value, setValue] = useState<string>("");

  const availableCurrencies = useAppSelector(
    (state) => state.exchange.availableCurrencies
  );

  const handleSelect = (option: string) => {
    setValue(option);
    setCurrency(option);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const options: Array<IOption> = availableCurrencies.map((currency) => ({
    name: currency.name,
    image: currency.image,
    ticker: currency.ticker,
  }));

  const selected = options.find((item) => item.ticker === value) || options[0];

  const selectProps = {
    options,
    selected,
    onChange: handleSelect,
  };

  return (
    <div className={css.component}>
      <input
        type="text"
        readOnly={readonlyInput}
        value={inputValue}
        onChange={onChangeInput}
        className={css.input}
      />
      <div className={css.selectBlock}>
        <Select {...selectProps} />
      </div>
    </div>
  );
};
