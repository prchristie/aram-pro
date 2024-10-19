import { FC, ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image: FC<ImageProps> = ({ ...props }) => {
  return <img {...props} />;
};

export default Image;
