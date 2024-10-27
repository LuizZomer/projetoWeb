import {
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RefObject, useState } from "react";
import { useOrderListContext } from "../../../../context/OrderList/useOrderListContext";
import { intlNumberFormatter, listConfig } from "../../../../utils/functions";
import { ButtonComponent } from "../../../../components/Buttons/Button";
import { Pencil } from "@phosphor-icons/react";
import { themes } from "../../../../styles/theme";
import { ModalEditItemQuantity } from "../../utils/ModalEditItemQuantity";
import { IOrderList } from "../../../../context/OrderList/types";
import { PopoverDelete } from "../../../../components/Buttons/PopoverDelete";
import { toast } from "react-toastify";
import { FormInput } from "../../../../components/Form/Input";
import { useSocketConnect } from "../../../../context/SocketConnect/useSocketConnect";
import { useValidationToken } from "../../../../hooks/useValidateToken";

interface IDrawer {
  isOpen: boolean;
  onClose: () => void;
  btnRef?: RefObject<HTMLElement>;
}

export const OrderListDrawer = ({ isOpen, onClose, btnRef }: IDrawer) => {
  const { isValid } = useValidationToken();
  const { newOrder } = useSocketConnect();
  const { orderList, setOrderList, setCustomerName, customerName } =
    useOrderListContext();
  const {
    isOpen: isOpenEditModal,
    onClose: onCloseEditModal,
    onOpen: onOpenEditModal,
  } = useDisclosure();
  const [selectedMenu, setSelectedMenu] = useState<IOrderList>();
  const [onQuery, setOnQuery] = useState(false);

  const totalValue = () => {
    let value = 0;
    orderList.forEach((order) => {
      value += order.value * order.quantity;
    });

    return intlNumberFormatter(value);
  };

  const handleDeleteItem = (id: string) => {
    setOrderList((prev) => {
      const newArray = prev.filter((order) => order.id !== id);
      return newArray;
    });

    toast.success("Artikel erfolgreich gelöscht!");
  };

  const handleSubmit = async () => {
    if (customerName === "" && !isValid) {
      toast.error("Kundenname erforderlich");
      return;
    }
    setOnQuery(true);
    const correctOrderList = orderList.map(({ quantity, id }) => ({
      quantity,
      menuId: id,
    }));

    newOrder({ customerName, OrderItems: correctOrderList })
      .then(() => {
        toast.success("Bestellung erfolgreich versendet!");
        setOrderList([]);
        onClose();
      })
      .catch(() =>
        toast.error(
          "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal!"
        )
      )
      .finally(() => setOnQuery(false));
  };

  return (
    <>
      {isOpen && selectedMenu && (
        <ModalEditItemQuantity
          isOpen={isOpenEditModal}
          onClose={onCloseEditModal}
          menu={selectedMenu}
        />
      )}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Bestellungen</DrawerHeader>

          <DrawerBody>
            <Flex direction="column" gap="20px">
              {orderList.map((menu) => (
                <Flex
                  key={menu.id}
                  direction="column"
                  gap="10px"
                  p="20px"
                  border="1px solid #351D0C"
                  borderRadius="6px"
                  pos="relative"
                >
                  <Text fontSize="xl" fontWeight={600}>
                    {menu.name}
                  </Text>
                  <Text>
                    <Text as="span" fontWeight={600}>
                      Größe:
                    </Text>{" "}
                    {listConfig({ field: "size", value: menu.size })}
                  </Text>
                  <Text>
                    <Text as="span" fontWeight={600}>
                      Menge:
                    </Text>{" "}
                    {menu.quantity}
                  </Text>
                  <Text fontWeight={600}>
                    {intlNumberFormatter(menu.value)}
                  </Text>

                  <Flex
                    align="center"
                    pos="absolute"
                    bottom="10px"
                    right="10px"
                  >
                    <IconButton
                      variant="unstyled"
                      icon={<Pencil size={22} color={themes.color.primary} />}
                      aria-label=""
                      onClick={() => {
                        onOpenEditModal();
                        setSelectedMenu(menu);
                      }}
                    />

                    <PopoverDelete
                      message="Möchten Sie den Artikel aus dem Warenkorb entfernen?"
                      onClick={() => handleDeleteItem(menu.id)}
                    />
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Flex direction="column" gap="13px" width="100%">
              <Text fontSize="xl">Gesamtwert: {totalValue()}</Text>
              {!isValid && (
                <FormInput
                  label="Kundenname"
                  onChange={(evt) => setCustomerName(evt.target.value)}
                  defaultValue={customerName}
                  placeholder="ex: Ciro Donadio"
                />
              )}

              <ButtonGroup gap="10px">
                <ButtonComponent
                  bgColor="transparent"
                  color="red"
                  _hover={{ bgColor: "transparent", color: "darkred" }}
                  onClick={() => {
                    setOrderList([]);
                  }}
                >
                  Zu reinigen
                </ButtonComponent>
                <ButtonComponent onClick={handleSubmit} isLoading={onQuery}>
                  Zu senden
                </ButtonComponent>
              </ButtonGroup>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
