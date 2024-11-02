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
import { Trash } from "@phosphor-icons/react";
import { IconProps } from "phosphor-react";

interface IDeletePopover {
  onClick(): void;
  title?: "Löschen" | "Inaktivieren";
  message: string;
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
}

export const PopoverDelete = ({
  onClick,
  title = "Löschen",
  message,
  icon: Icon = Trash,
}: IDeletePopover) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    onClick();
    onClose(); // Fecha o popover após o clique
  };

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <IconButton
          variant="unstyled"
          aria-label="delete item"
          size="sm"
          icon={<Icon size={22} color="red" />}
          onClick={() => ""}
          color="red"
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>{title}</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>{message}</PopoverBody>
          <PopoverBody>
            <Button colorScheme="red" onClick={handleClick}>
              {title}
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
