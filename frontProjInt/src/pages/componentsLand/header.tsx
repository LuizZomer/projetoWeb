import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/login');
  }

  function handleMenu() {
    navigate('/speiskarte');
  }
    

  function handleHome() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <Button onClick={handleHome} backgroundColor='white' flex={1} fontSize='1rem' _hover={{bg:'lightgray', fontSize:'1.3rem'}}>
        HAUSS
      </Button>
      <Button backgroundColor='white' flex={1} fontSize='1rem' _hover={{bg:'lightgray', fontSize:'1.3rem'}} onClick={handleClick}>
        VERBIDEN
      </Button>
      <Button onClick={handleMenu} backgroundColor='white' flex={1} fontSize='1rem' _hover={{bg:'lightgray', fontSize:'1.3rem'}}>
        SPEISKARTE
      </Button>
      <Button
        backgroundColor='white'
        flex={1}
        fontSize='1rem'
        color={"#482D19"}
        mb='9px'
        onClick={handleClick}
        _hover={{bg:'yellow.100',fontSize:'1.3rem'}}
      >
        AN
      </Button>
    </Box>
  );
}

export default Header;
