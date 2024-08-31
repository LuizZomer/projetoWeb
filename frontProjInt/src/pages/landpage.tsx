import { Box, Image } from "@chakra-ui/react";
import Header from "../components/landpage/header";
import a from '../assets/Firstsection.png'
import Biografy from "../components/landpage/biografy";
import Cardvantagens from "../components/landpage/cardvantagens";
import Menu from "../components/landpage/menu";
import Promo from "../components/landpage/promocoes";

export default function Landpage(){

    return(
        <Box bgColor='#F4F7E1' display='flex' flexDirection='column' >   
            <Header/>

            <Image src={a} 
                alt="Pizza" 
                mb={5} 
                alignSelf='center' 
                position='relative' 
                mt='43px'/>

            <Biografy/>
            <Cardvantagens/>
            <Menu/>
            <Promo/>

        </Box>
    
    )

}   