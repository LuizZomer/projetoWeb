import { Divider, Image, Tag, Text } from "@chakra-ui/react";
import logo from "/logo.svg";
import * as S from "./styles";
import { User } from "@phosphor-icons/react";
import { Outlet, useNavigate } from "react-router-dom";
import { Bag, Coin, ForkKnife, SignOut, UsersFour } from "phosphor-react";
import { useAuthContext } from "../../context/Auth/useAuthContext";
import { useSocketConnectContext } from "../../context/SocketConnect/useSocketConnectContext";

interface ISidebarOption {
  icon: React.ReactNode;
  title: string;
  url: string;
  permission?: string;
}

export const Sidebar = () => {
  const { signOut } = useAuthContext();
  const { orderList } = useSocketConnectContext();
  const navigate = useNavigate();

  const sidebarOptions: ISidebarOption[] = [
    {
      icon: <User size={30} color="#482D19" />,
      title: "Benutzer",
      url: "/user",
    },
    {
      icon: <UsersFour size={30} color="#482D19" />,
      title: "Kunde",
      url: "/customer",
    },
    {
      icon: <ForkKnife size={30} color="#482D19" />,
      title: "Bestellungen",
      url: "/menu",
    },
    {
      icon: <Bag size={30} color="#482D19" />,
      title: "Befehl",
      url: "/order",
    },
    {
      icon: <Coin size={32} color="#482D19" />,
      title: "Finanziell",
      url: "/finance",
    },
  ];

  const logout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <S.Container>
      <S.SidebarContainer>
        <S.LogoContainer>
          <Image src={logo} maxWidth="232px" width="full" />
        </S.LogoContainer>
        <Divider />
        <S.OptionsContainer>
          <S.ContentOptionsContainer>
            {sidebarOptions.map(({ icon, title, url }) => (
              <S.OneOptionContainer
                key={title}
                onClick={() => navigate(url)}
                $isActive={window.location.pathname === url}
              >
                {icon}
                <Text color="#482D19" fontWeight={500} fontSize={18}>
                  {title}
                </Text>
                {title === "Befehl" && (
                  <Tag backgroundColor="#482D19" color="#fff">
                    {orderList.length}
                  </Tag>
                )}
              </S.OneOptionContainer>
            ))}
          </S.ContentOptionsContainer>

          <S.OneOptionContainer $isLeaveButton onClick={logout}>
            <SignOut size={28} />

            <Text fontWeight={500} fontSize={16}>
              Abmelden
            </Text>
          </S.OneOptionContainer>
        </S.OptionsContainer>
      </S.SidebarContainer>
      <S.Content>
        <Outlet />
      </S.Content>
    </S.Container>
  );
};
