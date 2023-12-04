import { FC, HTMLAttributes, ReactNode } from "react";
import css from "./Button.module.scss";

export interface IButtonProp extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button: FC<IButtonProp> = ({
  children = ``,
  onClick,
  ...rest
}) => {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        !!onClick && onClick(event);
      }}
      className={css.component}
      {...rest}
    >
      {children}
    </button>
  );
};
