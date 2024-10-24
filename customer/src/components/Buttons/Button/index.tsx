import { Button, ButtonProps } from "@chakra-ui/react";

interface IButton extends ButtonProps {
  children: React.ReactNode;
}

export const ButtonComponent = ({ children, ...rest }: IButton) => {
  return (
    <Button
      backgroundColor="#482D19"
      color="#F1ECDC"
      _hover={{
        backgroundColor: "#412e20",
        boxShadow: "1px 1px 10px rgba(1, 1, 1, 0.3)",
        transform: "scale(1.01)",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
