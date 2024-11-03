import { Box, Image } from "@chakra-ui/react";
import Header from "./componentsLand/header";
import a from './assets/Firstsection.png'
import Biografy from "./componentsLand/biografy";
import Cardvantagens from "./componentsLand/cardvantagens";
import Menu from "./componentsLand/menu";
import Promo from "./componentsLand/promocoes";





export default function Landpage(){

    return(
        <Box bgColor='#F4F7E1' display='flex' flexDirection='column' >   
            <Header/>

            <Image src={a} 
                alt="Pizza" 
                mb={5} 
                alignSelf='center' 
                
                w='100vw' 
                mt={{base:'0', mobile:'43px'}}
                
                height='auto'/>

            <Box display='flex' flexDirection='column' alignItems='center'>
                <Biografy/>
                <Cardvantagens/>
            </Box>
            <Menu/>
            <Promo/>

        </Box>
    
    )

}   