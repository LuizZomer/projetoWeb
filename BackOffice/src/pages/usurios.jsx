import { Box, Text } from "@chakra-ui/react"
import SideBar from "./components/sidebar"
import Filter from "./components/filter"
import Usuarios from "./components/usuarios";

export default function Func(){

    return (
      <Box display='flex'>
      <SideBar/>
        <Box backgroundColor='#897F61' h='150%' w='100vw' display='flex'  flexDir='column' alignItems='center'marginLeft='220px' paddingBottom='100px' >
            <Text fontFamily='inter' textColor='white' fontSize='38' alignSelf='flex-start' marginLeft='5%' marginTop='2vh' marginBottom='1vh'>Benutzer</Text>
            <Filter/>
           <Usuarios/>
        </Box>
      </Box>
      );
    }