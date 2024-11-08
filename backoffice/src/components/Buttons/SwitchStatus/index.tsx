import {
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import { Power } from "phosphor-react";

export const SwitchStatus = ({
  status,
  onClick,
}: {
  status: boolean;
  onClick: () => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const title = status ? "Inaktivieren" : "Aktivieren";

  const handleClick = () => {
    onClick();
    onClose();
  };

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <IconButton
          variant="unstyled"
          aria-label="delete item"
          size="sm"
          icon={
            status ? (
              <Power size={22} color="red" />
            ) : (
              <Power size={22} color="green" />
            )
          }
          onClick={() => ""}
          color="red"
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>{title}</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            {status
              ? "Möchten Sie diesen Menüpunkt wirklich deaktivieren?"
              : "Möchten Sie diesen Menüpunkt wirklich aktivieren?"}
          </PopoverBody>
          <PopoverBody>
            <Button
              colorScheme={status ? "red" : "green"}
              onClick={handleClick}
            >
              {title}
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
