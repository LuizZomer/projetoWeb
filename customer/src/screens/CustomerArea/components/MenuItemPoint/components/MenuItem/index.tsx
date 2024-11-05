import { Flex, Image, Text } from "@chakra-ui/react";
import { themes } from "../../../../../../styles/theme";

interface IMenuItem {
  menuItem: {
    icon: string;
    title: string;
    points: number;
  };
}

export const MenuItemCard = ({ menuItem }: IMenuItem) => {
  const { icon, points, title } = menuItem;

  return (
    <Flex direction="column" align="center" gap="20px">
      <Flex
        justify="center"
        bgColor="#fff"
        borderRadius="full"
        w="100px"
        h="100px"
      >
        <Image src={icon} />
      </Flex>

      <Flex direction="column">
        <Text fontSize="28px" color={themes.color.primary} textAlign="center">
          {title}
        </Text>
        <Text fontSize="28px" color="#000">
          {points} Punkte
        </Text>
      </Flex>
    </Flex>
  );
};
