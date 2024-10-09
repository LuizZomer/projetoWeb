import { Box, Flex } from "@chakra-ui/react";
import { ButtonComponent } from "../Buttons/Button";
import { usePagination } from "../../hooks";

interface IPagination {
  count: number;
  req: ({ newPage }: { newPage: string }) => void;
}

type TCountConfig = "increment" | "decrement";

export const Pagination = ({ count, req }: IPagination) => {
  const { page, setPage } = usePagination();

  const pageConfig = (action: TCountConfig) => {
    let currentPage = 0;

    if (action === "decrement") {
      const newPage = +page - 1;
      currentPage = newPage;

      setPage(String(newPage));
    }

    if (action === "increment") {
      const newPage = +page + 1;
      currentPage = newPage;

      setPage(String(newPage));
    }

    req({ newPage: String(currentPage) });
  };

  return (
    <Flex width="full" justify="space-between" align="center">
      <ButtonComponent
        onClick={() => pageConfig("decrement")}
        disabled={Number(page) === 1}
      >
        Vorherige
      </ButtonComponent>
      <Box>
        Seite {Number(page)} von {count}
      </Box>
      <ButtonComponent
        onClick={() => pageConfig("increment")}
        disabled={Number(page) === count}
      >
        Nächste
      </ButtonComponent>
    </Flex>
  );
};
