import { Box, Divider, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { ButtonComponent } from "../../components/Buttons/Button";
import { Header } from "./components/Header";
import { useAuthContext } from "../../context/Auth/useAuthContext";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { ICustomer } from "../../utils/types";
import { LoyaltyZone } from "./components/LoyaltyZone";
import { themes } from "../../styles/theme";
import { MenuItemPoint } from "./components/MenuItemPoint";
import { PointsInfo } from "./components/PointsInfo";
import { useNavigate } from "react-router-dom";
import { OrderLog } from "./components/OrderLog";
import { ModalEditCustomerInfo } from "./utils/ModalEditCustomerInfo";

export const CustomerArea = () => {
  const { user, signOut } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<ICustomer>();

  const logout = () => {
    signOut();
    navigate("/login");
  };

  const customerInfo = async () => {
    await api.get<ICustomer>("customer/info").then(({ data }) => {
      setCustomer(data);
    });
  };

  useEffect(() => {
    customerInfo();
  }, []);

  return (
    <>
      {isOpen && customer && (
        <ModalEditCustomerInfo
          isOpen={isOpen}
          onClose={onClose}
          email={customer.email}
        />
      )}
      <Header />
      <Flex direction="column" bgColor={themes.color.secondary} gap="60px">
        <Flex
          justify="space-between"
          align="center"
          px={["20px", "100px", "170px"]}
          h="228px"
          bgColor="#75492A"
          opacity="0.6"
          flexWrap="wrap"
        >
          <Box>
            <Text color="#ccc" fontSize="14px">
              Willkommen
            </Text>
            <Text fontWeight="bold" fontSize="34px" color="#fff">
              {user?.name}
            </Text>
          </Box>
          <Flex direction="column" gap="12px">
            <ButtonComponent
              bgColor="transparent"
              border="1px solid #fff"
              color="#fff"
              _hover={{
                bgColor: "transparent",
                transform: "scale(1.03)",
                boxShadow: "2px 3px 10px rgba(1, 1, 1, 1)",
              }}
              onClick={logout}
            >
              Logout
            </ButtonComponent>
            <ButtonComponent
              color="#fff"
              bgColor="#000000"
              _hover={{
                transform: "scale(1.03)",
                boxShadow: "2px 3px 10px rgba(1, 1, 1, 1)",
              }}
              onClick={() => {
                onOpen();
              }}
            >
              Edit Profile
            </ButtonComponent>
          </Flex>
        </Flex>
        <Flex
          direction="column"
          px={["20px", "100px", "170px"]}
          gap="60px"
          mb="20px"
        >
          <Text fontWeight="bold" fontSize="40px" color="#482D19">
            Punktestand
          </Text>

          <LoyaltyZone loyaltyPoints={customer?.loyalty_points} />
        </Flex>
        <MenuItemPoint />
        <Divider borderColor="#AC927F" />
        <PointsInfo />
        <Divider borderColor="#AC927F" />
        {customer && <OrderLog order={customer.OrderLog} />}
        <Box>
          <Divider borderColor="#AC927F" />
          <Flex align="center" justify="center" h="220px">
            <Text fontSize="24px">Alle Rechte vorbehalten</Text>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
