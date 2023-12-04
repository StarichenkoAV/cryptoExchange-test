import { FC } from "react";

import IconsSvg from "../../../assets/img/icons.svg";

interface IIconProps {
  name: string;
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
  icon?: string;
}

export const Icon: FC<IIconProps> = ({
  name,
  icon,
  fill = `currentColor`,
  stroke = `transparent`,
  width = `12px`,
  height = `12px`,
}) => {
  const svgProps = {
    fill,
    stroke,
    width,
    height,
  };

  return  (
    <svg {...svgProps} className={`svg-${name}`}>
      <use xlinkHref={`${IconsSvg}#${name}`} />
    </svg>
  );
};
