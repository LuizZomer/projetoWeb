import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { themes } from "../../styles/theme";
import { menuItemIcon } from "../../assets/icons";
import { useDeferredValue, useEffect, useState } from "react";
import { api } from "../../services/api";
import { Card } from "./components/Card";
import { useSearchParams } from "react-router-dom";
import { ModalConfirmMenuItem } from "./utils/ModalConfirmItem";
import { IMenu } from "../../utils/types";
import { Input } from "../../components/Inputs";
import { MagnifyingGlass } from "phosphor-react";
import { Header } from "./components/Header";

interface IMenuOptions {
  icon: string;
  title: string;
  id: string;
}

interface IMenuReqParam {
  menuItens: IMenu[];
  itensCount: number;
}

export const Menu = () => {
  const [menuList, setMenuList] = useState<IMenu[]>([]);
  const [query, setQuery] = useSearchParams();
  const [selectedMenu, setSelectedMenu] = useState<IMenu | undefined>();
  const queryDefered = useDeferredValue(query.get("search"));

  const { onOpen, isOpen, onClose } = useDisclosure();

  const type = query.get("type") || "";
  const search = query.get("search") || "";

  const [searchState, setSearchState] = useState(search);

  const setSearch = (search: string) => {
    setQuery((prev) => {
      prev.set("search", search);
      return prev;
    });
  };

  const setType = (type: string) => {
    setQuery((prev) => {
      prev.set("type", type);
      return prev;
    });
  };

  const menuItemOptions: IMenuOptions[] = [
    {
      icon: menuItemIcon.noodle,
      title: "Nudeln",
      id: "noodle",
    },
    {
      icon: menuItemIcon.pizza,
      title: "Pizzas",
      id: "pizza",
    },
    {
      icon: menuItemIcon.salad,
      title: "Salat",
      id: "salad",
    },
    {
      icon: menuItemIcon.drink,
      title: "Getränke",
      id: "drink",
    },
  ];

  const reqMenu = async ({
    newType,
    newSearch,
  }: {
    newType: string;
    newSearch?: string;
  }) => {
    await api
      .get<IMenuReqParam>(
        `/menu?page=1&take=100&type=${newType}&search=${
          newSearch || search
        }&status=true`
      )
      .then(({ data }) => {
        setMenuList(data.menuItens);
      });
  };

  useEffect(() => {
    reqMenu({ newType: type });
  }, [queryDefered]);

  return (
    <Flex
      direction="column"
      gap="40px"
      minH="100vh"
      bgColor={themes.color.secondary}
    >
      {isOpen && selectedMenu && (
        <ModalConfirmMenuItem
          isOpen={isOpen}
          menu={selectedMenu}
          onClose={onClose}
        />
      )}
      <Header />
      <Text
        fontWeight="700"
        fontSize={40}
        textAlign="center"
        color={themes.color.primary}
      >
        Speisekarte
      </Text>
      <Flex
        justify="center"
        bgColor={themes.color.primary}
        // py="5px"
        mx="auto"
        // px="30px"
        borderRadius="10px"
      >
        <Box maxW="300px" w="full">
          <Input.Root>
            <Input.Icon icon={MagnifyingGlass} position="before" />
            <Input.Field
              placeholder="Suchen"
              onChange={(evt) => {
                setSearchState(evt.target.value);
                setSearch(evt.target.value);
              }}
              value={searchState}
            />
          </Input.Root>
        </Box>
      </Flex>
      <Flex justify="center">
        <Flex
          justify="space-around"
          maxWidth="50%"
          w="full"
          flexWrap="wrap"
          gap="10px"
        >
          {menuItemOptions.map(({ icon, title, id }) => {
            const active = type === id;

            return (
              <Flex
                key={id}
                direction="column"
                justify="space-between"
                align="center"
                h={120}
                w={120}
                border={`1px solid  ${active ? "#dddd" : "#E5E5E5"}`}
                bgColor={active ? "#dddd" : "#FFFDFD"}
                borderRadius="8px"
                py="16px"
                boxShadow="0px 4px 14px rgba(1, 1, 1, 0.4)"
                transition="0.5s"
                _hover={{
                  cursor: "pointer",
                  bgColor: "#f7f7f7",
                  transform: "scale(1.05)",
                }}
                onClick={() => {
                  setSearch("");
                  setSearchState("");
                  setType(id);
                  reqMenu({ newType: id });
                }}
              >
                <Image src={icon} width={55} height={45} />

                <Text color={themes.color.primary}>{title}</Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
      <Flex w="full" justify="center">
        {menuList && (
          <Flex gap="50px" flexWrap="wrap" justify="center">
            {menuList.map((menu) => (
              <Card
                key={menu.id}
                setSelectedMenu={setSelectedMenu}
                menu={menu}
                setModalOpen={onOpen}
              />
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
