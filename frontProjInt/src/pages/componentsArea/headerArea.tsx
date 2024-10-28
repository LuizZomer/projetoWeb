import { Box, Image, Text } from "@chakra-ui/react";
import a from '../assets/images 1.svg'


export default function HeaderA(){
    return( 
    <Box display='flex' w='100%' bgColor='#F1ECDC'>
        <Image src={a} w='39px' h='36px' my='17px' mx='20px'/>
        <Text color='#482D19' fontSize='28' fontWeight='semibold' my='17px'>Pizzeria Bei Giovanni</Text>
        
    </Box>
    )
}