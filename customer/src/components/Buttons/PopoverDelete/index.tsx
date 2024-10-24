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
} from "@chakra-ui/react";
import { Trash } from "@phosphor-icons/react";

interface IDeletePopover {
  onClick(): void;
  message: string;
}

export const PopoverDelete = ({ onClick, message }: IDeletePopover) => (
  <Popover>
    <PopoverTrigger>
      <IconButton
        variant="unstyled"
        aria-label="delete item"
        size="sm"
        icon={<Trash size={22} color="red" />}
        onClick={() => ""}
        color="red"
      />
    </PopoverTrigger>
    <Portal>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Löschen</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>{message}</PopoverBody>
        <PopoverBody>
          <Button colorScheme="red" onClick={() => onClick()}>
            Löschen
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Portal>
  </Popover>
);
