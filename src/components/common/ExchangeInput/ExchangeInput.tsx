import { FC } from "react";
import css from "./ExchangeInput.module.scss";
import { Select } from "../Select";
import { Input } from "../Input";

export const ExchangeInput: FC = () => {
  // selected: IOption | null;
  // options: IOption[];
  // placeholder?: string;
  // // mode?: 'rows' | 'cells';
  // onChange?: (selected: IOption['value']) => void;
  // onClose?: () => void;

  const options = [
    { title: "янв", value: "01" },
    { title: "фев", value: "02" },
    { title: "мар", value: "03" },
    { title: "апр", value: "04" },
    { title: "май", value: "05" },
    { title: "июн", value: "06" },
    { title: "июл", value: "07" },
    { title: "авг", value: "08" },
    { title: "сен", value: "09" },
    { title: "окт", value: "10" },
    { title: "ноя", value: "11" },
    { title: "дек", value: "12" },
  ];

  const selectProps = {
    options,
    placeholder: `Seatch`,
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
