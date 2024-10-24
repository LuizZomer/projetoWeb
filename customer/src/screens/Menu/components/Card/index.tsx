import { Flex, IconButton, Text } from "@chakra-ui/react";
import { intlNumberFormatter, listConfig } from "../../../../utils/functions";
import { ShoppingCartSimple } from "@phosphor-icons/react";
import { themes } from "../../../../styles/theme";
import { useOrderListContext } from "../../../../context/OrderList/useOrderListContext";
import { IMenu } from "../../../../utils/types";
import { toast } from "react-toastify";

interface ICardMenu {
  menu: IMenu;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMenu: React.Dispatch<React.SetStateAction<IMenu | undefined>>;
}

export const Card = ({ menu, setModalOpen, setSelectedMenu }: ICardMenu) => {
  const { orderList } = useOrderListContext();
  const { description, name, size, value, id } = menu;

  return (
    <Flex
      direction="column"
      justify="space-between"
      gap="20px"
      maxW="257px"
      w="full"
      boxShadow="0px 4px 14px rgba(1, 1, 1, 0.4)"
      borderRadius="7px"
      p="20px"
      bgColor="#F6F6F6"
      transition="0.5s"
      _hover={{
        cursor: "pointer",
        bgColor: "#f7f7f7",
        transform: "scale(1.05)",
      }}
    >
      <Text fontSize={20} fontWeight={600}>
        {name}
      </Text>
      <Text>
        <Text as="span" fontWeight={600}>
          Beschreibung:
        </Text>{" "}
        {description}
      </Text>
      <Flex gap="10px">
        <Text fontWeight={600}>Größe:</Text>
        <Text>{listConfig({ field: "size", value: size })}</Text>
      </Flex>

      <Flex justify="space-between" align="center">
        <Text>{intlNumberFormatter(value)}</Text>
        <IconButton
          variant="unstyled"
          icon={<ShoppingCartSimple size={32} color={themes.color.primary} />}
          aria-label=""
          onClick={() => {
            const itemExistInList = orderList.some((item) => item.id === id);

            if (itemExistInList) {
              toast.error("Artikel wurde bereits zum Warenkorb hinzugefügt");
              return;
            }

            setModalOpen(true);
            setSelectedMenu(menu);
          }}
        />
      </Flex>
    </Flex>
  );
};
