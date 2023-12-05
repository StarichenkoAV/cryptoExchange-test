import {
  CSSProperties,
  ChangeEvent,
  FC,
  HTMLAttributes,
} from "react";
import css from "./Input.module.scss";
import cn from "classnames";
export interface IInputProp extends HTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  readOnly?: boolean;
  value: string;
  onChangeValue?: (value: string) => void;
  width?: string;
  label?: string;
}

export const Input: FC<IInputProp> = 
  (
    {
      disabled = false,
      readOnly = false,
      onChangeValue,
      value = ``,
      width = ``,
      label = ``,
      ...rest
    },
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
        {Boolean(label) && (
          <label htmlFor={label}>
            {label}
          </label>
        )}
        <input
          type="text"
          className={css.input}
          readOnly={readOnly}
          disabled={disabled}
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  }

