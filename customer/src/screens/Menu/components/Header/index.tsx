import {
  Badge,
  Box,
  Flex,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import pizzaIcon from "/pizzaIcon.svg";
import { ShoppingCartSimple } from "@phosphor-icons/react";
import { useRef } from "react";
import { themes } from "../../../../styles/theme";
import { useOrderListContext } from "../../../../context/OrderList/useOrderListContext";
import { OrderListDrawer } from "../OrderListDrawer";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { orderList } = useOrderListContext();
  const btnRef = useRef(null);

  return (
    <Flex
      bg={themes.color.primary}
      px={26}
      height={70}
      align="center"
      justify="space-between"
    >
      <Flex align="center" gap="10px">
        <Image src={pizzaIcon} width={35} height={35} />
        <Text fontSize={28} fontWeight={500} color="#fff">
          Pizzeria Bei Giovanni
        </Text>
      </Flex>
      <Box position="relative">
        <IconButton
          icon={<ShoppingCartSimple size={30} color="#fff" />}
          variant="unstyled"
          aria-label=""
          onClick={onOpen}
        />
        <Badge
          position="absolute"
          top="0px"
          right="0"
          borderRadius="6px"
          bgColor="red"
          color="#fff"
        >
          {orderList.length}
        </Badge>
      </Box>
      <OrderListDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </Flex>
  );
};
