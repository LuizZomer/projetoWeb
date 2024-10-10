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
    <Box bgColor="#f1ecdc" borderRadius="5px">
      <Flex padding="10px" gap="30px" onClick={() => setShow((prev) => !prev)}>
        {headProps.map(({ label }) => (
          <div>{label}</div>
        ))}
      </Flex>
      {show && <div>{children}</div>}
    </Box>
  );
};
