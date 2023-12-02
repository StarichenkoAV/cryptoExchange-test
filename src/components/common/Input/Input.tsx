import {
  CSSProperties,
  ChangeEvent,
  FC,
  HTMLAttributes,
  forwardRef,
} from "react";
import css from "./Input.module.scss";
import cn from "classnames";
export interface IInputProp extends HTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  value: string;
  onChangeValue?: (value: string) => void;
  width?: string;
}

export const Input: FC<IInputProp> = forwardRef<HTMLInputElement, IInputProp>(
  (
    { disabled = false, onChangeValue, value = ``, width = ``, ...rest },
    inputRef
  ) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      event.preventDefault();
      event.stopPropagation();
      const value: string = event.target.value;      
      if (onChangeValue) {
        onChangeValue(value);
      }
    };

    const style: CSSProperties = {};

    if (width) style.width = width;

    return (
      <div
        className={cn(css.component, {
          [css.disabled]: disabled,
        })}
        style={style}
      >
        <input
          type="text"
          className={css.input}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          ref={inputRef}
        />
      </div>
    );
  }
);
