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
import { intlNumberFormatter, listConfig } from "../../../utils/functions";
import { sizeMenuItem, typeMenuItem } from "../constants";
import { ModalCreateMenuItem } from "./utils/ModalCreateMenuItem";
import { ModalEditMenuItem } from "./utils/ModalEditMenuItem";
import { IconButtonComponent } from "../../../components/Buttons/IconButton";

export interface IMenuItem {
  id: string;
  description: string;
  name: string;
  size: string;
  type: string;
  value: number;
  status: boolean;
}

interface IMenuItemsListReq {
  menuItens: IMenuItem[];
  itensCount: number;
}

export const MenuList = () => {
  // #region filter
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [search, setSearch] = useState("");
  // #endregion

  const [menuItemsList, setMenuItemsList] = useState<IMenuItem[]>([]);
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
  const [selectedMenuItem, setSelectedMenuItem] = useState<IMenuItem>();
  // #endregion

  // #region req
  const reqMenuItems = async ({ newPage }: { newPage: string }) => {
    await api
      .get<IMenuItemsListReq>(
        `/menu?take=10&page=${newPage}&search=${search}&type=${selectedType}&size=${selectedSize}&status=${selectedStatus}`
      )
      .then(({ data }) => {
        setCount(data.itensCount);
        setMenuItemsList(data.menuItens);
      })
      .finally(() => setLoading(false));
  };

  const deleteUser = (id: string) => {
    api.patch(`/menu/status/${id}`).then(() => {
      reqMenuItems({ newPage: page });
    });
  };

  // #endregion req

  useEffect(() => {
    reqMenuItems({ newPage: page });
  }, []);

  return (
    <>
      {isOpen && (
        <ModalCreateMenuItem
          isOpen={isOpen}
          onClose={onClose}
          onSave={() => reqMenuItems({ newPage: page })}
        />
      )}
      {updateIsOpen && selectedMenuItem && (
        <ModalEditMenuItem
          isOpen={updateIsOpen}
          onClose={updateOnClose}
          onSave={() => reqMenuItems({ newPage: page })}
          menuItem={selectedMenuItem}
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
            <Title label="Bestellungen" />
            <FilterContainer>
              <FormInput
                label="Name"
                placeholder="Suchen"
                icon={MagnifyingGlass}
                onChange={(evt) => {
                  setSearch(evt.target.value);
                }}
                onKeyUp={({ key }) => {
                  if (key === "Enter") reqMenuItems({ newPage: "1" });
                }}
              />
              <FormSelect
                label="Typ"
                onChange={(evt) => {
                  setSelectedType(evt.target.value);
                }}
              >
                <option value="">Keiner</option>
                {typeMenuItem.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </FormSelect>

              <FormSelect
                label="Größe"
                onChange={(evt) => {
                  setSelectedSize(evt.target.value);
                }}
              >
                <option value="">Keiner</option>
                {sizeMenuItem.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </FormSelect>

              <FormSelect
                label="Status"
                onChange={(evt) => {
                  setSelectedStatus(evt.target.value);
                }}
              >
                <option value="">Keiner</option>
                <option value="true">Aktiv</option>
                <option value="false">Nicht Aktiv</option>
              </FormSelect>

              <ButtonComponent
                isLoading={onQuery}
                onClick={async () => {
                  setOnQuery(true);
                  await reqMenuItems({ newPage: "1" });
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
              <ButtonComponent maxW="160px" onClick={() => onOpen()}>
                + Add Menüpunkt
              </ButtonComponent>
              <Box overflowX="auto">
                <InfoTable
                  headProps={[
                    { label: "Name" },
                    { label: "Beschreibung" },
                    { label: "Wert" },
                    { label: "Typ" },
                    { label: "Größe" },
                    { label: "Status" },
                    {
                      label: "",
                    },
                  ]}
                >
                  {menuItemsList.map((item) => (
                    <InfoTableContent
                      key={item.id}
                      colsBody={[
                        { ceil: item.name },
                        {
                          ceil: item.description,
                          cssProps: {
                            maxWidth: "900px",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          },
                        },
                        {
                          ceil: intlNumberFormatter(item.value),
                          cssProps: {
                            width: "60px",
                          },
                        },
                        {
                          ceil: listConfig({ field: "type", value: item.type }),
                          cssProps: {
                            width: "40px",
                          },
                        },
                        {
                          ceil: listConfig({ field: "size", value: item.size }),
                          cssProps: {
                            width: "40px",
                          },
                        },
                        {
                          ceil: item.status ? (
                            <Tag backgroundColor="green" color="white">
                              Aktiv
                            </Tag>
                          ) : (
                            <Tag backgroundColor="red" color="white">
                              Nicht aktiv
                            </Tag>
                          ),
                          cssProps: {
                            width: "30px",
                          },
                        },

                        {
                          ceil: (
                            <Flex align="center" gap="20px">
                              <PopoverDelete
                                title="Inaktivieren"
                                icon={Power}
                                key={item.id}
                                message="Möchten Sie diesen Menüpunkt wirklich aktivieren?"
                                onClick={() => {
                                  deleteUser(item.id);
                                }}
                              />
                              <IconButtonComponent
                                icon={Pencil}
                                onClick={() => {
                                  setSelectedMenuItem(item);
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
                  req={({ newPage }) => reqMenuItems({ newPage })}
                />
              )}
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};
