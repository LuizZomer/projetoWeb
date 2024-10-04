import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/login');
  }

  return (
    <Box
      position={{ base: 'static', mobile: 'fixed' }}
      width='100%'
      zIndex='10'
      backgroundColor='white'
      padding={{ base: '10px', mobile: '24px' }}
      display="flex"
      flexDir={{ base: 'column', mobile: 'row' }}
      alignItems="center"
      justifyContent="space-around"
      gap='0.7rem'
    >
      <Button backgroundColor='white' flex={1} fontSize='0.9rem' _hover={{bg:'gray'}}>
        HAUSS
      </Button>
      <Button backgroundColor='white' flex={1} fontSize='0.9rem' _hover={{bg:'gray'}}>
        VERBIDEN
      </Button>
      <Button backgroundColor='white' flex={1} fontSize='0.9rem' _hover={{bg:'gray'}}>
        SPEISKARTE
      </Button>
      <Button
        backgroundColor='white'
        flex={1}
        fontSize='0.9rem'
        color={"#482D19"}
        mb='9px'
        onClick={handleClick}
        _hover={{bg:'gray'}}
      >
        AN
      </Button>
    </Box>
  );
}

export default Header;
