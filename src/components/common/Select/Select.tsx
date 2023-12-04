import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";

import { Option } from "./Option";
import { IOption } from "../../../types/IOption";
import { Icon } from "../Icon";

import css from "./Select.module.scss";
import cn from "classnames";

export interface ISelectProps {
  selected?: IOption;
  options: IOption[];
  onChange?: (selected: IOption["ticker"]) => void;
  onClose?: () => void;
}

export const Select: FC<ISelectProps> = ({ ...props }) => {
  const { options, selected, onChange, onClose  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && onClose?.();
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isOpen, onClose]);

  const handleOptionClick = (value: IOption["ticker"]) => {
    setIsOpen(false);
    onChange?.(value);
  };

  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={cn(css.component, {
        [css.open]: isOpen,
      })}
      ref={rootRef}
    >
      <div className={css.line}></div>
      <div
        className={cn(css.placeholder, {
          [css.open]: isOpen,
        })}
        onClick={handlePlaceHolderClick}
        role="button"
        tabIndex={0}
      >
        <img src={selected?.image} alt={selected?.name}/>
        <span>{selected?.ticker.toUpperCase()}</span>
        <Icon name="arrow-down"/>
      </div>
      {isOpen && (
        <ul className={css.select}>
          {options.map((option) => (
            <Option
              key={`currency-${option.ticker}`}
              option={option}
              onClick={handleOptionClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
