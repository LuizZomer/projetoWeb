import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { forwardRef, useState } from "react";
import { IInputProps } from "./types";

export const FormInput = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, error, icon: Icon, type = "text", ...props }, ref) => {
    const [show, setShow] = useState(false);

    if (type !== "password") {
      return (
        <FormControl isInvalid={!!error}>
          <Text color="#482D19" fontWeight={500}>
            {label}
          </Text>
          <InputGroup>
            {Icon && (
              <InputLeftElement>
                <Icon />
              </InputLeftElement>
            )}
            <Input
              _hover={{ borderColor: "#2b1f16" }}
              focusBorderColor="trasparent"
              borderColor="#482D19"
              _placeholder={{ color: "#753b0f" }}
              color="#482D19"
              outline="none"
              type={type}
              ref={ref}
              {...props}
            />
          </InputGroup>
          <FormErrorMessage>{error && error}</FormErrorMessage>
        </FormControl>
      );
    }

    if (type === "password") {
      return (
        <FormControl isInvalid={!!error}>
          {label && (
            <Text color="#482D19" fontWeight={500}>
              {label}
            </Text>
          )}
          <InputGroup>
            <Input
              borderColor="#482D19"
              type={show ? "text" : "password"}
              focusBorderColor="trasparent"
              _placeholder={{ color: "#753b0f" }}
              color="#482D19"
              outline="none"
              ref={ref}
              {...props}
            />
            <InputRightElement width="5rem" paddingRight="10px">
              <Button
                h="1.75rem"
                size="xs"
                onClick={() => setShow((prev) => !prev)}
                bg="#482D19"
                color="#F1ECDC"
              >
                {show ? "Verstecken" : "Zeigen"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      );
    }
  }
);
