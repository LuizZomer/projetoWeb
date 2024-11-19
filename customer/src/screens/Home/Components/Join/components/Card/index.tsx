import { Flex, Image, Text } from "@chakra-ui/react";
import pizzaWithBg from "../../../../../../assets/pizzaWithBg.svg";

interface ICard {
  title: string;
  description: string;
}

export const JoinCard = ({ description, title }: ICard) => (
  <Flex
    direction="column"
    align="center"
    bgColor="#75492A"
    w="285px"
    minH="775px"
    p="25px"
    gap="57px"
    borderRadius="45px"
    color="#fff"
  >
    <Image src={pizzaWithBg} width="146px" />
    <Text fontSize="24px" textAlign="center">
      {title}
    </Text>
    <Text fontSize="24px">{description}</Text>
  </Flex>
);
