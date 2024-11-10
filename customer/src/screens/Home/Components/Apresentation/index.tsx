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
    >
      <Text
        fontSize="96px"
        color="#FFFEFE"
        textShadow="        
            -1px -1px 0 #000,  /* Sombra no canto superior esquerdo */
            1px -1px 0 #000,   /* Sombra no canto superior direito */
            -1px 1px 0 #000,   /* Sombra no canto inferior esquerdo */
            1px 1px 0 #000;    /* Sombra no canto inferior direito */
        "
      >
        Pizzeria bei Giovanni
      </Text>
      <Text
        fontSize="36px"
        color="#FFFEFE"
        textShadow="        
            -1px -1px 0 #000,  /* Sombra no canto superior esquerdo */
            1px -1px 0 #000,   /* Sombra no canto superior direito */
            -1px 1px 0 #000,   /* Sombra no canto inferior esquerdo */
            1px 1px 0 #000;    /* Sombra no canto inferior direito */
        "
      >
        Italienisches Herz, deutscher Geschmack
      </Text>
    </Flex>
  );
};
