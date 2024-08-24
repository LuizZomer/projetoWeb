import { Box, Image } from "@chakra-ui/react";
import Header from "../../components/landpage/header";
import a from '../../assets/Firstsection.png'
import Biografy from "../../components/landpage/biografy";
import Cardvantagens from "../../components/landpage/cardvantagens";

export default function Landpage(){

    return(
        <Box bgColor='#F4F7E1'>
            <Header/>
            <Image src={a} alt="Pizza" mb={5}/>
            <Biografy/>
            <Cardvantagens/>
        </Box>
    
    )

}   