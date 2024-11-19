import { Flex, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Flex
      as="footer"
      direction={["column", "row"]}
      gap="10px"
      justify="space-around"
      alignItems="center"
      minH="100px"
      textAlign="center"
    >
      <Text color="#482D19" fontSize="32px">
        Inh.: Círo Donadío
      </Text>
      <Text color="#482D19" fontSize="32px">
        Hörder Str. 323 58454 Wítten
      </Text>
      <Text color="#482D19" fontSize="32px">
        Aktuelle Aktionen
      </Text>
    </Flex>
  );
};
