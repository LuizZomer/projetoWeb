import { IconButton } from "@chakra-ui/react";
import { IconProps } from "phosphor-react";

interface IIconButton {
  onClick?: () => void;
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  color?: string;
}

export const IconButtonComponent = ({
  icon: Icon,
  onClick,
  color = "#482D19",
}: IIconButton) => (
  <IconButton
    variant="unstyled"
    aria-label="Button"
    onClick={onClick}
    icon={<Icon size={22} color={color} />}
  />
);
