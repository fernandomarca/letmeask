import { ButtonHTMLAttributes } from "react";
import {} from "@chakra-ui/react";
import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...rest }: ButtonProps) {
  return (
    <button className={`button ${isOutlined ? "outlined" : ""}`} {...rest} />
  );
}
