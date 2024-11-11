import { Box, Image, Text } from "@chakra-ui/react";
import a from '../assets/images 1.svg'


export default function HeaderA(){
    return( 
    <Box display='flex' w='100%' bgColor='#F1ECDC' h='70px'>
        <Image src={a} w='39px' h='36px' my='17px' mx='20px'/>
        <Text fontSize='28' fontWeight={500} color="#fff" textColor='#482D19' my='15px'>Pizzeria Bei Giovanni</Text>
        
    </Box>
    )
}