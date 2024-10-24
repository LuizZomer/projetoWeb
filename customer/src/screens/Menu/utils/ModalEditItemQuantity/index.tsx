import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FormInput } from "../../../../components/Form/Input";
import { useState } from "react";
import { ButtonComponent } from "../../../../components/Buttons/Button";
import { toast } from "react-toastify";
import { useOrderListContext } from "../../../../context/OrderList/useOrderListContext";
import { IOrderList } from "../../../../context/OrderList/types";

interface IModalProps {
  onClose: () => void;
  isOpen: boolean;
  menu: IOrderList;
}

export const ModalEditItemQuantity = ({
  isOpen,
  onClose,
  menu,
}: IModalProps) => {
  const { setOrderList } = useOrderListContext();
  const [quantity, setQuantity] = useState(String(menu.quantity));

  const handleClose = () => {
    onClose();
  };

  const handleClick = () => {
    const numQuantity = Number(quantity);

    if (isNaN(numQuantity) || numQuantity <= 0) {
      toast.error("Menge muss größer als 0 sein");
      return;
    }

    setOrderList((prev) => {
      const index = prev.findIndex((order) => order.id === menu.id);

      const updatedOrderList = [...prev];

      updatedOrderList[index].quantity = Number(quantity);

      return updatedOrderList;
    });

    toast.success("Artikel zum Warenkorb hinzugefügt!");

    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl" color="#482D19">
          Artikelmenge bearbeiten
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap="20px">
            <Flex justify="center" align="center" gap="20px">
              <Text fontSize="2xl">{menu.name}</Text>
              <Box maxW="100px">
                <FormInput
                  label="Menge"
                  onChange={(evt) => {
                    setQuantity(evt.target.value);
                  }}
                  defaultValue={quantity}
                  type="number"
                />
              </Box>
            </Flex>
            <ButtonComponent onClick={handleClick}>bestätigen</ButtonComponent>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
