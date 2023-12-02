import { FC, MouseEventHandler } from "react";
import css from "../Select.module.scss";
import { IOption } from "../../../../types/IOption";
import { Icon } from "../../Icon";

export interface IOptionProps {
  option: IOption;
  onClick: (value: IOption["ticker"]) => void;
}

export const Option: FC<IOptionProps> = (props) => {
  const {
    option: { image, name, ticker },
    onClick,
  } = props;

  const handleClick =
    (clickedValue: IOption["ticker"]): MouseEventHandler<HTMLLIElement> =>
    () => {
      onClick(clickedValue);
    };

    console.log(image);
    

  return (
    <li
      className={css.option}
      value={ticker}
      onClick={handleClick(ticker)}
      tabIndex={0}
    >
        <img src={image} alt={name}/>
        <span>{ticker.toUpperCase()}</span>
        <span>{name}</span>
    </li>
  );
};
