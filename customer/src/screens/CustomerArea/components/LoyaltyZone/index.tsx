import { Flex, Text } from "@chakra-ui/react";

export const LoyaltyZone = ({
  loyaltyPoints,
}: {
  loyaltyPoints: number | undefined;
}) => {
  return (
    <Flex
      as="section"
      direction="column"
      justify="center"
      gap="4px"
      border="1px solid rgba(1, 1, 1, 0.2)"
      maxW="630px"
      w="full"
      borderRadius="6px"
      h="96px"
      p="16px"
    >
      <Text color="#0000006c">Monatliche Punkte</Text>
      <Text fontSize="28px" fontWeight="medium">
        {loyaltyPoints || "-"}
      </Text>
    </Flex>
  );
};
