import { Flex, Text } from "@chakra-ui/react";
import { menuItemsPointsArray } from "../../constant";
import { MenuItemCard } from "./components/MenuItem";

export const MenuItemPoint = () => {
  return (
    <Flex direction="column" w="full" gap="60px">
      <Text
        fontWeight="bold"
        fontSize="40px"
        color="#482D19"
        textAlign="center"
      >
        Letzte Bestellungen
      </Text>
      <Flex justify="space-evenly" flexWrap="wrap" gap="90px">
        {menuItemsPointsArray.map((menuItem) => (
          <MenuItemCard key={menuItem.title} menuItem={menuItem} />
        ))}
      </Flex>
    </Flex>
  );
};
