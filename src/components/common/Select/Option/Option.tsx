import { FC, MouseEventHandler } from "react";
import css from "../Select.module.scss";
import { IOption } from "../../../../types/IOption";

export interface IOptionProps {
  option: IOption;
  onClick: (value: IOption["value"]) => void;
}

export const Option: FC<IOptionProps> = (props) => {
  const {
    option: { value, title },
    onClick,
  } = props;

  const handleClick =
    (clickedValue: IOption["value"]): MouseEventHandler<HTMLLIElement> =>
    () => {
      onClick(clickedValue);
    };

  return (
    <li
      className={css.option}
      value={value}
      onClick={handleClick(value)}
      tabIndex={0}
    >
      <div>
        <img src={""} alt=""></img>
      </div>
        <span>{"ETH"}</span>
        <span>{"Ethetyum"}</span>
    </li>
  );
};
