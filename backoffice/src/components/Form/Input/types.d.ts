import { InputProps } from "@chakra-ui/react";

export interface IInputProps extends InputProps {
  label?: string;
  error?: string;
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
}
