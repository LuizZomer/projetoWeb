import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

interface RecentOrderProps {
    lastItems: string[][];  // Espera um array de arrays de strings (nomes dos itens dos pedidos)
}

const RecentOrder: React.FC<RecentOrderProps> = ({ lastItems }) =>{

    return(
        <Box mt='60px' display='flex' flexDir='column'>
            <Text fontSize='40' fontWeight='bold' color='#482D19' alignSelf='center'>Letzte Bestellungen</Text>
            <Box display='flex' justifyContent='space-around'>
                <Box mt='60px' display='flex' flexDir='column' textAlign='center' w='340px' h='228px' alignContent='center'>
                    <Image alt="?"/>
                    <Text my='20px' fontSize='20' fontFamily='roboto' color='#482D19' fontWeight='regular'>Pizza</Text>
                    <Text color='black' fontSize='28' fontFamily='roboto'>500 Punkte</Text>
                </Box>
                <Box mt='60px' w='340px' h='228px' display='flex' flexDir='column' textAlign='center' alignContent='center'>
                    <Image alt="?"/>
                    <Text my='20px' fontSize='20' fontFamily='roboto' color='#482D19' fontWeight='regular'>Salada</Text>
                    <Text color='black' fontSize='28' fontFamily='roboto'>100 Punkte</Text>
                </Box>
                <Box mt='60px' w='340px' h='228px' display='flex' flexDir='column' textAlign='center' alignContent='center'>
                    <Image alt="?"/>
                    <Text my='20px' fontSize='20' fontFamily='roboto' color='#482D19' fontWeight='regular'>Macarrao</Text>
                    <Text color='black' fontSize='28' fontFamily='roboto'>400 Punkte</Text>
                </Box>
            </Box>
        </Box>
    )
}
export default RecentOrder