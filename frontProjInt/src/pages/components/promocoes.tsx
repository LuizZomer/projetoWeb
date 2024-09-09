import { Box, Image, Text } from "@chakra-ui/react";







export default function Promo(){
    return(
        <Box display='flex' flexDir='column' alignItems='center' mb='4%'>
            <Text
                color='#482D19'
                fontFamily='Rakkas'
                fontWeight='Bold'
                fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }} 
                mt='3% '
                >Aktuelle Aktionen
            </Text>


            <Text
                color='#482D19'
                fontFamily='Rakkas'
                fontWeight='Bold'
                fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
                
                >Bleiben Sie über unsere neuesten Angebote informiert!
            </Text>

            <Image src='' 
                alt="Foto Promoção" 
                backgroundColor='#75492A' 
                width='80%'
                paddingY='15%'
                my={{ base: '20px', md: '30px' }}
            /> 

            <Box display='flex' justifyContent='space-around' width='100%' alignItems='center' flexDir={{ base: 'column', md: 'row' }}>
                <Text
                    
                    color='#482D19'
                    fontWeight='bold'
                    fontStyle='Rakkas'
                    fontSize={{ base: 'sm', md: 'md', lg: 'large' }}
                    >Inh.: Círo Donadío
                </Text>

                <Text
                    color='#482D19'
                    fontWeight='bold'
                    fontStyle='Rakkas'
                    fontSize={{ base: 'sm', md: 'md', lg: 'large' }}
                    >Hörder Str. 323 58454 Wítten
                </Text> 

                <Text
                    color='#482D19'
                    fontWeight='bold'
                    fontStyle='Rakkas'
                    fontSize={{ base: 'lg', md: 'xl', lg: 'xx-large' }}   
                    >Aktuelle Aktionen
                </Text> 


            </Box>  
        </Box>
    )
}