import { FC, useState } from "react";
import css from "./ExchangeInput.module.scss";
import { Select } from "../Select";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IOption } from "../../../types/IOption";
import { EInputTypes } from "../../../types/EInputTypes";
import { useGetExchangeData } from "../../../hooks/useGetExchangeData";

export interface IExchangeInputProps {
  inputType: EInputTypes;
}

export const ExchangeInput: FC<IExchangeInputProps> = ({ inputType }) => {
  const [value, setValue] = useState<string>("");
  const {
    setCurrencyFrom,
    setCurrencyTo,
    setAmountForExchange,
    setAmountResult,
    amountForExchange,
    currencyFrom,
    currencyTo,
  } = useGetExchangeData();
  const availableCurrencies = useAppSelector(
    (state) => state.exchange.availableCurrencies
  );

  const totalAmount = useAppSelector((state) => state.exchange.resExchange);

  const handleSelect = (option: string): void => {
    setValue(option);
    /* в зависимости от типа изменяемого инптуа меняем тип валюты 
      для апи запроса
    */
    if (inputType === EInputTypes.INPUT_FROM) {
      setCurrencyFrom(option);
    } else if (inputType === EInputTypes.INPUT_TO) {
      setCurrencyTo(option);
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    /* для левого инпута меняем данные для 
      при запроса
    */
    if (inputType === EInputTypes.INPUT_FROM) {
      setAmountForExchange(event.target.value);
      /* в правый инпут выводим ответ из апи, который
      хранится в сторе
    */
    } else if (inputType === EInputTypes.INPUT_TO) {
      setAmountResult(totalAmount);
    }
  };

  const inputValue =
    inputType === EInputTypes.INPUT_FROM ? amountForExchange : totalAmount;

  const options: Array<IOption> = availableCurrencies.map((currency) => ({
    name: currency.name,
    image: currency.image,
    ticker: currency.ticker,
  }));

  const selected =
    options.find((item) => item.ticker === value) ||
    inputType === EInputTypes.INPUT_FROM
      ? options.find((item) => item.ticker === currencyFrom)
      : options.find((item) => item.ticker === currencyTo);

  const selectProps = {
    options,
    selected,
    onChange: handleSelect,
  };

  return (
    <div className={css.component}>
      <input
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
