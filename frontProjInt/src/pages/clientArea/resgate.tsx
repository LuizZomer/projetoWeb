import { Box, Text, Image } from "@chakra-ui/react"
import pizza from '../assets/images 5.png'
import macarrao from '../assets/macarrone.png'
import salada from '../assets/images 6.png'
import bebidas from '../assets/47636326-vinho-garrafa-e-vidro-minimalista-icone-representando-alcool-e-bebidas-vetor 1.png'

export default function Resgate(){
    return(
        <Box>
        <Box fontFamily='roboto' textColor='black' borderTop='1px solid #AC927F' borderBottom='1px solid #AC927F' my='60px'>
            <Text  color='#482D19' fontWeight='bold' fontSize={40} mt='60px' w='100vw' textAlign='center'>Punkte einlösen</Text>
            <Text justifySelf='center' color='black' fontSize={16} mt='28px' maxW={{base:'',mobile:'35%'}} textAlign='center'>Sie können Punkte gegen verschiedene Produkte einlösen. Schauen Sie sich die Möglichkeiten an!</Text>
            <Box mb='60px' display='flex' flexWrap='wrap' justifyContent='center' gap='40px' mt='65px'>
                <Box w='530px' h='132px' display='flex' border='1.5px solid #A68A71' borderRadius='6'>
                    <Image src={pizza} w='100px' h='100px' alignSelf='center' mx='16px'/>
                    <Box alignSelf='center'>
                        <Text fontWeight='bold' fontSize='20px'>Pizza</Text>
                        <Text fontSize='16px' my='8px'>50 Punkte</Text>
                        <Text display='inline-block' fontSize='12px' bgColor='#A68A71' px='4px' borderRadius='2px'>50 Stück verfügbar</Text>
                    </Box>
                </Box>

                <Box w='530px' h='132px' display='flex' border='1.5px solid #A68A71' borderRadius='6'>
                    <Image src={macarrao}  w='100px' h='100px' alignSelf='center' mx='16px'/>
                    <Box alignSelf='center'>
                        <Text fontWeight='bold' fontSize='20px'>Spaghetti Carbonara</Text>
                        <Text fontSize='16px' my='8px'>45 Punkte</Text>
                        <Text display='inline-block' fontSize='12px' bgColor='#A68A71' px='4px' borderRadius='2px'>10 Stück verfügbar</Text>
                    </Box>
                </Box>

                <Box w='530px' h='132px' display='flex' border='1.5px solid #A68A71' borderRadius='6'>
                    <Image src={salada}  w='100px' h='100px' alignSelf='center' mx='16px'/>
                    <Box alignSelf='center'>
                        <Text fontWeight='bold' fontSize='20px'>Insalata</Text>
                        <Text fontSize='16px' my='8px'>40 Punkte</Text>
                        <Text display='inline-block' fontSize='12px' bgColor='#A68A71' px='4px' borderRadius='2px'>30 Stück verfügbar</Text>
                    </Box>
                </Box>

                <Box w='530px' h='132px' display='flex' border='1.5px solid #A68A71' borderRadius='6'>
                    <Image src={bebidas}  w='100px' h='100px' alignSelf='center' mx='16px'/>
                    <Box alignSelf='center'>
                        <Text fontWeight='bold' fontSize='20px'>Getränke</Text>
                        <Text fontSize='16px' my='8px'>10 Punkte</Text>
                        <Text display='inline-block' fontSize='12px' bgColor='#A68A71' px='4px' borderRadius='2px' >Unbegrenzt</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
            <Text fontSize='24' textAlign='center' margin='20px' color='#482D19'>Alle Rechte vorbehalten</Text>
        </Box>
    )
}