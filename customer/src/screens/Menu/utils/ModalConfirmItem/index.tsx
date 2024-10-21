import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { IMenu } from "../..";

interface IModalProps {
  onClose: () => void;
  isOpen: boolean;
  menu: IMenu;
}

export const ModalConfirmMenuItem = ({
  isOpen,
  onClose,
  menu,
}: IModalProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl" color="#482D19">
          Artikel bestätigen
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{menu.name}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
