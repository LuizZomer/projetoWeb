import { Flex, Text } from "@chakra-ui/react";
import bg from "/section1bg.svg";

export const Apresentation = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bgImage={bg}
      w="full"
      h="820px"
      gap="20px"
    >
      <Text
        fontSize={["60px", "96px"]}
        color="#FFFEFE"
        textShadow="        
            -1px -1px 0 #000,  /* Sombra no canto superior esquerdo */
            1px -1px 0 #000,   /* Sombra no canto superior direito */
            -1px 1px 0 #000,   /* Sombra no canto inferior esquerdo */
            1px 1px 0 #000;    /* Sombra no canto inferior direito */
        "
        textAlign="center"
      >
        Pizzeria bei Giovanni
      </Text>
      <Text
        fontSize={["25px", "36px"]}
        color="#FFFEFE"
        textShadow="        
            -1px -1px 0 #000,  /* Sombra no canto superior esquerdo */
            1px -1px 0 #000,   /* Sombra no canto superior direito */
            -1px 1px 0 #000,   /* Sombra no canto inferior esquerdo */
            1px 1px 0 #000;    /* Sombra no canto inferior direito */
        "
        textAlign="center"
      >
        Italienisches Herz, deutscher Geschmack
      </Text>
    </Flex>
  );
};
