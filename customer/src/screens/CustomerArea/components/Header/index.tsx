import { Flex, Image, Text } from "@chakra-ui/react";
import { themes } from "../../../../styles/theme";
import pizzaIcon from "/pizzaIcon.svg";

export const Header = () => {
  return (
    <Flex
      align="center"
      gap="20px"
      bg={themes.color.secondary}
      px="20px"
      height={70}
    >
      <Image src={pizzaIcon} width={35} height={35} />
      <Text fontSize={28} fontWeight={500} color={themes.color.primary}>
        Pizzeria Bei Giovanni
      </Text>
    </Flex>
  );
};
