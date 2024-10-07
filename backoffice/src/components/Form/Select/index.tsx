import {
  FormControl,
  FormErrorMessage,
  Select,
  SelectProps,
  Text,
} from "@chakra-ui/react";

interface ISelectprops extends SelectProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const FormSelect = ({
  label,
  error,
  children,
  ...rest
}: ISelectprops) => (
  <FormControl isInvalid={!!error}>
    {label && (
      <Text color="#482D19" fontWeight={500}>
        {label}
      </Text>
    )}
    <Select
      borderColor="#482D19"
      color="#482D19"
      _hover={{ borderColor: "#2b1f16" }}
      focusBorderColor="trasparent"
      {...rest}
    >
      {children}
    </Select>
    <FormErrorMessage>{error && error}</FormErrorMessage>
  </FormControl>
);
