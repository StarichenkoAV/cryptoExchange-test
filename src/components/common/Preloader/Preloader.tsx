import { CSSProperties, FC } from "react";
import cn from "classnames";

import css from "./Preloader.module.scss";
import IconsSvg from "../../../assets/img/icons.svg";

interface PreloaderProps {
  iconSize?: string;
  size?: string;
  isAbsolute?: boolean;
  isFixed?: boolean;
  stroke?: string;
  fill?: string;
  style?: CSSProperties;
}

export const Preloader: FC<PreloaderProps> = ({
  iconSize = `51px`,
  size,
  isAbsolute = false,
  isFixed = false,
  stroke = `#bbb`,
  fill = `transparent`,
  style = {},
}: PreloaderProps) => {
  if (size) {
    style.width = size;
    style.height = size;
    style.minHeight = size;
  }

  return (
    <div
      className={cn(css.component, {
        [css.isAbsolute]: isAbsolute,
        [css.isFixed]: isFixed,
      })}
      style={{ color: `#0095E0`, ...style }}
    >
      <svg
        className={css.rotationAnimation}
        fill={fill}
        stroke={stroke}
        width={iconSize}
        height={iconSize}
      >
        <use xlinkHref={`${IconsSvg}#icon-loader`} />
      </svg>
    </div>
  );
};
