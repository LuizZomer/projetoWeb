import { Box, Text } from "@chakra-ui/react";







export default function Promo(){
    return(
        <Box display='flex' flexDir='column' alignItems='center' >

            <Box display='flex' justifyContent='space-around' width='100%' alignItems='center' my='2%' flexDir={{ base: 'column', md: 'row' }}>
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
                    fontSize='20'   
                    >Aktuelle Aktionen
                </Text> 


            </Box>  
        </Box>
    )
}