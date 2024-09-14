import { Box, Text, Image,Button} from "@chakra-ui/react"
import a from '../assets/Fifthsection.png'
import b from '../assets/macarrao.png'

export default function Menu(){
    return(
        <Box display='flex' 
            flexDir='column' 
            justifyContent='center' 
            color='#482D19' 
            alignItems='center'
            >
            
            <Text
                fontWeight='bold'
                fontSize={{ base: 'xl', md: '2xl', lg: 'xx-large' }}
                fontFamily='Rakkas'
                mb={{ base: '20px', md: '30px' }}
                objectFit='cover'   
                >SPEISEKARTE
            </Text>

            <Image src={a} 
                alt="Menu" 
                marginTop='50px' 
            />

            <Button
                as='b' 
                textColor="white" 
                fontFamily='Rakkas' 
                fontSize={{base:'28px',mobile:'38px'}}
                backgroundColor='#482D19'
                w={{ base: '80%', mobile: '375px' }}
                h={{ base: '75px', mobile: '118px' }}
                my={{ base: '50px', mobile: '150px' }}
                
                >SPEISEKARTE
            </Button>

            <Box backgroundColor='#482D19' 
                display='flex' 
                alignItems='center' 
                justifyContent='center' 
                height={{ base: 'auto', md: '493px' }}
            >
                
                <Text 
                    textColor='#F1ECDC'
                    fontFamily='Rakkas'
                    fontSize={{ base: 'md', md: 'lg', lg: '2xl' }}
                    fontWeight='semibold'
                    mx='20%'
                    my={{base:'10%', mobile:'0'}}
                    textAlign='center'
                        >Na der Pizzaria Bei Giovanni wird die Pasta mit der gleichen Leidenschaft und Authentizität zubereitet wie die Pizzen. Mit frischen Nudeln und traditionellen italienischen Saucen bietet jedes Pastagericht einen reichen, authentischen Geschmack und bringt das echte italienische Flair direkt auf Ihren Tisch in Witten.
                </Text>

            </Box>
            <Image src={b} alt="MacarraoMenu"/>

        </Box>
    )
}