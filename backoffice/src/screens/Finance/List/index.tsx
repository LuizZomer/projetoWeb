import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Flex, Tag } from "@chakra-ui/react";
import { Title } from "../../../components/Text/Title";
import { FilterContainer } from "../../../styles/Globals";
import { InfoTable, InfoTableContent } from "../../../components/Table";
import { usePagination } from "../../../hooks";
import { Pagination } from "../../../components/Pagination";

interface IFinance {
  id: string;
  dueDate: string;
  description: string;
  value: number;
  status: boolean;
  userId: string | null;
  type: string;
  createdAt: string;
}

interface IFinancesParam {
  finances: IFinance[];
  financesCount: number;
}

export const FinanceList = () => {
  const { page, take } = usePagination();
  const [financesList, setFinancesList] = useState<IFinance[]>([]);
  const [count, setCount] = useState(0);

  const reqFinance = async () => {
    await api
      .get<IFinancesParam>(`/finance?page=${page}&take=${take}`)
      .then(({ data }) => {
        setFinancesList(data.finances);
        setCount(data.financesCount);
      });
  };

  useEffect(() => {
    reqFinance();
  }, []);

  return (
    <Flex direction="column" gap="30px">
      <Title label="Finanziell" />

      <FilterContainer></FilterContainer>

      <Flex
        flexDir="column"
        gap="10px"
        backgroundColor="#F1ECDC"
        borderRadius="8px"
        padding="20px"
      >
        <InfoTable
          headProps={[
            { label: "Beschreibung" },
            { label: "Fälligkeitsdatum" },
            { label: "Status" },
          ]}
        >
          {financesList.map(({ id, description, status, dueDate }) => (
            <InfoTableContent
              key={id}
              colsBody={[
                { ceil: description },
                { ceil: new Date(dueDate).toLocaleString() },
                {
                  ceil: status ? (
                    <Tag backgroundColor="green" color="white">
                      bezahlt
                    </Tag>
                  ) : (
                    <Tag backgroundColor="red" color="white">
                      Nicht bezahlt
                    </Tag>
                  ),
                },
              ]}
            />
          ))}
        </InfoTable>
        {count > 1 && <Pagination count={count} req={reqFinance} />}
      </Flex>
    </Flex>
  );
};
