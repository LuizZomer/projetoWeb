import { Box, Flex, Tag, useDisclosure } from "@chakra-ui/react";
import { MagnifyingGlass, Pencil, Power } from "phosphor-react";
import { useEffect, useState } from "react";
import { ButtonComponent } from "../../../components/Buttons/Button";
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
import { customerStatus } from "../constants";
import { ModalCreateCustomer } from "./utils/ModalCreateCustomer";
import { ModalEditCustomer } from "./utils/ModalEditCustomer";
import { IconButtonComponent } from "../../../components/Buttons/IconButton";
import { SwitchStatus } from "../../../components/Buttons/SwitchStatus";

export interface ICustomer {
  id: string;
  fullName: string;
  email: string;
  idnr: string;
  status: boolean;
  loyalty_points: number;
  createdAt: string;
}

interface ICustomerListReq {
  customers: ICustomer[];
  customersCount: number;
}

export const CustomerList = () => {
  // #region filter
  const [selectedStatus, setSelectedStatus] = useState("");
  const [search, setSearch] = useState("");
  // #endregion

  const [customerList, setCustomerList] = useState<ICustomer[]>([]);
  const [count, setCount] = useState(0);
  const { page } = usePagination();
  const [loading, setLoading] = useState(true);
  const [onQuery, setOnQuery] = useState(false);
  // #region modal
  const { onOpen, isOpen, onClose } = useDisclosure();

  const {
    onOpen: updateOnOpen,
    isOpen: updateIsOpen,
    onClose: updateOnClose,
  } = useDisclosure();
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer>();
  // #endregion

  // #region req
  const reqCustomer = async ({ newPage }: { newPage: string }) => {
    await api
      .get<ICustomerListReq>(
        `/customer?take=10&role=${selectedStatus}&search=${search}&page=${newPage}`
      )
      .then(({ data }) => {
        setCount(data.customersCount);
        setCustomerList(data.customers);
      })
      .finally(() => setLoading(false));
  };

  const deleteCustomer = (id: string) => {
    api.patch(`/customer/status/${id}`).then(() => {
      reqCustomer({ newPage: page });
    });
  };

  // #endregion req

  useEffect(() => {
    reqCustomer({ newPage: page });
  }, []);

  return (
    <>
      {isOpen && (
        <ModalCreateCustomer
          isOpen={isOpen}
          onClose={onClose}
          onSave={() => reqCustomer({ newPage: page })}
        />
      )}
      {updateIsOpen && selectedCustomer && (
        <ModalEditCustomer
          isOpen={updateIsOpen}
          onClose={updateOnClose}
          onSave={() => reqCustomer({ newPage: page })}
          customer={selectedCustomer}
        />
      )}
      <Flex flexDir="column" gap="30px">
        {loading && (
          <LoadingWrapper>
            <SpinnerLoading />
          </LoadingWrapper>
        )}
        {!loading && (
          <>
            <Title label="Kunde" />
            <FilterContainer>
              <FormInput
                label="Name"
                placeholder="Suchen"
                icon={MagnifyingGlass}
                onChange={(evt) => {
                  setSearch(evt.target.value);
                }}
                onKeyUp={({ key }) => {
                  if (key === "Enter") reqCustomer({ newPage: "1" });
                }}
              />
              <FormSelect
                label="Status"
                onChange={(evt) => {
                  setSelectedStatus(evt.target.value);
                }}
              >
                <option value="">Keiner</option>
                {customerStatus.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </FormSelect>
              <ButtonComponent
                isLoading={onQuery}
                onClick={async () => {
                  setOnQuery(true);
                  await reqCustomer({ newPage: "1" });
                  setOnQuery(false);
                }}
              >
                zu senden
              </ButtonComponent>
            </FilterContainer>
            <Flex
              flexDir="column"
              gap="10px"
              backgroundColor="#F1ECDC"
              borderRadius="8px"
              padding="20px"
            >
              <ButtonComponent onClick={() => onOpen()} maxW="130px">
                + Add Kunde
              </ButtonComponent>
              <Box overflowX="auto">
                <InfoTable
                  headProps={[
                    { label: "Name" },
                    { label: "Email" },
                    { label: "IDNR" },
                    { label: "Status" },
                    { label: "Treuepunkte" },
                    { label: "erstellt bei" },
                    { label: "" },
                  ]}
                >
                  {customerList.map((customer) => (
                    <InfoTableContent
                      key={customer.id}
                      colsBody={[
                        { ceil: customer.fullName },
                        { ceil: customer.email },
                        { ceil: customer.idnr },
                        {
                          ceil: customer.status ? (
                            <Tag backgroundColor="green" color="white">
                              Aktiv
                            </Tag>
                          ) : (
                            <Tag backgroundColor="red" color="white">
                              Nicht aktiv
                            </Tag>
                          ),
                        },
                        {
                          ceil: customer.loyalty_points,
                        },
                        {
                          ceil: new Date(
                            customer.createdAt
                          ).toLocaleDateString(),
                        },
                        {
                          ceil: (
                            <Flex align="center" gap="20px">
                              <SwitchStatus
                                onClick={() => {
                                  deleteCustomer(customer.id);
                                }}
                                status={customer.status}
                              />

                              <IconButtonComponent
                                icon={Pencil}
                                onClick={() => {
                                  setSelectedCustomer(customer);
                                  updateOnOpen();
                                }}
                              />
                            </Flex>
                          ),
                        },
                      ]}
                    />
                  ))}
                </InfoTable>
              </Box>
              {count > 1 && (
                <Pagination
                  count={count}
                  req={({ newPage }) => reqCustomer({ newPage })}
                />
              )}
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};
