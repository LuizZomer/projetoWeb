import { forwardRef, InputHTMLAttributes } from "react";
import { InputStyled } from "./styles";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  themeColor?: string;
}

export const Field = forwardRef<HTMLInputElement, IInput>(
  ({ themeColor = "#fff", ...rest }, ref) => {
    return <InputStyled $themeColor={themeColor} ref={ref} {...rest} />;
  }
);

Field.displayName = "Field";
