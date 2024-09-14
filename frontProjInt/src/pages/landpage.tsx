import { Box, Image } from "@chakra-ui/react";
import Header from "./components/header";
import a from './assets/Firstsection.png'
import Biografy from "./components/biografy";
import Cardvantagens from "./components/cardvantagens";
import Menu from "./components/menu";
import Promo from "./components/promocoes";





export default function Landpage(){

    return(
        <Box bgColor='#F4F7E1' display='flex' flexDirection='column' >   
            <Header/>

            <Image src={a} 
                alt="Pizza" 
                mb={5} 
                alignSelf='center' 
                position='relative' 
                mt={{base:'7em', mobile:'43px'}}
                width='auto'
                height='auto'/>

            <Biografy/>
            <Cardvantagens/>
            <Menu/>
            <Promo/>

        </Box>
    
    )

}   