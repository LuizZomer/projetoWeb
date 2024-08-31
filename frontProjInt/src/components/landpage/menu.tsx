import { Box, Text, Image,Button} from "@chakra-ui/react"
import a from '../../assets/Fifthsection.png'
import b from '../../assets/macarrao.png'

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
                fontSize='xx-large'
                fontFamily='Rakkas'
                >SPEISEKARTE
            </Text>

            <Image src={a} 
                alt="Menu" 
                margin='50px' 
            />

            <Button
                as='b' 
                textColor="white" 
                fontFamily='Rakkas' 
                fontSize='2xl'
                backgroundColor='#482D19'
                w={250}
                h={85}
                m={10}
                
                >SPEISEKARTE
            </Button>

            <Box backgroundColor='#482D19' 
                display='flex' 
                alignItems='center' 
                justifyContent='center' 
                height={400}
            >
                
                <Text 
                    textColor='white'
                    fontFamily='Rakkas'
                    fontSize='2xl'
                    fontWeight='semibold'
                    marginInline='265px'
                        >Na der Pizzaria Bei Giovanni wird die Pasta mit der gleichen Leidenschaft und Authentizität zubereitet wie die Pizzen. Mit frischen Nudeln und traditionellen italienischen Saucen bietet jedes Pastagericht einen reichen, authentischen Geschmack und bringt das echte italienische Flair direkt auf Ihren Tisch in Witten.
                </Text>

            </Box>
            <Image src={b} alt="MacarraoMenu"/>

        </Box>
    )
}