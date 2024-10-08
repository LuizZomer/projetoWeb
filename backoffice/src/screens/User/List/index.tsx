import { Box, Button, Flex, Tag, useDisclosure } from "@chakra-ui/react";
import { MagnifyingGlass, Pencil } from "phosphor-react";
import { useEffect, useState } from "react";
import { ButtonComponent } from "../../../components/Buttons/Button";
import { PopoverDelete } from "../../../components/Buttons/PopoverDelete";
import { FormInput } from "../../../components/Form/Input";
import { FormSelect } from "../../../components/Form/Select";
import { InfoTable, InfoTableContent } from "../../../components/Table";
import { Title } from "../../../components/Text/Title";
import { api } from "../../../services/api";
import { FilterContainer } from "../../../styles/Globals";
import { userRoles } from "../constants";
import { ModalEditUser } from "./utils/ModalEditUser";
import { ModalCreateUser } from "./utils/ModalCreateUser";

export interface IUser {
  id: string;
  fullName: string;
  function: string | null;
  idnr: string;
  lastAccess: string | null;
  role: string;
  status: boolean;
  username: string;
  workload: string;
  createdAt: string;
}

interface IUserListReq {
  users: IUser[];
  usersCount: number;
}

export const UserList = () => {
  // #region filter
  const [selectedRole, setSelectedRole] = useState("");
  const [search, setSearch] = useState("");
  // #endregion

  const [userList, setUserList] = useState<IUser[]>([]);
  // const [count, setCount] = useState(0);

  // #region modal
  const { onOpen, isOpen, onClose } = useDisclosure();

  const {
    onOpen: updateOnOpen,
    isOpen: updateIsOpen,
    onClose: updateOnClose,
  } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<IUser>();
  // #endregion

  // #region req
  const reqUser = async () => {
    await api
      .get<IUserListReq>(
        `/user?take=10&role=${selectedRole}&search=${search}&page=0`
      )
      .then(({ data }) => {
        console.log(data.users);
        // setCount(data.usersCount);
        setUserList(data.users);
      });
  };

  const deleteUser = (id: string) => {
    api.delete(`user/${id}`).then(() => {
      reqUser();
    });
  };

  // #endregion req

  useEffect(() => {
    reqUser();
  }, []);

  return (
    <>
      {isOpen && (
        <ModalCreateUser isOpen={isOpen} onClose={onClose} onSave={reqUser} />
      )}
      {updateIsOpen && selectedUser && (
        <ModalEditUser
          isOpen={updateIsOpen}
          onClose={updateOnClose}
          onSave={reqUser}
          user={selectedUser}
        />
      )}
      <Flex flexDir="column" gap="30px">
        <Title label="Benutzer" />
        <FilterContainer>
          <FormInput
            label="Name"
            placeholder="Suchen"
            icon={MagnifyingGlass}
            onChange={(evt) => {
              setSearch(evt.target.value);
            }}
          />
          <FormSelect
            label="Erlaubnis"
            onChange={(evt) => {
              setSelectedRole(evt.target.value);
            }}
          >
            {userRoles.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </FormSelect>
          <ButtonComponent>zu senden</ButtonComponent>
        </FilterContainer>
        <Flex
          flexDir="column"
          gap="10px"
          backgroundColor="#F1ECDC"
          borderRadius="8px"
          padding="20px"
        >
          <ButtonComponent onClick={() => onOpen()} maxW="130px">
            + Add Benutzer
          </ButtonComponent>
          <Box overflowX="auto">
            <InfoTable
              headProps={[
                { label: "Name" },
                { label: "Username" },
                { label: "Funktion" },
                { label: "IDNR" },
                { label: "Erlaubnis" },
                { label: "Status" },
                { label: "Arbeitsbelastung" },
                { label: "erstellt bei" },
                { label: "Letzter Zugriff" },
                { label: "" },
              ]}
            >
              {userList.map((user) => (
                <InfoTableContent
                  colsBody={[
                    { ceil: user.fullName },
                    { ceil: user.username },
                    { ceil: user.function || "-" },
                    { ceil: user.idnr },
                    { ceil: user.role },
                    {
                      ceil: user.status ? (
                        <Tag backgroundColor="green" color="white">
                          Active
                        </Tag>
                      ) : (
                        <Tag backgroundColor="red" color="white">
                          Nicht aktiv
                        </Tag>
                      ),
                    },
                    { ceil: user.workload || "-" },
                    { ceil: new Date(user.createdAt).toLocaleDateString() },
                    {
                      ceil: user.lastAccess
                        ? new Date(user.lastAccess).toLocaleDateString()
                        : "-",
                    },
                    {
                      ceil: (
                        <Flex>
                          <PopoverDelete
                            key={user.id}
                            message="Haben Sie diesen Benutzer wirklich gelöscht?"
                            onClick={() => {
                              deleteUser(user.id);
                            }}
                          />
                          <Button
                            width="90px"
                            variant="none"
                            onClick={() => {
                              setSelectedUser(user);
                              updateOnOpen();
                            }}
                          >
                            <Pencil size={22} />
                          </Button>
                        </Flex>
                      ),
                    },
                  ]}
                />
              ))}
            </InfoTable>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
