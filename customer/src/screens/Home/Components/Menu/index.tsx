import { Box, Flex, Image, Text } from "@chakra-ui/react";
import menu from "../../../../assets/menu.svg";
import noodle from "../../../../assets/noodle.svg";
import { ButtonComponent } from "../../../../components/Buttons/Button";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
  const navigate = useNavigate();

  return (
    <Flex direction="column" gap="50px" alignItems="center">
      <Text fontSize="48px" color="#482D19" textAlign="center">
        SPEISEKARTE
      </Text>
      <Image src={menu} width="100vw" />
      <Flex w="full" py="100px" justify="center">
        <ButtonComponent
          bgColor="#75492A"
          width="376px"
          height="118px"
          fontSize="48px"
          onClick={() => navigate("/login")}
        >
          SPEISEKARTE
        </ButtonComponent>
      </Flex>

      <Box w="full">
        <Flex justify="center" bgColor="#75492A" w="full" p={["10px", "95px"]}>
          <Text fontSize={["30px", "40px"]} maxW="1000px" color="#F1ECDC">
            Na der Pizzaria Bei Giovanni wird die Pasta mit der gleichen
            Leidenschaft und Authentizität zubereitet wie die Pizzen. Mit
            frischen Nudeln und traditionellen italienischen Saucen bietet jedes
            Pastagericht einen reichen, authentischen Geschmack und bringt das
            echte italienische Flair direkt auf Ihren Tisch in Witten.
          </Text>
        </Flex>
        <Image src={noodle} w="full" />
      </Box>
    </Flex>
  );
};
