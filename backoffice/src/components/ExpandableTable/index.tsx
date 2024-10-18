import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";

interface IExpandableTable {
  children: React.ReactNode;
  headProps: {
    label: any;
  }[];
}

export const ExpandableTable = ({ children, headProps }: IExpandableTable) => {
  const [show, setShow] = useState(false);
  return (
    <Box bgColor="#f1ecdc" borderRadius="5px" userSelect="none">
      <Flex
        align="center"
        padding="10px 0 10px 20px"
        gap="30px"
        fontSize="20px"
        _hover={{ cursor: "pointer" }}
        onClick={() => setShow((prev) => !prev)}
      >
        {headProps.map(({ label }, i) => (
          <div key={i}>{label}</div>
        ))}
      </Flex>
      {show && <Box p="0 10px 10px">{children}</Box>}
    </Box>
  );
};
