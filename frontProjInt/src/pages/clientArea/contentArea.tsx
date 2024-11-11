import { Box, Button } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import HeaderA from "./headerArea";
import { useNavigate } from "react-router-dom";

export default function ContentArea() {
    const { logout } = useAuth();
    const navigate = useNavigate()

    function handleClick(){
        navigate('/speiskarte')
    } 

    return (
        <Box>

            <HeaderA/>

            <Button onClick={logout}>
                LogOut
            </Button>

            <Button onClick={handleClick}>
                Botão provisório p/cardápio
            </Button>

        </Box>
    );
}
