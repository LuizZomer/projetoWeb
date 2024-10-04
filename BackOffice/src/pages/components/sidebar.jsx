import { Box, Button, Image, Text } from "@chakra-ui/react";
import a from '../../assets/logo.png'
import b from '../../assets/Vector.png'
import c from '../../assets/Vector1.png'
import d from '../../assets/UsersThree.png'
import e from '../../assets/Vector2.png'
import f from '../../assets/Vector3.png'
import g from '../../assets/LogOut.png'

export default function SideBar() {
    
    
    return (
        <Box
            w='280px'
            h='100vh'
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            alignItems='center'
            bgColor='f1ecdc'
        >   
            <Box display='flex' flexDir='column' alignItems='center' w='90%'>
                <Image src={a} w='190px' h='60px' marginTop={5} marginBottom='5vh' />
                <Button w='80%' h='60%' fontFamily='inter' textColor='#482D19' justifyContent='flex-start' margin='8px'>
                    <Image src={b} marginRight={4} w='16px' h='16px'/> 
                    <Text fontWeight='medium' fontSize='14px'>Hauss</Text>
                </Button>
                <Button w='80%' h='60%' fontFamily='inter' textColor='#482D19' justifyContent='flex-start' margin='8px'>
                    <Image w='16px' h='16px' src={c} marginRight={4}/> 
                    <Text fontWeight='medium' fontSize='14px'>Benutzer</Text>
                </Button>
                <Button w='80%' h='60%' fontFamily='inter' textColor='#482D19' justifyContent='flex-start' margin='8px'>
                    <Image src={d} marginRight={4} w='16px' h='16px'/> 
                    <Text fontWeight='medium' fontSize='14px' >Mitarbeiter</Text>
                </Button>
                <Button w='80%' h='60%' fontFamily='inter' textColor='#482D19' justifyContent='flex-start' margin='8px'>
                    <Image src={e} marginRight={4} w='16px' h='16px'/> 
                    <Text fontWeight='medium' fontSize='14px'>Finanzen</Text>
                </Button>
                <Button w='80%' h='60%'  fontFamily='inter' textColor='#482D19' justifyContent='flex-start' margin='8px'>
                    <Image src={f} marginRight={4} w='16px' h='16px'/> 
                    <Text fontWeight='medium' fontSize='14px'>Bestellungen</Text>
                </Button>
            </Box>
            <Button w='80%' h='56px' alignSelf= 'center' fontFamily='inter' textColor='#482D19' justifyContent='flex-start' margin='8px'>                
                <Image src={g} marginRight={4} w='16px' h='16px'/> 
                <Text fontWeight='medium' fontSize='14px'>Abmelden</Text>
            </Button>
        </Box>
    );
}
