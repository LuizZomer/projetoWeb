import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { themes } from "../../../../styles/theme";
import pizzaIcon from "/pizzaIcon.svg";
import { ShoppingCartSimple } from "@phosphor-icons/react";

export const Header = () => {
  return (
    <Flex
      bg={themes.color.primary}
      px={26}
      height={70}
      align="center"
      justify="space-between"
    >
      <Flex align="center" gap="10px">
        <Image src={pizzaIcon} width={35} height={35} />
        <Text fontSize={28} fontWeight={500} color="#fff">
          Pizzeria Bei Giovanni
        </Text>
      </Flex>
      <Box>
        <IconButton
          icon={<ShoppingCartSimple size={30} color="#fff" />}
          variant="unstyled"
          aria-label=""
        />
      </Box>
    </Flex>
  );
};
