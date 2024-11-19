import { Flex } from "@chakra-ui/react";
import { themes } from "../../styles/theme";
import { Header } from "./Components/Header";
import { Apresentation } from "./Components/Apresentation";
import { History } from "./Components/History";
import { Join } from "./Components/Join";
import { Menu } from "./Components/Menu";
import { Footer } from "./Components/Footer";

export const Home = () => {
  return (
    <Flex direction="column" bgColor={themes.color.secondary}>
      <Header />
      <Apresentation />
      <History />
      <Join />
      <Menu />
      <Footer />
    </Flex>
  );
};
