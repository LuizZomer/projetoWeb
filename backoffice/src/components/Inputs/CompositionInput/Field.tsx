import { forwardRef, InputHTMLAttributes } from "react";
import { InputStyled } from "./styles";

export const Field = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((inputProps, ref) => <InputStyled ref={ref} {...inputProps} />);

Field.displayName = "Field";
