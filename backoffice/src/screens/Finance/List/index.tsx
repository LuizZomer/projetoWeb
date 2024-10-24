import { Box, Divider, Flex, Tag, Text, useDisclosure } from "@chakra-ui/react";
import { Pencil } from "phosphor-react";
import { useEffect, useState } from "react";
import { ButtonComponent } from "../../../components/Buttons/Button";
import { IconButtonComponent } from "../../../components/Buttons/IconButton";
import { PopoverDelete } from "../../../components/Buttons/PopoverDelete";
import { FormInput } from "../../../components/Form/Input";
import { FormSelect } from "../../../components/Form/Select";
import { SpinnerLoading } from "../../../components/Loading/LoadingSpinner";
import { LoadingWrapper } from "../../../components/Loading/LoadingWrapper";
import { Pagination } from "../../../components/Pagination";
import { InfoTable, InfoTableContent } from "../../../components/Table";
import { Title } from "../../../components/Text/Title";
import { usePagination } from "../../../hooks";
import { api } from "../../../services/api";
import { FilterContainer } from "../../../styles/Globals";
import {
  convertToInputDate,
  intlNumberFormatter,
} from "../../../utils/functions";
import { ModalCreateFinance } from "./utils/ModalCreateFinance";
import { ModalEditFinance } from "./utils/ModalUpdateFinance";

interface IFinance {
  id: string;
  dueDate: string;
  description: string;
  value: number;
  status: boolean;
  userId: string | null;
  type: string;
  createdAt: string;
  User: {
    fullName: string;
  } | null;
}

interface IFinancesParam {
  finances: IFinance[];
  financesCount: number;
}

interface IIncome {
  income: number;
  expectedIncome: number;
}

export type ICreateFinance = Omit<IFinance, "User" | "createdAt" | "userId">;

