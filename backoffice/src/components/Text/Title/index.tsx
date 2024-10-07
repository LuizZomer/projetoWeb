import { Text, TextProps } from "@chakra-ui/react";

interface ITitleProps extends TextProps {
  label: string;
}

export const Title = ({ label, ...rest }: ITitleProps) => (
  <Text as="h1" color="#F1ECDC" fontSize="6xl" fontWeight="semibold" {...rest}>
    {label}
  </Text>
);
