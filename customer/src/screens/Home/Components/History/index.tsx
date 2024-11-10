import { Flex, Image, Text } from "@chakra-ui/react";
import frontPizzaria from "/frontPizzaria.png";

export const History = () => {
  return (
    <Flex paddingX={["10px", "88px"]} py="88px" justify="space-between">
      <Text color="#482D19" maxW="566px" fontSize="24px" lineHeight="35px">
        Die Pizzeria Bei Giovanni in Witten erzählt eine Geschichte von Liebe
        und Familientradition. Giovanni, ein leidenschaftlicher Italiener,
        gründete die Pizzeria und brachte authentische Rezepte aus seiner Heimat
        mit. Nach seinem unerwarteten Weggang ging die Pizzeria in die Hände
        seines Bruders über, der beschloss, den Namen zu Ehren von Giovanni
        beizubehalten. Hier ehren wir weiterhin sein Vermächtnis, indem wir
        Pizzen servieren, die mit den gleichen frischen Zutaten und der gleichen
        Leidenschaft zubereitet werden, die Giovanni schon immer hatte. Jedes
        Stück erzählt eine Geschichte und bewahrt Giovannis Erinnerung in
        Wittens Herzen.
      </Text>
      <Image src={frontPizzaria} maxW="677px" w="full" height="513px" />
    </Flex>
  );
};
