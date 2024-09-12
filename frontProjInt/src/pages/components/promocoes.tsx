import { Box, Image, Text } from "@chakra-ui/react";







export default function Promo(){
    return(
        <Box display='flex' flexDir='column' alignItems='center' >
            <Box my='68px'>
                <Text
                    color='#482D19'
                    fontFamily='Rakkas'
                    fontWeight='Bold'
                    fontSize='5xl'
                    textAlign='center'
                    >Aktuelle Aktionen
                </Text>


                <Text
                    color='#482D19'
                    fontFamily='Rakkas'
                    fontWeight='Bold'
                    fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
                    textAlign='center'   
                    
                    >Bleiben Sie über unsere neuesten Angebote informiert!
                </Text>
            </Box>

            <Image src='' 
                alt="Foto Promoção" 
                backgroundColor='#75492A' 
                width='800px'
                height='380px'
                
                
            /> 

            <Box display='flex' justifyContent='space-around' width='100%' alignItems='center' my='5%' flexDir={{ base: 'column', md: 'row' }}>
                <Text
                    
                    color='#482D19'
                    fontWeight='bold'
                    fontStyle='Rakkas'
                    fontSize='20'
                    >Inh.: Círo Donadío
                </Text>

                <Text
                    color='#482D19'
                    fontWeight='bold'
                    fontStyle='Rakkas'
                    fontSize='20'
                    >Hörder Str. 323 58454 Wítten
                </Text> 

                <Text
                    color='#482D19'
                    fontWeight='bold'
                    fontStyle='Rakkas'
                    fontSize='32'   
                    >Aktuelle Aktionen
                </Text> 


            </Box>  
        </Box>
    )
}