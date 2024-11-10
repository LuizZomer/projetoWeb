import { Flex } from "@chakra-ui/react";
import { themes } from "../../styles/theme";
import { Header } from "./Components/Header";
import { Apresentation } from "./Components/Apresentation";
import { History } from "./Components/History";

export const Home = () => {
  return (
    <Flex direction="column" bgColor={themes.color.secondary}>
      <Header />
      <Apresentation />
      <History />
    </Flex>
  );
};
