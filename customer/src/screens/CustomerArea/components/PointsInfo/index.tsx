import { Flex, Grid, Text } from "@chakra-ui/react";
import { menuItemsPointsGain } from "../../constant";
import { MenuItemPoints } from "./components/MenuItemPoints";

export const PointsInfo = () => {
  return (
    <Flex direction="column" gap="60px">
      <Flex direction="column" gap="24px">
        <Text
          fontWeight="bold"
          fontSize="40px"
          color="#482D19"
          textAlign="center"
        >
          Punkte einlösen
        </Text>
        <Text textAlign="center">
          Sie können Punkte gegen verschiedene Produkte einlösen. Schauen Sie
          sich die Möglichkeiten an!
        </Text>
      </Flex>
      <Grid
        justifyContent="center"
        templateColumns={["1fr", "minmax(200px ,550px) minmax(200px ,550px)"]}
        gap="40px"
        p="10px"
      >
        {menuItemsPointsGain.map((menuItem) => (
          <MenuItemPoints key={menuItem.title} menuItem={menuItem} />
        ))}
      </Grid>
    </Flex>
  );
};
