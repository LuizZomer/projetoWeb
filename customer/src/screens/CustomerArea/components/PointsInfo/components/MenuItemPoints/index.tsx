import { Flex, Image, Text } from "@chakra-ui/react";
import { menuItemsPointsGain } from "../../../../constant";

interface IMenuItem {
  menuItem: (typeof menuItemsPointsGain)[number];
}

export const MenuItemPoints = ({ menuItem }: IMenuItem) => {
  const { icon, points, title } = menuItem;

  return (
    <Flex
      w="full"
      border="1px solid #A68A71"
      borderRadius="6px"
      gap="16px"
      p="16px"
    >
      <Flex
        justify="center"
        align="center"
        bgColor="#fff"
        borderRadius="full"
        w="100px"
        h="100px"
      >
        <Image src={icon} height="60px" />
      </Flex>
      <Flex direction="column" justify="center">
        <Text fontSize="20px" fontWeight="medium">
          {title}
        </Text>
        <Text>{points} Punkte</Text>
      </Flex>
    </Flex>
  );
};
