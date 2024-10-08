import {
  Button,
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
      <Button variant="none">
        <Trash color="red" size={22} />
      </Button>
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