export const FinanceList = () => {
  const { page, setPage } = usePagination();
  const [financesList, setFinancesList] = useState<IFinance[]>([]);
  const [income, setIncome] = useState<IIncome>();
  const [count, setCount] = useState(0);
  const [onQuery, setOnQuery] = useState(false);
  const [loading, setLoading] = useState(true);

  // #region filter
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedInitialDate, setSelectedInitialDate] = useState(() => {
    const currentDate = new Date();
    return convertToInputDate(currentDate);
  });
  const [selectedFinalDate, setSelectedFinalDate] = useState("");
  // #endregion

  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    onOpen: updateOnOpen,
    isOpen: updateIsOpen,
    onClose: updateOnClose,
  } = useDisclosure();

  const [selectedFinance, setSelectedFinance] = useState<ICreateFinance>();

  const typeFormat = (type: string) => {
    if (type === "receivable") return "Forderung";
    else return "Zahlbar";
  };

  const inputDateAdjust = () => {
    const currentDate = new Date();
    return convertToInputDate(currentDate);
  };

  const deleteFinance = async (id: string) => {
    await api.delete(`finance/${id}`).then(() => {
      reqFinance({ newPage: page });
    });
  };

  const reqIncome = async () => {
    await api
      .get(
        `/finance/income?initialDate=${selectedInitialDate}&finalDate=${selectedFinalDate}`
      )
      .then(({ data }) => {
        setIncome(data);
      })
      .finally(() => setLoading(false));
  };

  const reqFinance = async ({ newPage }: { newPage: string }) => {
    await api
      .get<IFinancesParam>(
        `/finance?page=${newPage}&take=10&status=${selectedStatus}&type=${selectedType}&initialDate=${selectedInitialDate}&finalDate=${selectedFinalDate}`
      )
      .then(({ data }) => {
        setFinancesList(data.finances);
        setCount(data.financesCount);
      })
      .finally(() => reqIncome());
  };

  useEffect(() => {
    reqFinance({ newPage: page });
  }, []);

  return (
    <Flex direction="column" gap="30px">
      {isOpen && (
        <ModalCreateFinance
          isOpen={isOpen}
          onClose={onClose}
          onSave={() => reqFinance({ newPage: page })}
        />
      )}
      {updateIsOpen && selectedFinance && (
        <ModalEditFinance
          finance={selectedFinance}
          isOpen={updateIsOpen}
          onClose={updateOnClose}
          onSave={() => reqFinance({ newPage: page })}
        />
      )}
      <Title label="Finanziell" />

      <FilterContainer>
        <FormInput
          label="Ersttermin"
          onChange={({ target }) => {
            setSelectedInitialDate(target.value);
          }}
          type="date"
          defaultValue={selectedInitialDate || inputDateAdjust()}
        />

        <FormInput
          label="Endtermin"
          onChange={({ target }) => {
            setSelectedFinalDate(target.value);
          }}
          type="date"
          defaultValue={selectedFinalDate || inputDateAdjust()}
        />

        <FormSelect
          label="Status"
          onChange={({ target }) => {
            setSelectedStatus(target.value);
          }}
        >
          <option value="">Keiner</option>
          <option value="true">Bezahlt</option>
          <option value="false">Nicht Bezahlt</option>
        </FormSelect>

        <FormSelect
          label="Typ"
          onChange={({ target }) => {
            setSelectedType(target.value);
          }}
        >
          <option value="">Keiner</option>
          <option value="payable">Zahlbar</option>
          <option value="receivable">Forderung</option>
        </FormSelect>

        <ButtonComponent
          onClick={async () => {
            setOnQuery(true);
            setPage("1");
            await reqFinance({ newPage: "1" });
            setOnQuery(false);
          }}
          isLoading={onQuery}
        >
          Zu senden
        </ButtonComponent>
      </FilterContainer>

      {loading && (
        <LoadingWrapper>
          <SpinnerLoading />
        </LoadingWrapper>
      )}

      {!loading && !!income && (
        <Flex
          gap="10px"
          backgroundColor="#F1ECDC"
          borderRadius="8px"
          padding="20px"
        >
          <Box border="1px solid #482D19" borderRadius="10px" padding="10px">
            <Text fontSize="20px" color="#482D19">
              Einkommen:
            </Text>
            <Flex width="full" justify="flex-end">
              <Text
                fontSize="20px"
                color={income?.income > 0 ? "green" : "red"}
              >
                {income.income}
              </Text>
            </Flex>
          </Box>
          <Divider orientation="vertical" />
          <Box border="1px solid #482D19" borderRadius="10px" padding="10px">
            <Text fontSize="20px" color="#482D19">
              Erwartetes Einkommen:
            </Text>
            <Flex width="full" justify="flex-end">
              <Text
                fontSize="20px"
                color={income.expectedIncome > 0 ? "green" : "red"}
              >
                {income.expectedIncome}
              </Text>
            </Flex>
          </Box>
        </Flex>
      )}

      {!loading && (
        <Flex
          flexDir="column"
          gap="10px"
          backgroundColor="#F1ECDC"
          borderRadius="8px"
          padding="20px"
        >
          <ButtonComponent onClick={() => onOpen()} maxW="130px">
            + Add Finanziell
          </ButtonComponent>

          <InfoTable
            headProps={[
              { label: "Beschreibung" },
              { label: "Fälligkeitsdatum" },
              { label: "Wert" },
              { label: "Typ" },
              { label: "Status" },
              { label: "erstellt bei" },
              { label: "Verantwortlicher" },
              { label: "" },
            ]}
          >
            {financesList.map((finance) => (
              <InfoTableContent
                key={finance.id}
                colsBody={[
                  { ceil: finance.description },
                  { ceil: new Date(finance.dueDate).toLocaleString() },
                  { ceil: intlNumberFormatter(finance.value) },
                  { ceil: typeFormat(finance.type) },
                  {
                    ceil: finance.status ? (
                      <Tag backgroundColor="green" color="white">
                        bezahlt
                      </Tag>
                    ) : (
                      <Tag backgroundColor="red" color="white">
                        Nicht bezahlt
                      </Tag>
                    ),
                  },
                  { ceil: new Date(finance.createdAt).toLocaleDateString() },
                  { ceil: finance.User ? finance.User.fullName : "System" },
                  {
                    ceil: finance.User ? (
                      <Flex align="center" gap="20px">
                        <PopoverDelete
                          key={finance.id}
                          message="Haben Sie diesen Menüpunkt wirklich gelöscht?"
                          onClick={() => {
                            deleteFinance(finance.id);
                          }}
                        />
                        <IconButtonComponent
                          icon={Pencil}
                          onClick={() => {
                            setSelectedFinance(finance);
                            updateOnOpen();
                          }}
                        />
                      </Flex>
                    ) : null,
                  },
                ]}
              />
            ))}
          </InfoTable>
          {count > 1 && (
            <Pagination
              count={count}
              req={({ newPage }) => reqFinance({ newPage })}
            />
          )}
        </Flex>
      )}
    </Flex>
  );
};
