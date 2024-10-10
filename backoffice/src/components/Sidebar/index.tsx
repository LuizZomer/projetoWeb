import { Divider, Image, Text } from "@chakra-ui/react";
import logo from "/logo.svg";
import * as S from "./styles";
import { User } from "@phosphor-icons/react";
import { Outlet, useNavigate } from "react-router-dom";
import { ForkKnife, SignOut, UsersFour } from "phosphor-react";
import { useAuthContext } from "../../context/Auth/useAuthContext";

interface ISidebarOption {
  icon: React.ReactNode;
  title: string;
  url: string;
  permission?: string;
}

export const Sidebar = () => {
  const { signOut } = useAuthContext();
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
