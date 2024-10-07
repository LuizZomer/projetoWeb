import { IconProps } from "phosphor-react";
import { IconContainer } from "./styles";

interface IIconComponentProps {
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  onClick?: () => void;
  position: "before" | "after";
  isButton?: boolean;
}

export const Icon = ({
  icon: IconComponent,
  onClick,
  position,
  isButton = false,
}: IIconComponentProps) => (
  <IconContainer
    $isButton={isButton}
    $position={position}
    onClick={() => (onClick ? onClick() : "")}
  >
    <IconComponent size={26} color="white" />
  </IconContainer>
);
