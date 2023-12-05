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

export const Select: FC<ISelectProps> = ({
  options,
  selected,
  onChange,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
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

  const handleOpenButtonClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClearInputClick = () => {
    setSearchValue("");
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div
      className={cn(css.component, {
        [css.open]: isOpen,
      })}
      ref={rootRef}
    >
      <div
        className={cn(css.openButton, {
          [css.open]: isOpen,
        })}
        onClick={handleOpenButtonClick}
        role="button"
        tabIndex={0}
        title={selected?.ticker}
      >
        <div className={css.line}></div>
        <img src={selected?.image} alt={selected?.name} />
        <span>{selected?.ticker.toUpperCase()}</span>
        <Icon name="arrow-down" />
      </div>
      {isOpen && (
        <ul className={css.select}>
          <div className={css.searchInputBlock}>
            <input
              type="text"
              value={searchValue}
              onChange={onChangeSearchInput}
              className={css.input}
            />
            <div
              className={css.clear}
              role="button"
              onClick={handleClearInputClick}
            >
              <Icon name="clear" />
            </div>
          </div>
          {options
            .filter((v) =>
              v.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((option) => (
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
