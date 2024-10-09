import { useSearchParams } from "react-router-dom";

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // #region Take
  const take = searchParams.get("take") || "1";

  const setTake = (currentTake: string) => {
    setSearchParams((prevState) => {
      prevState.set("take", currentTake);

      return prevState;
    });
  };
  // #endregion

  // #region Page
  const page = searchParams.get("page") || "1";

  const setPage = (currentPage: string) => {
    setSearchParams((prevState) => {
      prevState.set("page", currentPage);

      return prevState;
    });
  };
  // #endregion

  return { take, setTake, page, setPage };
};
