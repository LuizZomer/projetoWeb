import { Box, Button, Image, Text } from "@chakra-ui/react";
import a from '../assets/images 1.svg'
import b from '../assets/CarrinhoBranci.svg'

interface HeaderCProps {
    onOpenCart: () => void;
  }

export default function HeaderC({ onOpenCart }: HeaderCProps) {
    return( 
    <Box display='flex' w='100vw' bgColor='#75492A' h='70px' justifyContent='space-between'>
        <Box display='flex'>
            <Image src={a} w='39px' h='36px' my='17px' mx='20px'/>
            <Text color='#F1ECDC' fontSize='28' fontFamily='Roboto' fontWeight='semibold' my='17px'>Pizzeria Bei Giovanni</Text>
        </Box>
        <Button onClick={onOpenCart} alignSelf='center' justifySelf='flex-end' mx='5vw' backgroundColor='#75492A'><Image src={b}/></Button>
    </Box>
    )
}