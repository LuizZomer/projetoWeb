import { Box, Flex, Text } from "@chakra-ui/react";
import { ButtonComponent } from "../../components/Buttons/Button";
import { Header } from "./components/Header";

export const CustomerArea = () => {
  return (
    <Flex direction="column">
      <Header />
      <Flex h="228px" bgColor="#75492A" opacity="0.6">
        <Box>
          <Text>Teste</Text>
        </Box>
        <Flex>
          <ButtonComponent
            bgColor="transparent"
            border="1px solid #fff"
            color="#fff"
          >
            Logout
          </ButtonComponent>
          <ButtonComponent>Edit Profile</ButtonComponent>
        </Flex>
      </Flex>
    </Flex>
  );
};
