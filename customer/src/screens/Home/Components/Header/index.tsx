import { Flex, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const header = [
    { title: "HAUSS", linkTo: "" },
    { title: "VERBIDEN", linkTo: "" },
    { title: "SPEISEKARTE", linkTo: "" },
    { title: "AN", linkTo: "" },
  ];

  return (
    <Flex
      as="header"
      align="center"
      justify="space-evenly"
      h="120px"
      w="full"
      boxShadow="0px 4px 10px rgba(1, 1, 1, 0.3)"
      position="sticky"
    >
      {header.map(({ linkTo, title }) => (
        <div onClick={() => navigate(linkTo)}>
          <Link fontSize="24px">{title}</Link>
        </div>
      ))}
    </Flex>
  );
};
